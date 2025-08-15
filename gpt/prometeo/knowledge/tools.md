hh
# Tools

## Code Editors

### VS Code (Recomendado)
**Por qué:** Gratis, extensiones, Git integrado
**Extensiones esenciales:**
- Prettier (formato automático)
- ESLint (detectar errores)
- Auto Rename Tag
- Live Server

### Alternatives
- **WebStorm** - Potente pero paid
- **Sublime Text** - Rápido, minimalista

## Version Control

### Git + GitHub
**Comandos básicos:**
```bash
git clone <repo>
git add .
git commit -m "message"
git push origin main
```

### GitHub Features
- **Issues** - Track bugs/features  
- **Projects** - Kanban boards
- **Actions** - CI/CD
- **Pages** - Free hosting

## Design Tools

### Figma (Recomendado)
**Para:** UI design, prototypes, design systems
**Por qué:** Gratis, colaborativo, web-based

### Alternatives
- **Adobe XD** - Más features
- **Sketch** - Solo Mac

## API Development

### Postman
**Para:** Test APIs, document endpoints
**Features:** Collections, environments, tests

### Thunder Client (VS Code)
**Para:** Test APIs desde VS Code
**Por qué:** No cambiar de app

## Database Tools

### pgAdmin (PostgreSQL)
**Para:** Manage PostgreSQL databases
**Features:** Query editor, schema browser

### MongoDB Compass
**Para:** MongoDB GUI
**Features:** Visual query builder

## Project Management

### Linear (Recomendado)
**Para:** Issue tracking, project planning
**Por qué:** Rápido, moderno, good for developers

### Alternatives
- **Jira** - Enterprise, más features
- **Trello** - Simple kanban
- **GitHub Issues** - Si ya usas GitHub

## Communication

### Slack/Discord
**Para:** Team chat, integrations
**Features:** Channels, threads, bots

### Zoom/Google Meet
**Para:** Video calls, pair programming
**Features:** Screen sharing, recording

## Deployment & Hosting

### Frontend
- **Vercel** - Best for React/Next.js
- **Netlify** - Good for static sites
- **GitHub Pages** - Free for open source

### Backend
- **Railway** - Easy, modern
- **Heroku** - Classic, more expensive
- **DigitalOcean** - VPS, more control

### Database
- **Railway** - PostgreSQL hosting
- **PlanetScale** - MySQL, serverless
- **MongoDB Atlas** - MongoDB hosting

## Monitoring & Analytics

### Sentry
**Para:** Error tracking
**Por qué:** Catch production errors

### Google Analytics
**Para:** Website analytics
**Features:** Traffic, user behavior

### Vercel Analytics
**Para:** Web vitals, performance
**Integration:** Perfect with Vercel

## Browser Developer Tools

### Chrome DevTools
**Network tab:** Debug API calls
**Console:** Debug JavaScript  
**Elements:** Inspect HTML/CSS
**Performance:** Find bottlenecks

### Extensions
- **React DevTools** - Debug React apps
- **Redux DevTools** - Debug Redux state
- **Vue DevTools** - Debug Vue apps

## Terminal/CLI

### Windows
- **Git Bash** - Unix commands on Windows
- **Windows Terminal** - Modern terminal

### Mac/Linux
- **iTerm2** (Mac) - Better than default
- **Zsh + Oh My Zsh** - Better shell

### Useful CLI Tools
- **npm/yarn** - Package managers
- **npx** - Run packages without installing
- **curl** - Test APIs from terminal

## Documentation

### Notion
**Para:** Team docs, project planning
**Features:** Databases, templates

### GitBook
**Para:** Public documentation
**Features:** Good for API docs

## Learning Resources

### Free
- **MDN** - Web documentation
- **freeCodeCamp** - Interactive tutorials
- **YouTube** - Video tutorials

### Paid
- **Udemy** - Structured courses
- **Pluralsight** - Professional training
- **Egghead** - Short, focused lessons

## Package Managers

### npm (Default)
```bash
npm install package-name
npm run build
```

### Yarn (Alternative)
```bash
yarn add package-name
yarn build
```

### pnpm (Faster)
```bash
pnpm add package-name
pnpm build
```

## Team Recommendation Stack

### Startup (2-5 people)
- **Code:** VS Code
- **Design:** Figma  
- **PM:** Linear
- **Chat:** Discord
- **Deploy:** Vercel + Railway

### Medium Team (5-15 people)
- **Code:** VS Code + WebStorm
- **PM:** Jira
- **Chat:** Slack
- **Docs:** Notion
- **Deploy:** Multiple environments