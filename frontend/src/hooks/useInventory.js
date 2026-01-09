import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

/**
 * Custom hook for managing inventory state and operations
 * @returns {Object} Inventory state and operations
 */
export const useInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all items
  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.fetchItems();
      setItems(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading items:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load items on mount
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Create new item
  const createItem = useCallback(async (itemData) => {
    try {
      setError(null);
      const newItem = await api.createItem(itemData);
      await loadItems(); // Refresh the list
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadItems]);

  // Update existing item
  const updateItem = useCallback(async (id, itemData) => {
    try {
      setError(null);
      const updatedItem = await api.updateItem(id, itemData);
      await loadItems(); // Refresh the list
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadItems]);

  // Delete item
  const removeItem = useCallback(async (id) => {
    try {
      setError(null);
      await api.deleteItem(id);
      await loadItems(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadItems]);

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    removeItem,
    refreshItems: loadItems,
  };
};
