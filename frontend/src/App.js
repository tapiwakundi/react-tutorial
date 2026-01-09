import React, { useState } from "react";
import { useInventory } from "./hooks/useInventory";
import { Statistics } from "./components/Statistics";
import { ItemForm } from "./components/ItemForm";
import { ItemList } from "./components/ItemList";
import "./App.css";

/**
 * Main App component for Inventory Management System
 * Orchestrates all components and manages application state
 */
function App() {
  const { items, loading, error, createItem, updateItem, removeItem } =
    useInventory();
  const [editingItem, setEditingItem] = useState(null);

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);
        alert("Item updated successfully!");
      } else {
        await createItem(formData);
        alert("Item added to inventory successfully!");
      }
      setEditingItem(null);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await removeItem(id);
      alert("Item deleted successfully!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Inventory Management System</h1>
        <p className="subtitle">React Frontend + Express Backend + SQLite</p>

        {error && (
          <div className="error-banner">
            <strong>Error:</strong> {error}
          </div>
        )}

        <Statistics items={items} />

        <ItemForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        <ItemList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
