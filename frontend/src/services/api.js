import { API_URL } from "../utils/constants";

/**
 * API service for inventory management
 * Handles all HTTP requests to the backend
 */

/**
 * Fetch all inventory items
 * @returns {Promise<Array>} Array of inventory items
 */
export const fetchItems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items. Make sure the backend server is running!");
  }
};

/**
 * Fetch a single inventory item by ID
 * @param {number} id - Item ID
 * @returns {Promise<Object>} Inventory item object
 */
export const fetchItemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Item not found");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
};

/**
 * Create a new inventory item
 * @param {Object} itemData - Item data (name, description, quantity, price, category)
 * @returns {Promise<Object>} Created item object
 */
export const createItem = async (itemData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...itemData,
        quantity: parseInt(itemData.quantity) || 0,
        price: parseFloat(itemData.price) || 0,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create item");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

/**
 * Update an existing inventory item
 * @param {number} id - Item ID
 * @param {Object} itemData - Updated item data
 * @returns {Promise<Object>} Updated item object
 */
export const updateItem = async (id, itemData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...itemData,
        quantity: parseInt(itemData.quantity) || 0,
        price: parseFloat(itemData.price) || 0,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update item");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

/**
 * Delete an inventory item
 * @param {number} id - Item ID
 * @returns {Promise<void>}
 */
export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
