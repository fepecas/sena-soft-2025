# Development Workflows

## Git Workflow Básico

### Feature Branch (Recomendado)
1. **main** - Código en producción
2. **develop** - Integración de features
3. **feature/nombre** - Nueva funcionalidad
4. **hotfix/nombre** - Bug crítico

**Proceso:**
```bash
# Crear feature
git checkout -b feature/login
# Desarrollar y commit
git commit -m "Add login form"
# Push y Pull Request
git push origin feature/login
```

### Commits
**Formato:** `tipo: descripción corta`
- `feat:` nueva funcionalidad
- `fix:` bug fix  
- `docs:` documentación
- `style:` formato de código
- `refactor:` refactorización

## Code Review Process

### Antes del Review
- [ ] Tests pasan
- [ ] Código formateado
- [ ] Sin console.logs
- [ ] Descripción clara del PR

### Durante Review
**Revisar:**
- Lógica correcta
- Performance issues
- Security vulnerabilities  
- Code style consistency
- Test coverage

### Checklist Pull Request
- [ ] Funcionalidad cumple requisitos
- [ ] Tests incluidos
- [ ] Documentación actualizada
- [ ] No rompe features existentes
- [ ] Performance aceptable

## CI/CD Pipeline

### Stages Básicos
1. **Lint** - Verificar código
2. **Test** - Correr pruebas
3. **Build** - Compilar/empaquetar
4. **Deploy** - Subir a servidor

### GitHub Actions Ejemplo
```yaml
# En develop - deploy a staging
# En main - deploy a production
# En PRs - solo test y build
```

### Environments
- **Local** - Desarrollo individual
- **Staging** - Testing integrado
- **Production** - Usuarios reales

## Daily Workflow

### Mañana (15 min)
1. Pull latest changes
2. Check Slack/emails  
3. Review PRs pendientes
4. Plan día en task manager

### Durante Desarrollo
1. **Feature branch** para cada tarea
2. **Commits frecuentes** (cada 1-2 horas)
3. **Push daily** al final del día
4. **Update task status**

### Antes de irse
1. Push changes
2. Update task progress
3. Comment blockers/questions
4. Clean workspace

## Team Collaboration

### Daily Standup (10-15 min)
- ¿Qué hice ayer?
- ¿Qué haré hoy?  
- ¿Tengo algún blocker?

### Code Review Rules
- **Review en 24h máximo**
- **Comentarios constructivos**
- **Aprobar si funciona** (no buscar perfección)
- **Pair programming** para casos complejos

### Communication
- **Slack/Teams** - Comunicación rápida
- **GitHub/Jira** - Context en tasks
- **Calls** - Para discusiones complejas
- **Documentation** - Decisiones importantes

## Debugging Process

1. **Reproduce** el problema
2. **Check logs** - errores recientes
3. **Git blame** - quién cambió qué
4. **Rollback** si es crítico
5. **Fix** con tests
6. **Deploy fix**