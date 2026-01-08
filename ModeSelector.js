import React from 'react';
import './ModeSelector.css';

const ModeSelector = ({ mode, setMode, onAddNew }) => {
  return (
    <div className="mode-selector">
      <div className="mode-selector-wrapper">
        <button
          className={`mode-button ${mode === 'unload' ? 'active' : ''}`}
          onClick={() => setMode('unload')}
        >
          <span className="mode-icon">📦</span>
          <span className="mode-text">Unload Truck</span>
          {mode === 'unload' && onAddNew && (
            <button 
              className="add-new-inline-button"
              onClick={(e) => {
                e.stopPropagation();
                onAddNew();
              }}
              title="Add New Unload"
            >
              + new
            </button>
          )}
        </button>
        <button
          className={`mode-button ${mode === 'load' ? 'active' : ''}`}
          onClick={() => setMode('load')}
        >
          <span className="mode-icon">🚚</span>
          <span className="mode-text">Load Truck</span>
          {mode === 'load' && onAddNew && (
            <button 
              className="add-new-inline-button"
              onClick={(e) => {
                e.stopPropagation();
                onAddNew();
              }}
              title="Add New Load"
            >
              + new
            </button>
          )}
        </button>
        <div className={`mode-slider ${mode === 'load' ? 'slide-right' : 'slide-left'}`}></div>
      </div>
    </div>
  );
};

export default ModeSelector;

