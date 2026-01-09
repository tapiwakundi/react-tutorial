# Backend - Express + SQLite

Express.js backend server with SQLite in-memory database for inventory management.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3001`

## API Endpoints

- `GET /api/items` - Get all inventory items
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create inventory item
- `PUT /api/items/:id` - Update inventory item
- `DELETE /api/items/:id` - Delete inventory item

## Request/Response Examples

**Create Item:**
```json
POST /api/items
{
  "name": "Product Name",
  "description": "Product description",
  "quantity": 50,
  "price": 29.99,
  "category": "Electronics"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "quantity": 50,
  "price": 29.99,
  "category": "Electronics",
  "created_at": "2024-01-01 12:00:00"
}
```

## Database

Uses SQLite in-memory database (`:memory:`). Data resets on server restart.

To use persistent storage, change line 13 in `server.js`:
```javascript
const db = new sqlite3.Database('./inventory.db');
```
