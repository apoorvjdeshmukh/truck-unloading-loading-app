import React, { useState, useEffect } from 'react';
import './HistoryTable.css';
import { getStoredShipments } from '../utils/storage';

const HistoryTable = ({ onClose }) => {
  const [unloadingHistory, setUnloadingHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('unloading');

  useEffect(() => {
    loadHistory();
  }, []);

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

  return (
    <>
      <div className="history-overlay" onClick={onClose}></div>
      <div className="history-table-container" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <h2>History</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="history-tabs">
          <button
            className={`tab-button ${activeTab === 'unloading' ? 'active' : ''}`}
            onClick={() => setActiveTab('unloading')}
          >
            Unloading History ({unloadingHistory.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'loading' ? 'active' : ''}`}
            onClick={() => setActiveTab('loading')}
          >
            Loading History ({loadingHistory.length})
          </button>
        </div>

        <div className="history-content">
          {activeTab === 'unloading' ? (
            <div className="table-wrapper">
              {unloadingHistory.length === 0 ? (
                <div className="no-data">
                  <p>No unloading records found.</p>
                </div>
              ) : (
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Unique Code</th>
                      <th>MAWB</th>
                      <th>Location</th>
                      <th>PKG</th>
                      <th>Weight (KG)</th>
                      <th>Shipper</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unloadingHistory.map((record) => (
                      <tr key={record.id}>
                        <td>{formatDate(record.createdAt)}</td>
                        <td><strong>{record.uniqueCode}</strong></td>
                        <td>{record.mawb}</td>
                        <td>{record.warehouseLocation}</td>
                        <td>{record.pkg}</td>
                        <td>{record.weight}</td>
                        <td className="shipper-cell">{record.shipper || 'N/A'}</td>
                        <td>
                          <span className="status-badge unload-status">{record.status || 'Finished'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="table-wrapper">
              {loadingHistory.length === 0 ? (
                <div className="no-data">
                  <p>No loading records found.</p>
                </div>
              ) : (
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Pallets</th>
                      <th>Total Quantity</th>
                      <th>MAWBs</th>
                      <th>Proof Images</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingHistory.map((record) => (
                      <tr key={record.id}>
                        <td>{formatDate(record.completedAt)}</td>
                        <td>{record.pallets?.length || 0}</td>
                        <td>
                          {record.pallets?.reduce((sum, p) => sum + (p.selectedQuantity || 0), 0) || 0}
                        </td>
                        <td>
                          {record.pallets?.map(p => p.mawb).filter(Boolean).join(', ') || 'N/A'}
                        </td>
                        <td>{record.proofImages?.length || 0}</td>
                        <td>
                          <span className="status-badge load-status">{record.status || 'Finished'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryTable;

