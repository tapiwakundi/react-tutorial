import React from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import "./ItemList.css";

/**
 * ItemList component displaying a list of inventory items
 * @param {Object} props
 * @param {Array} props.items - Array of inventory items
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 */
export const ItemList = ({ items, loading, onEdit, onDelete }) => {
  if (loading) {
    return <p className="loading-message">Loading inventory...</p>;
  }

  if (items.length === 0) {
    return (
      <p className="no-items">
        No items in inventory. Add your first item above!
      </p>
    );
  }

  return (
    <div className="item-list-section">
      <h2>Inventory Items</h2>
      <div className="items-list">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
