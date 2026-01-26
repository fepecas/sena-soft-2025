export AWS_DEFAULT_REGION="region"                # o us-east-1 si prefieres
export BUDGET_ALERT_EMAIL="john.doe@gmail.com"  # temporal (puedes quitarlo después)
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
DENY_ARN=$(aws iam list-policies --scope Local --query "Policies[?PolicyName=='SenaSoftBedrockDeny'].Arn" --output text)
ROLE_ARN=$(aws iam get-role --role-name BudgetsActionsRole --query Role.Arn --output text)

echo "Account: $ACCOUNT_ID"
echo "DENY_ARN: $DENY_ARN"
echo "ROLE_ARN: $ROLE_ARN"
echo "EMAIL: $BUDGET_ALERT_EMAIL"
