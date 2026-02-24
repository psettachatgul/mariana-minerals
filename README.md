# Base Runtime Environment (Base RTE)

A modern, full-stack monorepo for establishing patterns that support common web application use cases like authentication, displaying data tables, filtering, sorting, server side requests, etc.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Testing](#testing)
- [Tech Stack](#tech-stack)

## 🎯 Overview

Base RTE is a showcase project demonstrating example implementations for common web application patterns and use cases. Built with a monorepo architecture using Yarn Workspaces, it includes patterns for authentication, data management, filtering, sorting, file uploads, and more.

## 📁 Project Structure

This is a Yarn Workspace monorepo with the following structure:

```
base-repo/
├── projects/
│   ├── base-web-app-nextjs/        # Next.js web application
│   ├── utils/                      # Shared utilities, types, and environment helpers
│   ├── rules-engine/               # Expression parsing and data transformation engine
│   └── queues/                     # Queue management utilities
├── eslint.config.mjs               # ESLint configuration
├── package.json                    # Root workspace configuration
└── tsconfig.json                   # Root TypeScript configuration
```

### Projects

#### **base-web-app-nextjs**
A full-featured Next.js 16 web application showcasing example implementations for common web application patterns and features.

**Key Features:**
- User authentication with Auth0
- File upload and processing
- Advanced filtering and sorting with multiple criteria
- Paginated data tables with customizable columns
- Dark/light theme support
- Real-time processing for large files
- REST API endpoints with type-safe parameter handling
- Session management and authentication patterns
- Dependency injection with Inversify
- Internationalization (i18n) support

**Tech Stack:**
- Next.js 16+ with App Router
- React 19
- Material-UI (MUI)
- React Hook Form with Zod validation
- React Query for data fetching
- Inversify for dependency injection

**Location:** [projects/base-web-app-nextjs](projects/base-web-app-nextjs)

#### **@patson/utils**
Shared utilities, types, schemas, and environment helpers used across the monorepo.

**Includes:**
- MongoDB utilities and transaction management
- JSON stream parsing helpers
- Environment detection utilities (development, production, staging, etc.)
- Shared TypeScript schemas and types
- Common utility functions and type helpers (Flatten, etc.)

**Environment Utilities:**
- `getEnvironmentFlag()` - Get current environment flag
- `isDev()`, `isProduction()`, `isStage()`, `isPreview()`, `isDemo()` - Environment checks
- `isEnvironment(env)` - Check if current environment matches a specific flag

**Location:** [projects/utils](projects/utils)

#### **@patson/rules-engine**
A sophisticated expression parsing and data transformation engine with support for multiple output formats.

**Key Features:**
- Expression parsing and validation
- MongoDB query conversion
- Plain text value conversion
- Extensive function library for data manipulation (filter, get, set, size, hasAny)
- Support for complex operations on numbers, strings, dates, and field paths
- Comprehensive test suite with Jest

**Supported Functions:**
- **Filter Operations:** filter, hasAny
- **Data Access:** get, set
- **Utilities:** size
- **Logical Operations:** AND, OR, NOT
- **Value Types:** Literals, field paths, dates, numbers, strings

**Location:** [projects/rules-engine](projects/rules-engine)

#### **@patson/queues**
Queue management utilities for asynchronous task processing.

**Location:** [projects/queues](projects/queues)

## 📦 Prerequisites

- **Node.js**: v18 or higher (recommend v20+)
- **Yarn**: v3.6+
- **Docker** (optional): For MongoDB and Queue deployment in Kubernetes environments

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd base-repo
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Configure environment variables:**
   Create a `.env.development.local` file in the root directory with your configuration (see [Environment Configuration](#environment-configuration) section)

4. **(Optional) Start Docker containers with Kubernetes:**
   If you have Docker and Kubernetes configured, you can start the containerized dependencies (MongoDB and Cloud Tasks):
   ```bash
   kubectl apply -f ./k8s/local
   ```
   This deploys MongoDB and other services to your local Kubernetes cluster.

## 🎮 Getting Started

### Development Environment

Start the web application in development mode:

```bash
yarn web:dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the web application:

```bash
yarn web:build
```

Start the production server:

```bash
yarn web:start
```

## 📝 Available Commands

### Web Application Commands

| Command | Description |
|---------|-------------|
| `yarn web:dev` | Start development server with hot reload |
| `yarn web:build` | Build for production |
| `yarn web:start` | Start production server |

### Rules Engine Commands

| Command | Description |
|---------|-------------|
| `yarn rules:test` | Run tests in watch mode |
| `yarn rules:test:cov` | Run tests with coverage report |

### Linting

| Command | Description |
|---------|-------------|
| `yarn lint` | Run ESLint on all packages |

## 🧪 Testing

### Rules Engine Tests

The rules-engine package includes comprehensive Jest tests for expression parsing and transformations:

```bash
# Run tests in watch mode
yarn rules:test

# Run tests with coverage
yarn rules:test:cov
```

Test reports are generated in:
- `test-output/jest-report.html` - HTML test report
- `test-output/jest-coverage/` - Coverage reports

### Running Tests in Specific Workspace

```bash
yarn workspace @patson/rules-engine test
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16+ with App Router
- **UI Library:** Material-UI (MUI)
- **State Management:** React Context, React Query
- **Form Handling:** React Hook Form + Zod validation
- **Styling:** Emotion (CSS-in-JS)
- **Data Visualization:** Recharts
- **Icons:** Material-UI Icons

### Backend & Utilities
- **Runtime:** Node.js
- **Database:** MongoDB
- **API Client:** Axios
- **Dependency Injection:** Inversify with TypeScript metadata
- **File Upload:** Vercel Blob

### Development Tools
- **Language:** TypeScript
- **Linting:** ESLint
- **Testing:** Jest
- **Build Tool:** Next.js build system
- **Package Manager:** Yarn Workspaces

## 📚 Environment Configuration

Create a `.env.development.local` file in the root directory for local development. The web application scripts use this file:

```bash
# Example .env.development.local
NEXT_PUBLIC_API_URL=http://localhost:3000
# Add other required environment variables
```

## 🏗️ Architecture

### Workspace Dependencies

The projects depend on each other as follows:

```
base-web-app-nextjs
  └── @patson/utils
  
@patson/rules-engine
  └── @patson/utils

@patson/queues
  (no dependencies)
```

### Key Design Patterns

- **Abstract Authentication**: Pluggable auth providers with both mock and Auth0 implementations
- **Dependency Injection**: Inversify for managing application dependencies and swappable implementations
- **Provider Pattern**: Context providers for authentication, theme, session, and React Query
- **Route Groups**: Organized separation of authenticated vs unauthenticated routes
- **Server/Client Split**: Server Components at root level for better prerendering; client logic isolated in ClientProviders
- **Schema Validation**: Zod schemas for type-safe data validation and API contracts
- **Stream Processing**: Efficient handling of large file uploads
- **Middleware**: Auth0 integration via Next.js middleware for transparent authentication

## 📁 Directory Organization

Within each workspace:

- `_lib/` - Core library code for business logic
- `_contexts/` - React context providers
- `_components/` - Reusable React components
- `_schemas/` - Zod validation schemas
- `models/` - Data models and types
- `api/` - API route handlers
- `__tests__/` - Jest test files
- `conversion/` - Data conversion providers (rules-engine)

## 🔄 Example Workflows

### Data Upload & Processing
1. User uploads file via web interface
2. File is received by `/api/files/` endpoint
3. Data is processed and stored efficiently
4. Results displayed in paginated data table

### Authentication Flow
1. User clicks Login or Sign Up on landing page
2. Redirected to Auth0 authentication
3. Upon successful login, user session is established
4. User can access authenticated features in the application

## 📖 Additional Resources

For more detailed information:
- [Web Application README](projects/base-web-app-nextjs/README.md)
- [Rules Engine Documentation](projects/rules-engine/README.md) (if available)
- [Utils Package](projects/utils/README.md) (if available)

## 📝 License

All rights reserved. This is a private project.

## 👤 Author

Created by Patson
