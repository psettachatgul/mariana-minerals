# Base Runtime Environment - Web Application

A modern, full-stack web application built with Next.js that showcases example implementations of common web application patterns and features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)

## Features

- **User Authentication**: Auth0 integration with login/signup flows
- **File Upload**: Import and process data files
- **Advanced Filtering**: Filter data by multiple criteria with support for field selection and various filter types (string, number, date, select)
- **Sorting**: Sort data by multiple fields with ascending/descending options
- **Data Table**: Paginated table view with customizable columns
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly interface using Material-UI
- **Type-Safe**: Full TypeScript support with Zod validation
- **API Routes**: Example patterns for building type-safe API endpoints
- **Dependency Injection**: Inversify-based DI container for managing dependencies

## Tech Stack

- **Frontend**:
  - Next.js 16+ with App Router
  - React 19
  - TypeScript 5
  - Material-UI (MUI) v7
  - Recharts for data visualization
  - React Query (TanStack Query) for state management
  - React Hook Form for form handling
  - Emotion for styling

- **Backend**:
  - Next.js API Routes with type-safe routing
  - MongoDB for data persistence (optional)
  - Axios for HTTP requests
  - Auth0 for authentication

- **Development & Quality**:
  - ESLint with TypeScript support
  - Prettier for code formatting
  - Zod for runtime type validation
  - env-cmd for environment management

## Prerequisites

- Node.js 18+ (recommended 20 LTS)
- npm or yarn package manager
- Auth0 account (for authentication)
- MongoDB instance (optional, for data persistence)

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd base-runtime-environment-nextjs
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**
   
   Create a `.env.development.local` file in the project root:
   ```bash
   MONGO_DB_URI=mongodb://localhost:27017
   DB_NAME=your_database_name
   NEXT_PUBLIC_VERCEL_ENV=development
   ```

   For production deployments, create a `.env.production.local` file with appropriate values.

4. **Verify Installation**
   ```bash
   yarn run lint
   ```

## Getting Started

### Development Server

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The app will automatically reload as you make changes to files.

### Production Build

```bash
yarn run build
yarn start
```

## Project Architecture

### Directory Structure

```
base-web-app-nextjs/
├── app/
│   ├── (authenticated)/          # Route group for authenticated pages
│   │   ├── home/                 # Home page (authenticated)
│   │   │   ├── page.tsx          # Home page wrapper
│   │   │   └── _components/
│   │   │       ├── Home/         # Main home dashboard component
│   │   │       └── Example/      # Example component demonstrating API integration
│   │   ├── page.tsx              # Authenticated root page
│   │   └── layout.tsx            # Layout with LeftNavBar and AuthProvider
│   ├── (unauthenticated)/        # Route group for public pages
│   │   ├── layout.tsx            # Layout for unauthenticated routes
│   │   └── unauthenticated/
│   │       └── page.tsx          # Public page example
│   ├── _components/              # Reusable React components
│   │   ├── Chart/                # Data visualization component
│   │   ├── DataTable/            # Paginated table with filtering/sorting
│   │   ├── Filter/               # Filter criteria builder
│   │   ├── FilterDialog/         # Filter modal dialog
│   │   ├── Form/                 # Form wrapper with react-hook-form
│   │   ├── Sort/                 # Sort criteria builder
│   │   ├── SortDialog/           # Sort modal dialog
│   │   ├── Table/                # Base table component
│   │   ├── TableRowActionMenu/   # Row action menu
│   │   ├── LeftNavBar/           # Navigation sidebar
│   │   ├── UploadFileDialog/     # File upload modal
│   │   └── ...  
│   ├── _contexts/                # React contexts for global state
│   │   ├── ClientProviders.tsx   # Wraps all client-side providers
│   │   ├── ThemeContext.tsx      # Dark mode theme management
│   │   ├── AlertProvider/        # Global alert/notification system
│   │   ├── ReactQueryProvider.tsx # React Query configuration
│   │   └── AuthContext/          # Auth0 integration and user state
│   ├── api/                       # Next.js API routes
│   │   ├── example/              # Example route demonstrating GET/POST handling
│   │   │   ├── route.ts          # Example route handlers
│   │   │   └── _schemas.ts       # Example parameter schemas
│   │   └── files/
│   │       ├── upload/           # File upload handler (production)
│   │       └── upload-dev/       # File upload handler (development)
│   ├── layout.tsx                # Root layout (server component)
│   ├── page.module.css           # Main page styles
│   ├── favicon.ico               # Favicon
│   └── globals.css               # Global styles
├── _lib/                         # Library code and utilities
│   ├── auth/                     # Authentication providers
│   │   ├── index.ts              # Abstract Auth class and auth() helper
│   │   ├── _schemas.ts           # Auth user schema and types
│   │   ├── MockAuth.ts           # Mock auth implementation
│   │   ├── UserManagement.ts     # Abstract user management class
│   │   ├── MockUserManagement.ts # Mock user management implementation
│   │   └── auth0NextJs/          # Auth0 Next.js SDK implementation
│   │       ├── Client.ts         # Auth0 client-side auth provider
│   │       ├── Server.ts         # Auth0 server-side auth provider
│   │       ├── UserManagement.ts # Auth0 user management
│   │       └── utils.ts          # Auth0 utility functions
│   ├── constants.ts              # Application constants and enums
│   ├── contexts/                 # Server-side session context management
│   │   ├── session/              # Session context abstractions
│   │   │   ├── ContextBase.ts    # Base server context implementation
│   │   │   ├── context.ts        # Abstract SessionContext class
│   │   │   ├── store.ts          # Session store type definitions
│   │   │   ├── mock/             # Mock implementation contexts
│   │   │   │   ├── BrowserContext.ts
│   │   │   │   └── ServerContext.ts
│   │   │   └── auth0NextJs/      # Auth0 implementation contexts
│   │   │       ├── BrowserContext.ts
│   │   │       └── ServerContext.ts
├── _lib/iocConfig/               # Inversify Dependency Injection configuration
│   ├── containers.ts             # Container getter/setter and loader
│   ├── mock/                     # Mock implementation DI setup
│   │   ├── browser.ts            # Browser mock container
│   │   └── server.ts             # Server mock container
│   └── auth0NextJs/              # Auth0 implementation DI setup
│       ├── browser.ts            # Browser Auth0 container
│       └── server.ts             # Server Auth0 container
│   └── routes/                   # Route handling utilities with type-safe parameters
├── _locale/                      # Internationalization strings
│   └── en-US.ts                  # English locale strings
├── _schemas/                     # Shared Zod schemas
│   └── index.ts                  # Schema exports
├── public/                       # Static assets
├── .vscode/                      # VS Code settings
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies

```

### Core Components

#### **Chart Component** (`app/_components/Chart/`)
- Renders charts using Recharts for data visualization
- Supports various chart types and configurations
- Theme-aware styling

#### **Form Component** (`app/_components/Form/`)
- Wraps react-hook-form's FormProvider for centralized form state management
- Supports optional title display with Material-UI Typography
- Renders form fields as children
- Action buttons row at the bottom with dark mode support
- Handles form submission with optional form name attribute
- Full TypeScript generic support for type-safe form values

#### **DataTable Component** (`app/_components/DataTable/`)
- Wrapper component combining table, filtering, and sorting
- Pagination with custom page navigation
- Responsive design

#### **Filter/Sort Components** (`app/_components/Filter/` and `app/_components/Sort/`)
- Dynamic criteria builder for filtering and sorting
- Multiple filter types: string, number, date, select
- Supports negation for filter criteria

#### **Upload File Dialog** (`app/_components/UploadFileDialog/`)
- File selection and upload interface
- Progress tracking for large files
- Stream-based processing for development mode
- Vercel Blob storage for production

#### **Left Navigation** (`app/_components/LeftNavBar/`)
- Responsive sidebar navigation
- Dark mode toggle
- Mobile drawer support

### State Management

#### **Client-Side Contexts**
- **ThemeContext**: Manages light/dark mode, persists preference to localStorage
- **AlertProvider**: Global notification system with Snackbar
- **ReactQueryProvider**: TanStack React Query configuration with retry logic and error handling

### Authentication & Server-Side Context

#### **Auth System** (`_lib/auth/`)

The authentication system is built as an abstract pattern with pluggable implementations. The design allows switching between mock and Auth0 providers:

**Auth Abstract Class** (`_lib/auth/index.ts`):
- Provides a contract for authentication implementations
- Core Methods:
  - `init()`: Initialize the auth provider with options
  - `isLoggedIn()`: Check if user is currently logged in
  - `getCurrentUser()`: Retrieve the current authenticated user
  - `getIdTokenOfCurrentUser()`: Get ID token for current user
  - `signOut()`: Sign out the current user
  - `onSignOut`: Callback hook for sign-out events

**UserManagement Abstract Class** (`_lib/auth/UserManagement.ts`):
- Handles user account operations
- Methods:
  - `init()`: Initialize the user management provider
  - `createUser()`: Create a new user account
  - `getIdToken()`: Get ID token for a user
  - `getUserByEmail()`: Look up user by email
  - `getUserById()`: Look up user by ID

**User Schema** (`_lib/auth/_schemas.ts`):
```typescript
TAuthUser {
  _id: string;      // User ID
  email: string;    // User email
}
```

**Implementations**:
- **MockAuth** (`_lib/auth/MockAuth.ts`): Default mock implementation for development/testing
- **Auth0NextJsClient** (`_lib/auth/auth0NextJs/Client.ts`): Client-side Auth0 provider
- **Auth0NextJsServer** (`_lib/auth/auth0NextJs/Server.ts`): Server-side Auth0 provider with session management
- **Auth0NextJsUserManagement** (`_lib/auth/auth0NextJs/UserManagement.ts`): Auth0 user account operations

#### **SessionContext** (`_lib/contexts/session/`)

The SessionContext provides a container for managing server-side request context on the backend:

**SessionContext Abstract Class** (`context.ts`):
- `getContext()`: Retrieve the current session context
- `runInContext()`: Execute a callback within a specific context with auth and user management providers
- `updateStore()`: Update the session context store

**Session Store** (`store.ts`):
```typescript
TSessionContextStore = {
  authProvider: Auth;                    // The authentication provider (injected)
  userManagementProvider?: UserManagement; // User management provider (optional)
  request?: NextRequest;                 // Optional Next.js request object
}
```

**Context Implementations**:
- **mock/BrowserContext**: Client-side mock auth context
- **mock/ServerContext**: Server-side mock auth context
- **auth0NextJs/BrowserContext**: Client-side Auth0 context
- **auth0NextJs/ServerContext**: Server-side Auth0 context with async local storage

**Use Cases**:
- Running server-side operations (middleware, API routes) with proper authentication context
- Accessing the auth provider within request handlers
- Managing request-scoped data
- Switching implementations without changing application code

#### **Dependency Injection** (`_lib/iocConfig/`)

Uses Inversify container for managing dependencies with pluggable implementations:

**Container Setup** (`containers.ts`):
- `getIocContainer()`: Retrieve the singleton IoC container
- `setIocContainer()`: Initialize the container (called during app startup)
- `containerIsLoaded()`: Check if container is initialized

**Implementation Selection**:
There are two separate DI setups that can be swapped:

- **mock/** (`mock/browser.ts`, `mock/server.ts`)
  - Client-side: Registers MockAuth provider
  - Server-side: Registers mock SessionContext
  - Use for development/testing

- **auth0NextJs/** (`auth0NextJs/browser.ts`, `auth0NextJs/server.ts`)
  - Client-side: Registers Auth0NextJsClient provider
  - Server-side: Registers Auth0NextJsServerContext
  - Use for production with Auth0 integration

**To Switch Implementations**:
Change the import in `_lib/routes/index.ts`:
```typescript
// For Auth0:
import '../iocConfig/auth0NextJs/server';
// For Mock:
import '../iocConfig/mock/server';
```

**Benefits**:
- Loose coupling between components
- Easy to swap implementations at runtime
- Testable architecture with dependency injection
- Type-safe with TypeScript decorators
- Isolated mock vs production implementations

#### **Route Organization**

Routes are organized using Next.js route groups for clear separation:

**Authenticated Routes** (`app/(authenticated)/`):
- Protected pages accessible only to logged-in users
- Wrapped with `AuthProvider` in layout
- Home page and user-specific content
- Layout uses `export const dynamic = 'force-dynamic'` to prevent prerendering

**Unauthenticated Routes** (`app/(unauthenticated)/`):
- Public pages accessible without authentication
- Login/signup flows
- Example public pages
- Can be statically prerendered

#### **Middleware & Auth0 Integration** (`proxy.ts`)

The application uses Next.js middleware for Auth0 integration:

```typescript
export async function proxy(request: NextRequest) {
  const auth0 = new Auth0Client();
  return await auth0.middleware(request);
}
```

**Middleware Matcher**:
- Intercepts all requests except static files and public routes
- Routes `/auth/login`, `/auth/logout`, `/auth/callback` to Auth0
- Manages session cookies for authentication

**Auth0 Routes** (handled automatically):
- `/auth/login` - Redirects to Auth0 login page
- `/auth/logout` - Logs out the user
- `/auth/callback` - Handles OAuth callback
- `/auth/profile` - Returns user profile as JSON
- `/auth/access-token` - Returns access token

#### **Integration Flow**

1. **App Startup**:
   - ClientProviders wraps all client-side contexts (Theme, Alert, ReactQuery)
   - Root layout is a Server Component (no 'use client')
   - AuthProvider provides Auth0 user data to authenticated routes

2. **Authentication Flow**:
   - User accesses protected route
   - Middleware forwards to Auth0 if not authenticated
   - Auth0 redirects to login
   - Upon success, creates session cookie
   - Middleware allows request to proceed
   - AuthProvider shows authenticated content

3. **Request Handling**:
   - API routes can access SessionContext via IoC container
   - Auth0 server provider handles session verification
   - Can run operations within context using `runInContext()`

4. **Frontend Usage**:
   - `AuthProvider` (in authenticated layout) uses Auth0 hooks
   - `useAuth0NextJsUser()` hook gets current user
   - Components rendered only if user is authenticated
   - Shows login form if user not authenticated

### API Routes

#### **Upload Endpoints**
- `POST /api/files/upload`: Production file upload with Vercel Blob
- `POST /api/files/upload-dev`: Development file upload for local testing

### Database Layer

- **MongoDB Integration** (`lib/mongo.ts`):
  - Connection pooling and caching
  - Transaction management with retry logic
  - Session handling

### Imports from @patson/utils

The application uses shared utilities from the @patson/utils package:
- **env.ts**: Environment detection utilities (`isDev()`, `isProduction()`, `isStage()`, `isPreview()`, `isDemo()`)
- **jsonStreamHelpers.ts**: Stream-based JSON parsing for handling large files without memory overhead
- **mongo.ts**: MongoDB utilities for connection management and transactions
- **schemas/primitives.ts**: Shared Zod schema validators
- **types.ts**: Shared TypeScript types (e.g., `Flatten<T>`)

## Environment Configuration

### Development Setup

1. Create `.env.development.local`:
   ```
   AUTH0_SECRET='your-auth0-secret'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
   AUTH0_CLIENT_ID='your-auth0-client-id'
   AUTH0_CLIENT_SECRET='your-auth0-client-secret'
   MONGO_DB_URI=mongodb://localhost:27017 (optional)
   DB_NAME=base_rte_dev (optional)
   NEXT_PUBLIC_VERCEL_ENV=development
   ```

2. Set up Auth0:
   - Create an Auth0 account at https://auth0.com
   - Create a new application (Regular Web Application)
   - Configure allowed callback URLs: `http://localhost:3000/auth/callback`
   - Configure allowed logout URLs: `http://localhost:3000`

### Production Setup

Environment variables for production:
- `AUTH0_SECRET`: Your Auth0 secret
- `AUTH0_BASE_URL`: Your production domain
- `AUTH0_ISSUER_BASE_URL`: Your Auth0 tenant URL
- `AUTH0_CLIENT_ID`: Your Auth0 client ID
- `AUTH0_CLIENT_SECRET`: Your Auth0 client secret
- `MONGO_DB_URI`: Your production MongoDB connection string (optional)
- `DB_NAME`: Production database name (optional)
- `NEXT_PUBLIC_VERCEL_ENV=production` (automatically set by Vercel)
- `NEXT_PUBLIC_APP_ENV=production` (used by environment detection utilities)

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn run dev` | Start development server with environment variables from `.env.development.local` |
| `yarn run build` | Build the project for production |
| `yarn start` | Start production server |
| `yarn run lint` | Run ESLint to check code quality |

## Architecture Patterns

### Build & Rendering

- **Server Components**: Root layout uses server rendering (no 'use client')
- **Client Providers**: ClientProviders wrapper isolates all client-side logic
- **Route-Specific Dynamic Rendering**: Authenticated routes use `export const dynamic = 'force-dynamic'` to prevent prerendering of auth-dependent content
- **Static Prerendering**: Unauthenticated routes can be statically prerendered for performance

### Environment Handling

- **Build Time**: `NEXT_PUBLIC_APP_ENV` is undefined during build; util functions gracefully handle this with warnings
- **Runtime**: Environment variables are available from deployment platform (Vercel, etc.)
- **Fallback**: Environment checks return falsy values during build instead of throwing errors

## Code Standards

- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier integration
- **Max Line Length**: 120 characters
- **Imports**: Organized and checked for unused imports
- **Type Safety**: Full TypeScript strict mode
- **Component Organization**: Separates server and client components appropriately
- **Context Usage**: Client-side contexts isolated in ClientProviders wrapper

## Example API Route

The project includes an example API route at `/api/example` that demonstrates recommended patterns:

- **Type-safe parameter handling**: Uses Zod schemas for runtime validation
- **Flexible routing**: Supports both GET (with URL parameters) and POST (with request body)
- **handleRoute wrapper**: Centralized middleware for common tasks like parameter parsing

This pattern should be followed when adding new API routes to the application.

## Contributing

When working on this project:

1. Follow the existing file structure and naming conventions
2. Keep components small and focused
3. Use locale strings for all user-facing text
4. Maintain TypeScript strict mode compliance
5. Run linting before committing: `yarn run lint`
6. Add appropriate error handling and validation using Zod
7. Use environment utilities from `@patson/utils/env` for environment checks instead of direct `process.env` access
8. Import shared utilities from `@patson/utils` rather than duplicating code
9. Keep Server Components (no 'use client') at root/layout level for better build performance
10. Use 'use client' only in ClientProviders and components that require client-side interactivity
11. Organize routes using route groups for clear logical separation
12. Add `export const dynamic = 'force-dynamic'` to layouts with auth-dependent content
13. Follow the dependency injection pattern for extensible auth implementations
14. Create both mock and production implementations when adding new providers

## License

Private project
