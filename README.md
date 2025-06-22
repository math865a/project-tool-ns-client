# Project Management Tool Client

## Purpose

This project is a demonstration of technical skills and code organization intended for a job application. It showcases modern web development practices, architectural patterns, and clean code principles through a comprehensive project management application.

## Overview

This is a full-stack web application designed to manage project resources, work packages, scheduling, and team collaboration. The application would provide a complete project management solution with features including:

- **Resource Management**: Track and manage project resources, their capacities, and assignments
- **Work Package Planning**: Create and manage work packages with Gantt chart visualization
- **Project Scheduling**: Advanced scheduling with timeline views and deadline management
- **Team Collaboration**: User management, access control, and team coordination
- **Financial Tracking**: Contract and financial source management
- **Real-time Updates**: WebSocket integration for live data synchronization

The application addresses the complex challenges of modern project management, including resource allocation, timeline planning, cost tracking, and team coordination across multiple projects and stakeholders.

## Technical Stack

### Frontend Framework
- **Remix** - Full-stack React framework with server-side rendering
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development

### UI/UX Libraries
- **Material-UI (MUI)** - Professional component library with theming
- **Emotion** - CSS-in-JS styling solution
- **Tabler Icons** - Comprehensive icon library
- **React Big Calendar** - Calendar component for scheduling

### State Management
- **MobX** - Reactive state management
- **MobX Keystone** - Model-driven state management

### Data Visualization
- **VisX** - Low-level visualization primitives
- **Recharts** - Declarative charting library
- **D3.js** - Data manipulation and visualization utilities

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Yup** - Schema validation
- **Hookform Resolvers** - Form validation integration

### Drag & Drop
- **@dnd-kit** - Modern drag and drop library

### Real-time Communication
- **Socket.IO Client** - Real-time bidirectional communication

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Docker** - Containerization

## Code Structure

```
app/
├── config/                 # Application configuration
│   └── mui/               # Material-UI theme and SSR setup
├── routes/                # Remix route definitions
│   ├── _auth/            # Authentication routes
│   ├── app/              # Main application routes
│   │   ├── resources/    # Resource management
│   │   ├── workpackages/ # Work package management
│   │   ├── schedule/     # Scheduling features
│   │   └── users/        # User management
│   └── api/              # API endpoints
├── src/
│   ├── _definitions/     # TypeScript type definitions
│   ├── components/       # Reusable UI components
│   ├── design-system/    # Design system components
│   ├── features/         # Feature-specific modules
│   │   ├── gantt/        # Gantt chart functionality
│   │   ├── calendar/     # Calendar features
│   │   └── resource-capacity/ # Resource capacity planning
│   ├── hooks/            # Custom React hooks
│   ├── layout/           # Layout components
│   └── session-user/     # User session management
├── styles/               # Global styles
└── util/                 # Utility functions
```

### Key Architectural Patterns

1. **Feature-Based Organization**: Code is organized by business features rather than technical concerns
2. **Component Composition**: Reusable design system components with consistent APIs
3. **Type-Driven Development**: Comprehensive TypeScript definitions for all data models
4. **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers
5. **Modular Architecture**: Self-contained feature modules with minimal dependencies

## Design Decisions

### 1. Remix Framework Choice
- **Server-Side Rendering**: Improved SEO and initial load performance
- **Nested Routing**: Intuitive URL structure and code organization
- **Data Loading**: Co-located data fetching with components
- **Error Boundaries**: Graceful error handling at route level

### 2. Material-UI Integration
- **Professional Design**: Enterprise-grade UI components
- **Theme System**: Consistent design tokens and customization
- **Accessibility**: Built-in accessibility features
- **Responsive Design**: Mobile-first responsive components

### 3. State Management Strategy
- **MobX for Local State**: Reactive state management for component state
- **Server State**: Remix loaders for server-side data
- **Real-time Updates**: Socket.IO for live data synchronization

### 4. Type Safety Approach
- **Comprehensive Types**: Full TypeScript coverage for all data models
- **Domain Models**: Strongly typed business entities
- **API Contracts**: Type-safe API communication

### 5. Component Architecture
- **Design System**: Reusable, composable UI components
- **Feature Components**: Business logic encapsulated in feature modules
- **Layout Components**: Consistent page structure and navigation

## Development Practices Demonstrated

### 1. Clean Code Principles
- **Descriptive Naming**: Clear, meaningful variable and function names
- **Single Responsibility**: Each component and function has a single, well-defined purpose
- **DRY Principle**: Eliminated code duplication through reusable components
- **Consistent Formatting**: Prettier configuration for uniform code style

### 2. Type Safety
- **TypeScript Throughout**: Full type coverage across the application
- **Interface Definitions**: Well-defined contracts for all data structures
- **Generic Types**: Reusable type definitions for common patterns

### 3. Component Design
- **Composition Over Inheritance**: Flexible component composition patterns
- **Props Interface**: Clear component APIs with TypeScript interfaces
- **Default Props**: Sensible defaults for optional properties

### 4. Error Handling
- **Error Boundaries**: Graceful error handling at multiple levels
- **Type Guards**: Runtime type checking for data validation
- **Fallback UI**: User-friendly error states and loading indicators

### 5. Performance Considerations
- **Code Splitting**: Route-based code splitting with Remix
- **Lazy Loading**: Dynamic imports for heavy components
- **Memoization**: React.memo and useMemo for expensive computations
- **Bundle Optimization**: Tree shaking and dead code elimination

### 6. Development Workflow
- **ESLint Configuration**: Code quality enforcement
- **Prettier Integration**: Consistent code formatting
- **Type Checking**: Continuous type safety validation
- **Docker Setup**: Containerized development and deployment

## Limitations / Disclaimer

**Important**: This codebase is not intended to be executable or complete. It serves as a demonstration of:

- Technical architecture and design patterns
- Code organization and structure
- Development practices and conventions
- Problem-solving approaches
- Technology stack familiarity

The application lacks:
- Backend API implementation
- Database schemas and migrations
- Authentication service integration
- Production deployment configuration
- Comprehensive test coverage
- Complete business logic implementation

This project is designed to showcase coding skills, architectural thinking, and development best practices rather than provide a functional application.

## Author

**Mathias Ohrgaard**

This project demonstrates proficiency in modern web development technologies, architectural design, and clean code practices. The codebase showcases the ability to build scalable, maintainable applications using industry-standard tools and frameworks.

---

*This README serves as documentation for a technical skills demonstration project. The codebase represents a comprehensive understanding of full-stack web development, modern JavaScript/TypeScript practices, and enterprise-level application architecture.* 