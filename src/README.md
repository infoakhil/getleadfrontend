# Getlead CRM Frontend - Modular Architecture

## Architecture Overview

This project follows a modular architecture with a single source of truth pattern for state management.

### Core Principles

1. **Single Source of Truth**: All data flows through the `DataService` class
2. **Context-Based State Management**: React Context API for global state
3. **Feature-Based Organization**: Code organized by features rather than file types
4. **Reusable Components**: Common UI components shared across features
5. **Type Safety**: Full TypeScript support with centralized type definitions

### Folder Structure

```
src/
├── components/          # Shared components
│   ├── common/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── app-sidebar.tsx # Main navigation
│
├── contexts/           # React contexts for state management
│   └── DataContext.tsx # Main data provider
│
├── features/          # Feature-specific modules
│   ├── dashboard/     # Dashboard feature
│   ├── leads/        # Leads management
│   ├── companies/    # Company management
│   └── deals/        # Deals tracking
│
├── hooks/            # Custom React hooks
│   ├── useLeads.ts   # Lead-specific logic
│   └── useDashboard.ts # Dashboard logic
│
├── services/         # Business logic & data layer
│   └── dataService.ts # Single source of truth
│
├── types/           # TypeScript type definitions
│   └── index.ts     # Centralized types
│
└── config/          # App configuration
    └── index.ts     # Config constants
```

### Data Flow

1. **DataService** → Single source of truth for all data operations
2. **DataContext** → Provides data and operations to React components
3. **Custom Hooks** → Encapsulate feature-specific logic
4. **Components** → Consume data via hooks and context

### Key Components

#### DataService (`services/dataService.ts`)
- Manages all CRUD operations
- Notifies listeners of data changes
- Maintains data consistency

#### DataContext (`contexts/DataContext.tsx`)
- Wraps the app with data provider
- Subscribes to DataService changes
- Provides data access to components

#### Custom Hooks
- `useData()`: Access global data context
- `useLeads()`: Lead-specific operations and computed values
- `useDashboard()`: Dashboard statistics and aggregations

### Adding New Features

1. Create feature folder: `src/features/[feature-name]/`
2. Add components in feature folder
3. Create custom hook if needed: `src/hooks/use[Feature].ts`
4. Update DataService with new operations
5. Add types to `src/types/index.ts`

### Benefits

- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Reusability**: Shared components and hooks
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized re-renders with context
- **Testing**: Easy to test isolated modules