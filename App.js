import React, { useState, useEffect } from 'react';
import './App.css';
import ModeSelector from './components/ModeSelector';
import StatusBar from './components/StatusBar';
import LandingPage from './components/LandingPage';
import UnloadTruckScreen from './components/UnloadTruckScreen';
import LoadTruckScreen from './components/LoadTruckScreen';
import OcrManager from './components/OcrManager';
import HistoryTable from './components/HistoryTable';
import { getStoredShipments } from './utils/storage';

import { UNLOAD_STATUSES } from './components/UnloadTruckScreen';
import { LOAD_STATUSES } from './components/LoadTruckScreen';

function App() {
  const [mode, setMode] = useState('unload');
  const [shipments, setShipments] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' or 'form'
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    // Load stored shipments on app start
    const stored = getStoredShipments();
    setShipments(stored);
  }, []);

  const handleSaveShipment = (shipment) => {
    const updated = [...shipments, shipment];
    setShipments(updated);
  };

  // Reload shipments when switching modes to get latest data
  useEffect(() => {
    if (mode === 'load') {
      const stored = getStoredShipments();
      setShipments(stored);
    }
    // Reset to landing page when mode changes
    setViewMode('landing');
    setCurrentStatus(null);
  }, [mode]);

  // Reset status when switching to landing page
  useEffect(() => {
    if (viewMode === 'landing') {
      setCurrentStatus(null);
    }
  }, [viewMode]);

  const handleDataChange = () => {
    const stored = getStoredShipments();
    setShipments(stored);
  };

  const handleAddNew = () => {
    setViewMode('form');
    // Initialize status based on mode
    if (mode === 'unload') {
      setCurrentStatus(UNLOAD_STATUSES.TRUCK_ARRIVAL);
    } else {
      setCurrentStatus(LOAD_STATUSES.TRUCK_ARRIVAL);
    }
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleBackToLanding = () => {
    setViewMode('landing');
    // Reload data to show updated history
    handleDataChange();
    // Force LandingPage to refresh
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        {viewMode === 'form' && (
          <button 
            className="back-button left"
            onClick={handleBackToLanding}
            title="Back to History"
          >
            ← Back
          </button>
        )}
        <h1>Truck Unloading and Loading</h1>
      </header>
      <ModeSelector 
        mode={mode} 
        setMode={setMode} 
        onAddNew={viewMode === 'landing' ? handleAddNew : null}
      />
      {viewMode === 'form' && (
        <StatusBar 
          statuses={mode === 'unload' ? UNLOAD_STATUSES : LOAD_STATUSES}
          currentStatus={currentStatus}
          type={mode}
        />
      )}
      <main className="app-main">
        {viewMode === 'landing' ? (
          <LandingPage mode={mode} onAddNew={handleAddNew} refreshKey={refreshKey} />
        ) : mode === 'unload' ? (
          <UnloadTruckScreen 
            onSave={handleSaveShipment} 
            onBack={handleBackToLanding}
            onStatusChange={setCurrentStatus}
          />
        ) : (
          <LoadTruckScreen 
            shipments={shipments} 
            setShipments={setShipments} 
            onBack={handleBackToLanding}
            onStatusChange={setCurrentStatus}
          />
        )}
      </main>
      <OcrManager onDataChange={handleDataChange} />
      {showHistory && (
        <HistoryTable onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}

export default App;

