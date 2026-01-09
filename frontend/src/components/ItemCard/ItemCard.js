import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { LOW_STOCK_THRESHOLD } from "../../utils/constants";
import "./ItemCard.css";

/**
 * ItemCard component displaying a single inventory item
 * @param {Object} props
 * @param {Object} props.item - Inventory item object
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 */
export const ItemCard = ({ item, onEdit, onDelete }) => {
  const isLowStock = (item.quantity || 0) < LOW_STOCK_THRESHOLD;
  const itemValue = (item.quantity || 0) * (item.price || 0);

  return (
    <div className={`item-card ${isLowStock ? "low-stock" : ""}`}>
      <div className="item-content">
        <div className="item-header">
          <h3>{item.name}</h3>
          {isLowStock && <span className="low-stock-badge">Low Stock</span>}
        </div>
        {item.description && (
          <p className="item-description">{item.description}</p>
        )}
        <div className="item-details">
          <div className="detail-item">
            <span className="detail-label">Quantity:</span>
            <span
              className={`detail-value ${isLowStock ? "warning" : ""}`}
            >
              {item.quantity || 0}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Price:</span>
            <span className="detail-value">
              {formatCurrency(item.price || 0)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Value:</span>
            <span className="detail-value highlight">
              {formatCurrency(itemValue)}
            </span>
          </div>
          {item.category && (
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{item.category}</span>
            </div>
          )}
        </div>
      </div>
      <div className="item-actions">
        <button onClick={() => onEdit(item)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};
