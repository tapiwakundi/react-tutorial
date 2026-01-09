# Inventory Management System - Monorepo

A professional inventory management system built as a monorepo with React frontend and Express backend using SQLite.

## 📁 Monorepo Structure

```
inventory-management-monorepo/
├── backend/              # Express.js backend API
│   ├── server.js         # Main server file
│   └── package.json       # Backend dependencies
├── frontend/             # React.js frontend application
│   ├── src/              # React source code
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/    # API service layer
│   │   └── utils/        # Utility functions
│   └── package.json      # Frontend dependencies
├── package.json          # Root workspace configuration
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

Install all dependencies for both workspaces:

```bash
npm install
```

This will install dependencies for both `backend` and `frontend` workspaces automatically.

### Running the Application

**Option 1: Run separately (recommended for development)**

Terminal 1 - Start backend:
```bash
npm run start:backend
# or for development with auto-reload:
npm run dev:backend
```

Terminal 2 - Start frontend:
```bash
npm run start:frontend
```

**Option 2: Use workspace commands directly**

```bash
# Backend
cd backend && npm start

# Frontend (in another terminal)
cd frontend && npm start
```

## 📦 Workspace Scripts

### Root Level Scripts

- `npm run install:all` - Install all workspace dependencies
- `npm run start:backend` - Start backend server
- `npm run start:frontend` - Start frontend dev server
- `npm run dev:backend` - Start backend with nodemon (auto-reload)
- `npm run dev:frontend` - Start frontend dev server
- `npm run build:frontend` - Build frontend for production
- `npm run test:frontend` - Run frontend tests

### Backend Scripts (`backend/`)

- `npm start` - Start the Express server
- `npm run dev` - Start with nodemon (auto-reload)

### Frontend Scripts (`frontend/`)

- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🏗️ Architecture

### Backend (`backend/`)

- **Framework**: Express.js
- **Database**: SQLite (in-memory)
- **Port**: 3001
- **API Base URL**: `http://localhost:3001/api/items`

**API Endpoints:**
- `GET /api/items` - Get all inventory items
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Frontend (`frontend/`)

- **Framework**: React 19
- **Port**: 3000
- **Architecture**: Component-based with custom hooks

**Key Features:**
- Component-based architecture
- Custom hooks for state management
- Service layer for API calls
- Utility functions for formatting
- Responsive design

## 📚 Workspace Management

This project uses npm workspaces to manage multiple packages in a single repository.

### Benefits of Monorepo Structure:

1. **Single Repository**: One git repository for all code
2. **Shared Dependencies**: Common dependencies can be hoisted
3. **Consistent Versioning**: Easier to manage versions across packages
4. **Simplified Development**: One `npm install` installs everything
5. **Better Code Sharing**: Easy to share code between frontend and backend

### Workspace Names:

- `@inventory/backend` - Backend package
- `@inventory/frontend` - Frontend package

## 🗄️ Database

The backend uses SQLite in-memory database. Data resets on server restart.

**Schema:**
```sql
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 0,
  price REAL DEFAULT 0,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

To use persistent storage, modify `backend/server.js`:
```javascript
const db = new sqlite3.Database('./inventory.db');
```

## 🔧 Development

### Adding Dependencies

**To a specific workspace:**
```bash
npm install <package> --workspace=backend
npm install <package> --workspace=frontend
```

**To root (shared dependencies):**
```bash
npm install <package> -w
```

### Adding Dev Dependencies

```bash
npm install <package> --save-dev --workspace=backend
npm install <package> --save-dev --workspace=frontend
```

## 📝 Code Structure

### Frontend Structure

```
frontend/src/
├── components/      # Reusable UI components
│   ├── Statistics/ # Statistics dashboard
│   ├── ItemForm/   # Create/Edit form
│   ├── ItemCard/   # Item card component
│   └── ItemList/    # Items list container
├── hooks/          # Custom React hooks
│   ├── useInventory.js  # Inventory state management
│   └── useForm.js        # Form state management
├── services/       # API service layer
│   └── api.js      # API client functions
└── utils/          # Utility functions
    ├── constants.js # App constants
    └── formatters.js # Data formatters
```

See `frontend/src/README.md` for detailed frontend architecture documentation.

## 🐛 Troubleshooting

**Port already in use:**
- Backend: Change PORT in `backend/server.js`
- Frontend: React will prompt to use a different port

**Dependencies not installing:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
```

**Frontend can't connect to backend:**
- Ensure backend is running on port 3001
- Check CORS is enabled in backend
- Verify API_URL in `frontend/src/utils/constants.js`

## 📖 Additional Documentation

- [Backend README](./backend/README.md) - Backend-specific documentation
- [Frontend README](./frontend/README.md) - Frontend-specific documentation
- [Frontend Architecture](./frontend/src/README.md) - Detailed frontend architecture

## 🎯 Next Steps

1. Add search/filter functionality
2. Implement persistent database storage
3. Add authentication and authorization
4. Add unit and integration tests
5. Set up CI/CD pipeline
6. Deploy to hosting service

## 📄 License

ISC
