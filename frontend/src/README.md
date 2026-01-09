# Frontend Architecture

This document describes the professional structure of the React frontend application.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Statistics/     # Statistics dashboard component
│   ├── ItemForm/        # Form for creating/editing items
│   ├── ItemCard/        # Individual item card component
│   └── ItemList/        # List of items component
├── hooks/               # Custom React hooks
│   ├── useInventory.js  # Inventory state management hook
│   └── useForm.js       # Form state management hook
├── services/            # API service layer
│   └── api.js           # API client functions
├── utils/               # Utility functions
│   ├── constants.js     # Application constants
│   └── formatters.js    # Data formatting utilities
├── App.js               # Main application component
└── App.css              # Global styles
```

## Architecture Principles

### 1. Separation of Concerns
- **Components**: Handle UI rendering and user interactions
- **Hooks**: Manage state and side effects
- **Services**: Handle API communication
- **Utils**: Provide reusable utility functions

### 2. Component-Based Architecture
Each component is self-contained with its own:
- Component logic (`.js`)
- Styles (`.css`)
- Index file for clean imports (`index.js`)

### 3. Custom Hooks
- **useInventory**: Manages inventory state, loading, errors, and CRUD operations
- **useForm**: Handles form state, validation, and form operations

### 4. Service Layer
- Centralized API calls
- Consistent error handling
- Type conversion and data validation

## Components

### Statistics
Displays inventory overview:
- Total items count
- Total inventory value
- Low stock items count

**Props:**
- `items` (Array): Array of inventory items

### ItemForm
Form component for creating and editing items.

**Props:**
- `editingItem` (Object|null): Item being edited, null for new items
- `onSubmit` (Function): Callback when form is submitted
- `onCancel` (Function): Callback when edit is cancelled

### ItemCard
Displays a single inventory item with details and actions.

**Props:**
- `item` (Object): Inventory item object
- `onEdit` (Function): Callback when edit button is clicked
- `onDelete` (Function): Callback when delete button is clicked

### ItemList
Displays a list of inventory items.

**Props:**
- `items` (Array): Array of inventory items
- `loading` (boolean): Loading state
- `onEdit` (Function): Callback when edit button is clicked
- `onDelete` (Function): Callback when delete button is clicked

## Hooks

### useInventory
Custom hook for managing inventory state and operations.

**Returns:**
```javascript
{
  items: Array,           // Current inventory items
  loading: boolean,       // Loading state
  error: string|null,    // Error message if any
  createItem: Function,   // Create new item
  updateItem: Function,   // Update existing item
  removeItem: Function,  // Delete item
  refreshItems: Function // Refresh items list
}
```

### useForm
Custom hook for managing form state.

**Parameters:**
- `initialValues` (Object): Initial form values

**Returns:**
```javascript
{
  formData: Object,      // Current form data
  handleChange: Function, // Handle input changes
  setFieldValue: Function, // Set single field value
  setFields: Function,    // Set multiple fields
  resetForm: Function,    // Reset to initial values
  clearForm: Function     // Clear all fields
}
```

## Services

### API Service (`services/api.js`)
Centralized API client with the following functions:

- `fetchItems()` - Get all items
- `fetchItemById(id)` - Get single item
- `createItem(itemData)` - Create new item
- `updateItem(id, itemData)` - Update item
- `deleteItem(id)` - Delete item

All functions return Promises and handle errors consistently.

## Utils

### Constants (`utils/constants.js`)
- `API_URL` - Backend API endpoint
- `LOW_STOCK_THRESHOLD` - Threshold for low stock warnings

### Formatters (`utils/formatters.js`)
- `formatCurrency(amount)` - Format number as USD currency
- `formatDate(dateString)` - Format date string

## Benefits of This Structure

1. **Maintainability**: Clear separation makes code easy to understand and modify
2. **Reusability**: Components and hooks can be reused across the application
3. **Testability**: Each module can be tested independently
4. **Scalability**: Easy to add new features without affecting existing code
5. **Professional**: Follows React best practices and industry standards

## Adding New Features

### Adding a New Component
1. Create component directory in `components/`
2. Add component file, styles, and index.js
3. Import and use in parent component

### Adding a New Hook
1. Create hook file in `hooks/`
2. Export hook function
3. Use in components that need the functionality

### Adding a New API Endpoint
1. Add function to `services/api.js`
2. Use in hooks or components as needed

## Best Practices

1. **Keep components small**: Each component should have a single responsibility
2. **Use custom hooks**: Extract reusable logic into hooks
3. **Centralize API calls**: All API calls go through the service layer
4. **Consistent naming**: Use descriptive, consistent names
5. **Document props**: Use JSDoc comments for component props
6. **Error handling**: Always handle errors gracefully
7. **Loading states**: Show loading indicators during async operations
