import React, { useState } from 'react';
import './WarehouseGrid.css';

const WarehouseGrid = ({ onLocationSelect, selectedLocation = null }) => {
  // Create a 10x10 grid for warehouse locations
  const rows = 10;
  const cols = 10;
  
  const [grid] = useState(() => {
    const gridData = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Generate location code: A-J for rows, 01-10 for cols
        const rowLabel = String.fromCharCode(65 + row); // A-J
        const colLabel = String(col + 1).padStart(2, '0'); // 01-10
        gridData.push({
          id: `${rowLabel}${colLabel}`,
          row,
          col,
          label: `${rowLabel}${colLabel}`,
          occupied: Math.random() < 0.3 // Randomly mark some as occupied (30%)
        });
      }
    }
    return gridData;
  });

  const handleCellClick = (location) => {
    if (!location.occupied && onLocationSelect) {
      onLocationSelect(location.id);
    }
  };

  return (
    <div className="warehouse-grid-container">
      <h3 className="grid-title">Select Warehouse Location</h3>
      <div className="grid-legend">
        <div className="legend-item">
          <div className="legend-box available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box occupied"></div>
          <span>Occupied</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected"></div>
          <span>Selected</span>
        </div>
      </div>
      <div className="warehouse-grid">
        {/* Column headers */}
        <div className="grid-header-row">
          <div className="grid-corner"></div>
          {Array.from({ length: cols }, (_, i) => (
            <div key={i} className="grid-header">
              {String(i + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
        
        {/* Grid rows */}
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            <div className="grid-row-label">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            {Array.from({ length: cols }, (_, colIndex) => {
              const location = grid.find(
                loc => loc.row === rowIndex && loc.col === colIndex
              );
              const isSelected = selectedLocation === location.id;
              
              return (
                <div
                  key={colIndex}
                  className={`grid-cell ${
                    location.occupied
                      ? 'occupied'
                      : isSelected
                      ? 'selected'
                      : 'available'
                  }`}
                  onClick={() => handleCellClick(location)}
                  title={location.label}
                >
                  {isSelected && <div className="checkmark">✓</div>}
                  {location.occupied && <div className="occupied-icon">✗</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {selectedLocation && (
        <div className="selected-location-display">
          Selected: <strong>{selectedLocation}</strong>
        </div>
      )}
    </div>
  );
};

export default WarehouseGrid;

