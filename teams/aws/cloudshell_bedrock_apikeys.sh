#!/usr/bin/env bash
# Idempotente y re-ejecutable
set -u
shopt -s nocasematch

# ========= Config =========
PREFIX="Equipo"
NUM_TEAMS=14
MONTHLY_LIMIT_USD=5
REGION="${AWS_DEFAULT_REGION:-'region'}"
CSV_OUT="bedrock-keys.csv"

# ========= Prechecks =========
need() { command -v "$1" >/dev/null 2>&1 || { echo "Falta $1"; exit 1; }; }
need aws
need jq

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text) || { echo "Sin credenciales"; exit 1; }
echo "Cuenta: $ACCOUNT_ID  Región: $REGION"

log(){ echo -e "[$(date +%H:%M:%S)] $*"; }

# ========= Helpers =========
exists_group(){ aws iam get-group --group-name "$1" >/dev/null 2>&1; }
exists_user(){ aws iam get-user --user-name "$1" >/dev/null 2>&1; }
policy_arn_by_name(){
  aws iam list-policies --scope Local --query "Policies[?PolicyName=='$1'].Arn" --output text | awk '{print $1}'
}
role_exists(){ aws iam get-role --role-name "$1" >/dev/null 2>&1; }

pad2(){ printf "%02d" "$1"; }

# ========= 1) Grupo y Policies =========
GROUP_NAME="SenaSoftBedrockUsers"
ALLOW_POLICY_NAME="SenaSoftBedrockAllow"
DENY_POLICY_NAME="SenaSoftBedrockDeny"

ALLOW_DOC='{
  "Version":"2012-10-17",
  "Statement":[{"Sid":"BedrockInvoke","Effect":"Allow","Action":[
    "bedrock:InvokeModel","bedrock:InvokeModelWithResponseStream",
    "bedrock:ListFoundationModels","bedrock:GetFoundationModel"
  ],"Resource":"*"}]
}'
DENY_DOC='{
  "Version":"2012-10-17",
  "Statement":[{"Sid":"DenyBedrockAll","Effect":"Deny","Action":"bedrock:*","Resource":"*"}]
}'

log "Asegurar grupo: $GROUP_NAME"
if ! exists_group "$GROUP_NAME"; then
  aws iam create-group --group-name "$GROUP_NAME" >/dev/null
  log "  creado."
else
  log "  ya existía."
fi

log "Asegurar policy ALLOW ($ALLOW_POLICY_NAME)"
ALLOW_ARN=$(policy_arn_by_name "$ALLOW_POLICY_NAME")
if [[ -z "${ALLOW_ARN}" || "${ALLOW_ARN}" == "None" ]]; then
  ALLOW_ARN=$(aws iam create-policy --policy-name "$ALLOW_POLICY_NAME" --policy-document "$ALLOW_DOC" --query Policy.Arn --output text)
  log "  creada: $ALLOW_ARN"
else
  log "  ya existía: $ALLOW_ARN"
fi

log "Adjuntar ALLOW al grupo (si no está)"
if ! aws iam list-attached-group-policies --group-name "$GROUP_NAME" --query "AttachedPolicies[?PolicyArn=='$ALLOW_ARN']|length(@)" --output text | grep -q '^1$'; then
  aws iam attach-group-policy --group-name "$GROUP_NAME" --policy-arn "$ALLOW_ARN" >/dev/null
  log "  adjuntada."
else
  log "  ya estaba adjunta."
fi

log "Asegurar policy DENY ($DENY_POLICY_NAME)"
DENY_ARN=$(policy_arn_by_name "$DENY_POLICY_NAME")
if [[ -z "${DENY_ARN}" || "${DENY_ARN}" == "None" ]]; then
  DENY_ARN=$(aws iam create-policy --policy-name "$DENY_POLICY_NAME" --policy-document "$DENY_DOC" --query Policy.Arn --output text)
  log "  creada: $DENY_ARN"
else
  log "  ya existía: $DENY_ARN"
fi

# ========= 2) Rol para Budget Actions =========
ROLE_NAME="BudgetsActionsRole"
log "Asegurar rol $ROLE_NAME (trusted: budgets.amazonaws.com)"
if ! role_exists "$ROLE_NAME"; then
  TRUST='{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"budgets.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
  aws iam create-role --role-name "$ROLE_NAME" --assume-role-policy-document "$TRUST" >/dev/null
  log "  creado."
else
  log "  ya existía."
fi

# policy inline del rol (idempotente: put-role-policy sobrescribe)
ROLE_INLINE='{
  "Version":"2012-10-17",
  "Statement":[{"Effect":"Allow","Action":[
    "iam:AttachUserPolicy","iam:DetachUserPolicy",
    "iam:ListAttachedUserPolicies","iam:GetUser","iam:ListUsers"
  ],"Resource":"*"}]
}'
aws iam put-role-policy --role-name "$ROLE_NAME" --policy-name "BudgetsActionsPermissions" --policy-document "$ROLE_INLINE" >/dev/null
ROLE_ARN=$(aws iam get-role --role-name "$ROLE_NAME" --query Role.Arn --output text)
log "Rol listo: $ROLE_ARN"

# ========= 3) CSV credenciales =========
if [[ ! -f "$CSV_OUT" ]]; then
  echo "team,user,access_key_id,secret_access_key" > "$CSV_OUT"
fi

# ========= 4) Usuarios y keys =========
for i in $(seq 1 "$NUM_TEAMS"); do
  N=$(pad2 "$i")
  USER="${PREFIX}${N}"
  log "Usuario $USER"

  if ! exists_user "$USER"; then
    aws iam create-user --user-name "$USER" --tags Key=Team,Value="$USER" >/dev/null
    log "  creado + tag Team=$USER"
  else
    # Asegurar tag (idempotente)
    aws iam tag-user --user-name "$USER" --tags Key=Team,Value="$USER" >/dev/null
    log "  ya existía; tag asegurada"
  fi

  # Enlazar al grupo si no está
  if ! aws iam list-groups-for-user --user-name "$USER" --query "Groups[?GroupName=='$GROUP_NAME']|length(@)" --output text | grep -q '^1$'; then
    aws iam add-user-to-group --group-name "$GROUP_NAME" --user-name "$USER" >/dev/null
    log "  agregado al grupo."
  else
    log "  ya estaba en el grupo."
  fi

  # Access key: crear solo si no tiene activa
  ACTIVE_COUNT=$(aws iam list-access-keys --user-name "$USER" --query 'length(AccessKeyMetadata[?Status==`Active`])' --output text)
  if [[ "$ACTIVE_COUNT" == "0" ]]; then
    CREDS="Access keys must be created manually or via temporary credentials"
    AKID=$(echo "$CREDS" | jq -r .AccessKey.AccessKeyId)
    AKSEC=$(echo "$CREDS" | jq -r .AccessKey.SecretAccessKey)
    echo "${USER},${USER},${AKID},${AKSEC}" >> "$CSV_OUT"
    log "  access key creada y agregada a $CSV_OUT"
  else
    log "  ya tenía key activa (no se crea otra)."
  fi
done
log "CSV listo: $CSV_OUT"

# ========= 5) Budgets + Actions (deny al 100%) =========
# IMPORTANTE: Activa la tag 'Team' en Billing > Cost allocation tags cuando aparezca.
for i in $(seq 1 "$NUM_TEAMS"); do
  N=$(pad2 "$i")
  USER="${PREFIX}${N}"
  BUDGET_NAME="Budget-${USER}"
  log "Budget para $USER → $BUDGET_NAME"

  # Filtro por tag en Budgets: formato "TagKeyValue": ["Team$:Equipo01"]
  FILTER_VAL="Team\\$:${USER}"
  BUDGET_JSON=$(jq -n \
    --arg name "$BUDGET_NAME" \
    --arg amt "$MONTHLY_LIMIT_USD" \
    --arg start "$(date -u +%Y-%m-01T00:00:00Z)" \
    --arg tag "$FILTER_VAL" \
    '{
      BudgetName: $name,
      BudgetLimit: { Amount: $amt, Unit: "USD" },
      CostFilters: { TagKeyValue: [$tag] },
      CostTypes: {
        IncludeTax: true, IncludeSubscription: true, UseBlended: false,
        IncludeRefund: false, IncludeCredit: false, IncludeUpfront: true,
        IncludeRecurring: true, IncludeOtherSubscription: true,
        IncludeSupport: true, IncludeDiscount: true, UseAmortized: false
      },
      TimeUnit: "MONTHLY",
      TimePeriod: { Start: $start },
      BudgetType: "COST"
    }')

  # create or update (idempotente)
  if ! aws budgets create-budget --account-id "$ACCOUNT_ID" --budget "$BUDGET_JSON" >/dev/null 2>&1; then
    aws budgets update-budget --account-id "$ACCOUNT_ID" --new-budget "$BUDGET_JSON" >/dev/null
    log "  budget actualizado."
  else
    log "  budget creado."
  fi

  # ---- Budget Action: APPLY_IAM_POLICY al 100%, Users=[$USER], PolicyArn=$DENY_ARN
  # Ver si ya existe una action equivalente
  ACTIONS_JSON=$(aws budgets list-budget-actions-for-budget --account-id "$ACCOUNT_ID" --budget-name "$BUDGET_NAME" --output json 2>/dev/null || echo '{}')
  MATCH=$(echo "$ACTIONS_JSON" | jq --arg arn "$DENY_ARN" --arg user "$USER" \
    '[.Actions[]? | select(.ActionType=="APPLY_IAM_POLICY")
      | select(.ActionThreshold.ActionThresholdType=="PERCENTAGE" and (.ActionThreshold.ActionThresholdValue|tostring)=="100")
      | select(.Definition.IamActionDefinition.PolicyArn==$arn)
      | select((.Definition.IamActionDefinition.Users//[])|index($user) != null)] | length')

  if [[ "$MATCH" == "0" ]]; then
    aws budgets create-budget-action \
      --account-id "$ACCOUNT_ID" \
      --budget-name "$BUDGET_NAME" \
      --notification-type "ACTUAL" \
      --action-type "APPLY_IAM_POLICY" \
      --action-threshold ActionThresholdType=PERCENTAGE,ActionThresholdValue=100 \
      --definition "IamActionDefinition={PolicyArn=$DENY_ARN,Users=[$USER]}" \
      --execution-role-arn "$ROLE_ARN" \
      --approval-model "AUTOMATIC" >/dev/null
    log "  action creada (apply DENY al 100%)."
  else
    log "  action ya existente."
  fi
done

log "✅ Todo asegurado. Puedes re-ejecutar este script sin miedo; es idempotente."
echo "ℹ️ Recuerda activar la tag 'Team' en Billing → Cost allocation tags cuando aparezca."
