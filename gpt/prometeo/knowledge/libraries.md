# Libraries

## Frontend UI

### React Ecosystem
**UI Components:**
- **Material-UI** - Google's design system
- **Ant Design** - Enterprise UI components
- **Chakra UI** - Simple, fast
- **React Bootstrap** - Bootstrap for React

**State Management:**
- **Redux Toolkit** - Complex state
- **Zustand** - Simple, modern
- **Context API** - Built-in React

**Routing:**
- **React Router** - Standard choice
- **Next.js Router** - If using Next.js

**Forms:**
- **React Hook Form** - Performance focused
- **Formik** - Feature rich

### Vue Ecosystem
- **Vuetify** - Material design
- **Quasar** - Full framework
- **Element Plus** - Desktop focused

### Styling
- **Tailwind CSS** - Utility classes
- **Styled Components** - CSS-in-JS
- **Emotion** - CSS-in-JS alternative
- **SCSS** - CSS preprocessor

## Backend Libraries

### Node.js
**Web Frameworks:**
- **Express** - Minimal, flexible
- **Fastify** - High performance
- **Koa** - Modern Express alternative

**Database:**
- **Prisma** - Modern ORM
- **Mongoose** - MongoDB ODM
- **Sequelize** - SQL ORM
- **TypeORM** - TypeScript ORM

**Authentication:**
- **jsonwebtoken** - JWT handling
- **passport** - Auth strategies
- **bcrypt** - Password hashing

**Validation:**
- **joi** - Schema validation
- **yup** - Schema builder
- **zod** - TypeScript first

### Python
**Web Frameworks:**
- **FastAPI** - Modern, fast
- **Django** - Full framework
- **Flask** - Minimal

**Database:**
- **SQLAlchemy** - ORM
- **Django ORM** - Built-in
- **Tortoise ORM** - Async

## Utility Libraries

### JavaScript
**Date/Time:**
- **date-fns** - Functional date utils
- **dayjs** - Lightweight moment.js
- **luxon** - Successor to moment

**HTTP Requests:**
- **axios** - Feature rich
- **fetch** - Native browser API
- **ky** - Modern alternative

**Validation:**
- **joi** - Schema validation  
- **yup** - Form validation
- **validator.js** - String validation

**Utilities:**
- **lodash** - Utility functions
- **ramda** - Functional programming
- **uuid** - Generate unique IDs

## Testing

### Frontend
- **Jest** - Test runner
- **React Testing Library** - React testing
- **Cypress** - E2E testing
- **Playwright** - Modern E2E

### Backend  
- **Jest** - Node.js testing
- **Supertest** - API testing
- **Mocha** - Test framework
- **Chai** - Assertion library

## Development Tools

### Build Tools
- **Vite** - Fast build tool
- **Webpack** - Module bundler
- **Parcel** - Zero config bundler

### Code Quality
- **ESLint** - JavaScript linter
- **Prettier** - Code formatter
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

### TypeScript
- **@types/*** - Type definitions
- **ts-node** - Run TypeScript directly
- **tsc** - TypeScript compiler

## Specific Use Cases

### Charts & Data Viz
- **Chart.js** - Simple charts
- **D3.js** - Complex visualizations
- **Recharts** - React charts
- **Victory** - React Native compatible

### File Upload
- **Multer** - Node.js file upload
- **react-dropzone** - Drag & drop
- **uploadcare** - Third-party service

### Real-time
- **Socket.io** - WebSocket abstraction
- **ws** - Simple WebSocket
- **Pusher** - Hosted real-time

### Email
- **Nodemailer** - Send emails
- **SendGrid** - Email service
- **Mailgun** - Email API

### Payment
- **Stripe** - Payment processing
- **PayPal** - Payment integration

## Selection Criteria

### Consider
1. **Bundle size** - Will it slow your app?
2. **Maintenance** - Is it actively maintained?
3. **Documentation** - Good docs and examples?
4. **Community** - GitHub stars, issues
5. **Team familiarity** - Does team know it?

### Red Flags
- No updates in 6+ months
- Many open issues
- Poor documentation
- Huge bundle size
- Breaking changes frequently

## Recommendations by Project

### MVP/Startup
**Keep it minimal:**
- React + React Router
- Axios for HTTP
- Simple CSS or Tailwind
- Express + basic middleware

### Growing Product
**Add structure:**
- Redux Toolkit for state
- React Hook Form
- UI component library
- Prisma for database

### Enterprise
**Full ecosystem:**
- Complete UI framework
- Comprehensive testing
- TypeScript everywhere
- Monitoring tools

## Bundle Size Tips

### Check sizes
```bash
npm install -g bundlephobia-cli
bundlephobia lodash
```

### Tree shaking
```javascript
// Bad - imports entire library
import _ from 'lodash';

// Good - import only what you need  
import { debounce } from 'lodash';
```

### Alternatives
- **lodash** → use native JS methods
- **moment** → date-fns or dayjs
- **jQuery** → native DOM methods