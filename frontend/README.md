# Frontend - React Inventory Management App

React frontend for the inventory management system.

## Quick Start

```bash
npm install
npm start
```

App runs on `http://localhost:3000`

## Features

- View all inventory items with details
- Add new items to inventory
- Edit existing items
- Delete items
- View statistics (total items, total value, low stock count)
- Low stock warnings for items with quantity < 10

## Components

The main `App.js` component includes:

- **Statistics Dashboard**: Shows total items, total inventory value, and low stock alerts
- **Add/Edit Form**: Form for creating or editing inventory items
- **Inventory List**: Displays all items with quantity, price, category, and total value
- **Low Stock Indicators**: Visual warnings for items below threshold

## Make sure the backend server is running on port 3001!
