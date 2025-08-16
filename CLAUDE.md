# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Art Design Pro - An enterprise-level Vue 3 admin management system with comprehensive features for building modern dashboards.

## Commands

### Development
```bash
# Install dependencies (use pnpm)
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve
```

### Code Quality
```bash
# Format code with Prettier
pnpm lint:prettier

# Fix CSS/SCSS styling issues
pnpm lint:stylelint

# TypeScript type checking (runs automatically with build)
vue-tsc --noEmit
```

## Architecture

### API Service Migration
The codebase is undergoing a transition from legacy API structure to a new Cauchy API service layer:
- **Legacy**: `src/api/` - Being phased out
- **New**: `src/service/` - Cauchy API integration with modular structure

### Key Directories
- `src/service/` - New API layer with request wrapper, authentication, and business modules
- `src/store/modules/` - Pinia stores for state management (user, permission, app state)
- `src/router/` - Vue Router with authentication guards and dynamic route loading
- `src/views/` - Page components organized by feature modules
- `src/composables/` - Reusable composition functions (useAuth, usePermission)
- `src/directives/` - Custom directives (v-auth for permission control)

### Permission System
The app implements RBAC (Role-Based Access Control):
- Dynamic menu generation based on user permissions
- Route-level and component-level access control
- Permission directives for fine-grained UI control
- Integration with backend role/permission APIs

### State Management
Uses Pinia with persistence:
- User authentication state
- Permission/menu state
- Application preferences (theme, language, layout)

### Environment Configuration
Environment variables are managed through `.env` files:
- `VITE_API_URL` - Backend API endpoint
- `VITE_BASE_URL` - Application base path
- API proxy configuration in `vite.config.ts`

### UI Components
- Element Plus as the primary UI framework
- Custom component wrappers in `src/components/`
- Theme customization through CSS variables
- Dark/light mode support
- Multi-language support (Chinese/English) via vue-i18n

### Build Configuration
- Vite for fast development and optimized production builds
- Auto-imports for Vue APIs and Element Plus components
- Code splitting and lazy loading for routes
- Compression plugin for production builds