import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { LOW_STOCK_THRESHOLD } from "../../utils/constants";
import "./Statistics.css";

/**
 * Statistics component displaying inventory overview
 * @param {Object} props
 * @param {Array} props.items - Array of inventory items
 */
export const Statistics = ({ items }) => {
  // Calculate total inventory value
  const totalValue = items.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  );

  // Count low stock items
  const lowStockItems = items.filter(
    (item) => (item.quantity || 0) < LOW_STOCK_THRESHOLD
  ).length;

  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-value">{items.length}</div>
        <div className="stat-label">Total Items</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{formatCurrency(totalValue)}</div>
        <div className="stat-label">Total Value</div>
      </div>
      <div
        className={`stat-card ${lowStockItems > 0 ? "stat-warning" : ""}`}
      >
        <div className="stat-value">{lowStockItems}</div>
        <div className="stat-label">Low Stock Items</div>
      </div>
    </div>
  );
};
