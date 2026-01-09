# Monorepo Setup Guide

This project is structured as a **monorepo** using npm workspaces. All code is managed in a single git repository.

## What is a Monorepo?

A monorepo (monolithic repository) is a single git repository that contains multiple related projects or packages. In this case:

- `backend/` - Express.js API server
- `frontend/` - React.js web application

## Benefits

1. **Single Source of Truth**: One repository for all code
2. **Simplified Dependency Management**: Install all dependencies with one command
3. **Easier Code Sharing**: Share utilities, types, or constants between packages
4. **Unified Versioning**: Manage versions across packages together
5. **Simplified CI/CD**: One pipeline for the entire project

## Structure

```
react-tutorial/
├── .git/                    # Single git repository (root level)
├── .gitignore              # Root-level gitignore
├── .npmrc                  # npm workspace configuration
├── package.json            # Root workspace config
├── backend/                # Backend workspace
│   ├── package.json        # Backend dependencies
│   └── server.js
└── frontend/               # Frontend workspace
    ├── package.json        # Frontend dependencies
    └── src/
```

## Git Setup

The repository is initialized at the **root level**. This means:

- ✅ One `.git` folder at the root
- ✅ One `.gitignore` file at the root
- ✅ All commits track the entire monorepo
- ✅ Single version history

## npm Workspaces

The root `package.json` defines workspaces:

```json
{
  "workspaces": [
    "backend",
    "frontend"
  ]
}
```

This tells npm to treat `backend/` and `frontend/` as separate packages.

## Installing Dependencies

### Install All Dependencies

From the root directory:

```bash
npm install
```

This will:
1. Install root dependencies (if any)
2. Install `backend/` dependencies
3. Install `frontend/` dependencies
4. Hoist common dependencies to root `node_modules/` when possible

### Install to Specific Workspace

```bash
# Add a dependency to backend
npm install express --workspace=backend

# Add a dependency to frontend
npm install axios --workspace=frontend

# Add a dev dependency
npm install --save-dev nodemon --workspace=backend
```

## Running Commands

### Using Root Scripts

The root `package.json` provides convenient scripts:

```bash
npm run start:backend    # Start backend server
npm run start:frontend   # Start frontend dev server
npm run dev:backend      # Start backend with nodemon
npm run build:frontend   # Build frontend for production
```

### Using Workspace Commands Directly

```bash
# Run backend script
npm run start --workspace=backend

# Run frontend script
npm run start --workspace=frontend
```

## Git Workflow

### Initial Setup

```bash
# Initialize git (already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Monorepo setup with React frontend and Express backend"
```

### Daily Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# View history
git log
```

## Adding New Workspaces

To add a new workspace (e.g., `shared/`):

1. Create the directory: `mkdir shared`
2. Add `package.json` to the new directory
3. Update root `package.json`:
   ```json
   {
     "workspaces": [
       "backend",
       "frontend",
       "shared"
     ]
   }
   ```
4. Run `npm install` from root

## Best Practices

1. **Keep root `package.json` minimal**: Only workspace config and shared scripts
2. **Workspace-specific dependencies**: Keep in respective `package.json` files
3. **Shared code**: Create a `shared/` or `common/` workspace if needed
4. **Consistent naming**: Use `@inventory/` prefix for workspace names
5. **Single git history**: All commits at root level

## Troubleshooting

### Dependencies Not Installing

```bash
# Clean install
rm -rf node_modules backend/node_modules frontend/node_modules
rm -f package-lock.json backend/package-lock.json frontend/package-lock.json
npm install
```

### Workspace Not Found

Ensure the workspace directory exists and has a `package.json` file.

### Version Conflicts

npm workspaces will hoist compatible versions. If you need different versions, they'll be installed in the workspace's local `node_modules/`.

## Next Steps

1. Make your first commit
2. Set up a remote repository (GitHub, GitLab, etc.)
3. Push your code
4. Set up CI/CD if needed
