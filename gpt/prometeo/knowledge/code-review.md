# Code Review

## Checklist Rápido

### Antes del Review
- [ ] Tests pasan
- [ ] Código formateado (Prettier)
- [ ] Sin console.logs
- [ ] Descripción clara del PR
- [ ] Screenshots si es UI

### Que Revisar

**Funcionalidad:**
- [ ] Cumple los requirements
- [ ] Maneja edge cases
- [ ] Error handling correcto

**Code Quality:**
- [ ] Nombres descriptivos
- [ ] Functions pequeñas (<20 lines)
- [ ] No código duplicado
- [ ] Comments solo donde es necesario

**Performance:**
- [ ] No loops innecesarios
- [ ] Lazy loading si aplica
- [ ] Queries optimizados

**Security:**
- [ ] Input validation
- [ ] No hardcoded secrets
- [ ] Auth checks

## Como Dar Feedback

### Good Examples
✅ "Consider extracting this logic into a separate function for reusability"
✅ "This could cause a memory leak, maybe use cleanup in useEffect"
✅ "Nice solution! Small suggestion: we could use map() instead of forEach here"

### Bad Examples
❌ "This is wrong"
❌ "I don't like this"
❌ "Rewrite everything"

## Review Levels

### Nitpick (Optional)
- Code style minor
- Variable naming suggestions
- Comment: "nit: consider renaming to..."

### Should Fix
- Performance issues
- Potential bugs
- Security concerns

### Must Fix
- Breaking changes
- Critical bugs
- Security vulnerabilities

## Process

### 1. Self Review First
- Read your own PR
- Check diff line by line
- Fix obvious issues

### 2. Request Review
- Tag appropriate reviewers
- Add context in description
- Link to issue/task

### 3. Address Feedback
- Respond to each comment
- Make changes or explain why not
- Request re-review

### 4. Merge
- All checks pass
- Approved by reviewer
- Squash commits if messy

## Common Issues

### Frontend
- Missing loading states
- No error boundaries
- Accessibility issues
- Mobile responsiveness
- Performance (large bundles)

### Backend
- SQL injection risks
- Missing input validation
- No rate limiting
- Poor error messages
- Memory leaks

### General
- No tests
- Hardcoded values
- Poor error handling
- Dead code
- Inconsistent naming

## PR Templates

### Bug Fix
```markdown
## What
Fixes issue with login form validation

## How
- Added email format validation
- Fixed password length check

## Testing
- [ ] Manual testing on Chrome/Safari
- [ ] Unit tests added
```

### Feature
```markdown
## What
Add user profile page

## How
- Created ProfilePage component
- Added API endpoint /api/profile
- Connected to database

## Screenshots
[Include UI screenshots]

## Testing
- [ ] Works on mobile
- [ ] Tests passing
```

## Review Timing

### Response Times
- **Critical bugs:** Same day
- **Regular PRs:** Within 24h
- **Large features:** 2-3 days max

### Size Guidelines
- **Small (< 50 lines):** 10-15 min review
- **Medium (50-200 lines):** 30-45 min
- **Large (200+ lines):** Break into smaller PRs

## Tools

### GitHub
- Review requests
- Inline comments
- Suggestions (can apply directly)
- Required reviews

### VS Code Extensions
- **GitLens** - Blame info
- **GitHub Pull Requests** - Review from editor

## Team Rules

### Who Reviews
- **Junior → Senior** reviews
- **Cross-team** for shared components  
- **Domain expert** for specific areas
- **At least 1 approval** required

### What Not to Review
- Generated code
- Package-lock.json
- Migration files (unless logic)
- Vendor files

## Tips for Reviewers

1. **Be kind** - Remember there's a human
2. **Be specific** - Point to exact lines
3. **Explain why** - Don't just say "change this"
4. **Approve if works** - Don't block on style
5. **Ask questions** - "Why did you choose this approach?"