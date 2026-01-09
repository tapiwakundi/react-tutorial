const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create in-memory SQLite database
const db = new sqlite3.Database(':memory:');

// Initialize database with inventory table
db.serialize(() => {
  db.run(`CREATE TABLE inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL DEFAULT 0,
    price REAL DEFAULT 0,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert some sample inventory data
  const stmt = db.prepare('INSERT INTO inventory (name, description, quantity, price, category) VALUES (?, ?, ?, ?, ?)');
  stmt.run('Laptop', '15-inch MacBook Pro', 12, 1999.99, 'Electronics');
  stmt.run('Wireless Mouse', 'Ergonomic wireless mouse', 45, 29.99, 'Accessories');
  stmt.run('USB-C Cable', '6ft USB-C charging cable', 78, 19.99, 'Accessories');
  stmt.run('Monitor Stand', 'Adjustable monitor stand', 23, 89.99, 'Furniture');
  stmt.run('Keyboard', 'Mechanical keyboard', 5, 149.99, 'Electronics');
  stmt.finalize();
});

// Routes

// GET all inventory items
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM inventory ORDER BY name ASC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET single inventory item by id
app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM inventory WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(row);
  });
});

// POST create new inventory item
app.post('/api/items', (req, res) => {
  const { name, description, quantity, price, category } = req.body;
  
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const qty = quantity !== undefined ? parseInt(quantity) : 0;
  const itemPrice = price !== undefined ? parseFloat(price) : 0;

  db.run(
    'INSERT INTO inventory (name, description, quantity, price, category) VALUES (?, ?, ?, ?, ?)',
    [name, description || null, qty, itemPrice, category || null],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: this.lastID,
        name,
        description: description || null,
        quantity: qty,
        price: itemPrice,
        category: category || null
      });
    }
  );
});

// PUT update inventory item
app.put('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const { name, description, quantity, price, category } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const qty = quantity !== undefined ? parseInt(quantity) : 0;
  const itemPrice = price !== undefined ? parseFloat(price) : 0;

  db.run(
    'UPDATE inventory SET name = ?, description = ?, quantity = ?, price = ?, category = ? WHERE id = ?',
    [name, description || null, qty, itemPrice, category || null, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
      res.json({ 
        id: parseInt(id), 
        name, 
        description: description || null,
        quantity: qty,
        price: itemPrice,
        category: category || null
      });
    }
  );
});

// DELETE inventory item
app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM inventory WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Inventory Management API running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/items`);
});
