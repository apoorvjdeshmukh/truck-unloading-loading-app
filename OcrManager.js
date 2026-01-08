import React, { useState, useEffect } from 'react';
import './OcrManager.css';
import { getStoredShipments } from '../utils/storage';
import { seedLocalStorage, clearAllData, hasData } from '../utils/seedData';

const OcrManager = ({ onDataChange }) => {
  const [shipments, setShipments] = useState([]);
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = () => {
    const stored = getStoredShipments();
    setShipments(stored);
  };

  const handleSeedData = () => {
    if (window.confirm('This will add 5 sample shipments with precreated OCRs. Continue?')) {
      seedLocalStorage();
      loadShipments();
      if (onDataChange) onDataChange();
      alert('Sample data added successfully!');
    }
  };

  const handleClearData = () => {
    if (window.confirm('This will delete ALL shipments and loading records. This cannot be undone! Continue?')) {
      clearAllData();
      loadShipments();
      if (onDataChange) onDataChange();
      alert('All data cleared!');
    }
  };

  if (!showManager) {
    return (
      <button 
        className="ocr-manager-toggle" 
        onClick={() => setShowManager(true)}
        title="View/Manage OCRs"
      >
        🔍 Manage OCRs
      </button>
    );
  }

  return (
    <>
      <div className="ocr-manager-overlay" onClick={() => setShowManager(false)}></div>
      <div className="ocr-manager" onClick={(e) => e.stopPropagation()}>
        <div className="ocr-manager-header">
        <h2>OCR / Unique Code Manager</h2>
        <button className="close-button" onClick={() => setShowManager(false)}>
          ✕
        </button>
      </div>

      <div className="ocr-manager-actions">
        <button className="action-btn seed-btn" onClick={handleSeedData}>
          📦 Add Sample Data (5 OCRs)
        </button>
        <button className="action-btn clear-btn" onClick={handleClearData}>
          🗑️ Clear All Data
        </button>
      </div>

      <div className="ocr-list">
        <h3>Existing OCRs / Unique Codes</h3>
        {shipments.length === 0 ? (
          <div className="no-ocrs">
            <p>No OCRs/Unique Codes found.</p>
            <p>Click "Add Sample Data" above to create sample shipments, or unload a truck to create new ones.</p>
          </div>
        ) : (
          <div className="ocr-table">
            <div className="ocr-table-header">
              <div>Unique Code</div>
              <div>MAWB</div>
              <div>Location</div>
              <div>PKG</div>
              <div>Weight (KG)</div>
              <div>Shipper</div>
              <div>Loaded</div>
            </div>
            {shipments.map((shipment) => (
              <div key={shipment.id} className="ocr-table-row">
                <div className="unique-code-cell">
                  <strong>{shipment.uniqueCode || 'N/A'}</strong>
                </div>
                <div>{shipment.mawb || 'N/A'}</div>
                <div>{shipment.warehouseLocation || 'N/A'}</div>
                <div>{shipment.pkg || 'N/A'}</div>
                <div>{shipment.weight || 'N/A'}</div>
                <div className="shipper-cell">{shipment.shipper || 'N/A'}</div>
                <div className={shipment.loadedQuantity > 0 ? 'loaded-yes' : 'loaded-no'}>
                  {shipment.loadedQuantity || 0} / {shipment.pkg || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ocr-summary">
        <p><strong>Total OCRs:</strong> {shipments.length}</p>
        <p><strong>Total Packages:</strong> {
          shipments.reduce((sum, s) => sum + (parseInt(s.pkg) || 0), 0)
        }</p>
        <p><strong>Total Loaded:</strong> {
          shipments.reduce((sum, s) => sum + (s.loadedQuantity || 0), 0)
        }        </p>
      </div>
      </div>
    </>
  );
};

export default OcrManager;

