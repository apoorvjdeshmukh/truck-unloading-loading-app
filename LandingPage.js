import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { getStoredShipments } from '../utils/storage';
import { seedLocalStorage, hasData } from '../utils/seedData';

const LandingPage = ({ mode, onAddNew, refreshKey }) => {
  const [unloadingHistory, setUnloadingHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState([]);

  useEffect(() => {
    // Auto-seed data if none exists and mode is unload
    if (mode === 'unload' && !hasData()) {
      seedLocalStorage();
    }
    loadHistory();
  }, [mode, refreshKey]);

  const loadHistory = () => {
    // Load unloading history
    const shipments = getStoredShipments();
    const unloads = shipments.filter(s => s.type === 'unload');
    setUnloadingHistory(unloads);

    // Load loading history
    const loadingRecords = JSON.parse(localStorage.getItem('loading_records') || '[]');
    setLoadingHistory(loadingRecords);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentHistory = mode === 'unload' ? unloadingHistory : loadingHistory;

  return (
    <div className="landing-page">
      <div className="landing-pane">
        <div className="landing-header">
          <h2 className="landing-title">{mode === 'unload' ? 'Unloading' : 'Loading'} History</h2>
        </div>

      {currentHistory.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{mode === 'unload' ? '📦' : '🚚'}</div>
          <h3>No {mode === 'unload' ? 'Unloading' : 'Loading'} Records Yet</h3>
          <p>Get started by adding your first {mode === 'unload' ? 'unloading' : 'loading'} record.</p>
          <button className="add-new-button primary" onClick={onAddNew}>
            + Add New {mode === 'unload' ? 'Unload' : 'Load'}
          </button>
        </div>
      ) : (
        <div className="history-table-wrapper">
          <table className={`history-table ${mode === 'unload' ? 'unload-table' : 'load-table'}`}>
            <thead>
              <tr>
                {mode === 'unload' ? (
                  <>
                    <th>Date</th>
                    <th>Unique Code</th>
                    <th>MAWB</th>
                    <th>Location</th>
                    <th>PKG</th>
                    <th>Weight (KG)</th>
                    <th>Shipper</th>
                    <th>Status</th>
                  </>
                ) : (
                  <>
                    <th>Date</th>
                    <th>Pallets</th>
                    <th>Total Quantity</th>
                    <th>MAWBs</th>
                    <th>Proof Images</th>
                    <th>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {mode === 'unload' ? (
                unloadingHistory.map((record) => (
                  <tr key={record.id}>
                    <td>{formatDate(record.createdAt)}</td>
                    <td><strong className="unique-code-badge">{record.uniqueCode}</strong></td>
                    <td>{record.mawb}</td>
                    <td>{record.warehouseLocation}</td>
                    <td>{record.pkg}</td>
                    <td>{record.weight}</td>
                    <td className="shipper-cell">{record.shipper || 'N/A'}</td>
                    <td>
                      <span className="status-badge unload-status">{record.status || 'Finished'}</span>
                    </td>
                  </tr>
                ))
              ) : (
                loadingHistory.map((record) => (
                  <tr key={record.id}>
                    <td>{formatDate(record.completedAt)}</td>
                    <td>{record.pallets?.length || 0}</td>
                    <td>
                      {record.pallets?.reduce((sum, p) => sum + (p.selectedQuantity || 0), 0) || 0}
                    </td>
                    <td className="mawb-cell">
                      {record.pallets?.map(p => p.mawb).filter(Boolean).join(', ') || 'N/A'}
                    </td>
                    <td>{record.proofImages?.length || 0}</td>
                    <td>
                      <span className="status-badge load-status">{record.status || 'Finished'}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default LandingPage;

