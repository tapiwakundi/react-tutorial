import React from "react";
import { useForm } from "../../hooks/useForm";
import "./ItemForm.css";

const INITIAL_FORM_VALUES = {
  name: "",
  description: "",
  quantity: "",
  price: "",
  category: "",
};

/**
 * ItemForm component for creating and editing inventory items
 * @param {Object} props
 * @param {Object|null} props.editingItem - Item being edited, null if creating new
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {Function} props.onCancel - Callback when edit is cancelled
 */
export const ItemForm = ({ editingItem, onSubmit, onCancel }) => {
  const { formData, handleChange, setFields, clearForm } = useForm(
    INITIAL_FORM_VALUES
  );

  // Populate form when editing
  React.useEffect(() => {
    if (editingItem) {
      setFields({
        name: editingItem.name || "",
        description: editingItem.description || "",
        quantity: editingItem.quantity || "",
        price: editingItem.price || "",
        category: editingItem.category || "",
      });
    } else {
      clearForm();
    }
  }, [editingItem, setFields, clearForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="item-form-section">
      <h2>{editingItem ? "Edit Inventory Item" : "Add New Item"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Electronics, Accessories"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description (optional)"
            rows="2"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? "Update Item" : "Add to Inventory"}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
