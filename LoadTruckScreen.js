import React, { useState, useEffect } from 'react';
import './LoadTruckScreen.css';
import { getStoredShipments } from '../utils/storage';

export const LOAD_STATUSES = {
  TRUCK_ARRIVAL: 'Truck Arrival',
  ADDING_PALLETS: 'Adding Pallets',
  BEGIN_LOADING: 'Begin Loading',
  UPLOADING_PROOF: 'Uploading Proof of Loading',
  FINISHED: 'Finished Loading'
};

const LoadTruckScreen = ({ shipments, setShipments, onBack, onStatusChange }) => {
  const [status, setStatus] = useState(LOAD_STATUSES.TRUCK_ARRIVAL);

  // Update parent when status changes
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);
  const [searchCode, setSearchCode] = useState('');
  const [selectedOcrCode, setSelectedOcrCode] = useState('');
  const [selectedPallets, setSelectedPallets] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [proofImages, setProofImages] = useState([]);

  const availableShipments = getStoredShipments().filter(s => s.type === 'unload');
  
  const handleOcrSelect = (uniqueCode) => {
    if (!uniqueCode) return;
    
    // Use selected code or search code
    const codeToSearch = uniqueCode || searchCode.trim();
    if (!codeToSearch) {
      alert('Please select or enter a unique code');
      return;
    }

    const shipment = availableShipments.find(
      s => s.uniqueCode.toLowerCase() === codeToSearch.toLowerCase()
    );

    if (!shipment) {
      alert('No shipment found with this unique code');
      return;
    }

    // Check if already added
    if (selectedPallets.find(p => p.uniqueCode === shipment.uniqueCode)) {
      alert('This shipment is already added');
      return;
    }

    // Add to selected pallets with quantity tracking
    const totalPkg = parseInt(shipment.pkg) || 0;
    const loadedQty = shipment.loadedQuantity || 0;
    const remainingQty = totalPkg - loadedQty;
    
    const palletEntry = {
      ...shipment,
      selectedQuantity: 0, // Start with 0, user will select quantity
      loadedQuantity: loadedQty,
      remainingQuantity: remainingQty, // Total available in warehouse (constant)
      originalRemainingQuantity: remainingQty // Keep original for validation
    };

    setSelectedPallets([...selectedPallets, palletEntry]);
    setSearchCode('');
    setSelectedOcrCode('');
    setStatus(LOAD_STATUSES.ADDING_PALLETS);
  };

  const handleSearch = () => {
    if (selectedOcrCode) {
      handleOcrSelect(selectedOcrCode);
    } else {
      handleOcrSelect(searchCode);
    }
  };

  const handleDropdownChange = (e) => {
    const selectedCode = e.target.value;
    setSelectedOcrCode(selectedCode);
    if (selectedCode) {
      setSearchCode(selectedCode);
    }
  };

  const handleQuantityChange = (uniqueCode, newQuantity) => {
    setSelectedPallets(prev => prev.map(p => {
      if (p.uniqueCode === uniqueCode) {
        // Get the maximum available quantity (remaining in warehouse)
        const maxAvailable = p.originalRemainingQuantity !== undefined 
          ? p.originalRemainingQuantity 
          : (p.remainingQuantity || 0);
        
        // Handle empty string for typing (allow empty state while user types)
        if (newQuantity === '' || newQuantity === null || newQuantity === undefined) {
          return {
            ...p,
            selectedQuantity: '', // Allow empty while typing
            remainingQuantity: maxAvailable
          };
        }
        
        // Parse the input value
        const parsedQty = parseInt(newQuantity.toString(), 10);
        
        if (isNaN(parsedQty)) {
          // Invalid number, keep previous value
          return p;
        }
        
        // Clamp value between 0 and maxAvailable
        const qty = Math.max(0, Math.min(parsedQty, maxAvailable));
        
        return {
          ...p,
          selectedQuantity: qty,
          // remainingQuantity stays constant - it's the total available in warehouse
          remainingQuantity: maxAvailable
        };
      }
      return p;
    }));
  };

  const handleRemovePallet = (uniqueCode) => {
    setSelectedPallets(prev => prev.filter(p => p.uniqueCode !== uniqueCode));
  };

  const handleBeginLoading = () => {
    if (selectedPallets.length === 0) {
      alert('Please add at least one pallet before starting to load');
      return;
    }
    setStatus(LOAD_STATUSES.BEGIN_LOADING);
    setCurrentRecord({
      id: Date.now(),
      pallets: [...selectedPallets],
      createdAt: new Date().toISOString(),
      status: LOAD_STATUSES.BEGIN_LOADING
    });
  };

  const handleProofImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file)
    }));
    setProofImages([...proofImages, ...newImages]);
  };

  const handleRemoveProofImage = (id) => {
    setProofImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image && image.url.startsWith('blob:')) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const calculateTally = () => {
    const tally = {};
    
    selectedPallets.forEach(pallet => {
      const mawb = pallet.mawb;
      if (!tally[mawb]) {
        tally[mawb] = {
          mawb,
          totalArrived: 0,
          totalLoaded: 0,
          remaining: 0,
          selectedForThisLoad: 0
        };
      }
      
      const arrived = parseInt(pallet.pkg) || 0;
      const previouslyLoaded = pallet.loadedQuantity || 0;
      const selected = (pallet.selectedQuantity !== undefined && pallet.selectedQuantity !== null && pallet.selectedQuantity !== '') 
        ? (parseInt(pallet.selectedQuantity) || 0) 
        : 0;
      
      tally[mawb].totalArrived += arrived;
      tally[mawb].totalLoaded += previouslyLoaded;
      tally[mawb].selectedForThisLoad += selected;
      tally[mawb].remaining = tally[mawb].totalArrived - tally[mawb].totalLoaded - tally[mawb].selectedForThisLoad;
    });
    
    return Object.values(tally);
  };

  const handleCompleteLoading = () => {
    if (!currentRecord) return;

    // Get ALL shipments from storage (not just unloaded ones)
    const allShipments = getStoredShipments();
    
    // Update shipments with loaded quantities
    const updatedShipments = allShipments.map(shipment => {
      const pallet = selectedPallets.find(p => p.uniqueCode === shipment.uniqueCode);
      if (pallet) {
        const qtyToAdd = (pallet.selectedQuantity !== undefined && pallet.selectedQuantity !== null && pallet.selectedQuantity !== '') 
          ? (parseInt(pallet.selectedQuantity) || 0) 
          : 0;
        return {
          ...shipment,
          loadedQuantity: (shipment.loadedQuantity || 0) + qtyToAdd
        };
      }
      return shipment;
    });

    // Save updated shipments
    localStorage.setItem('truck_shipments', JSON.stringify(updatedShipments));
    
    // Update parent component's state if callback provided
    if (setShipments) {
      setShipments(updatedShipments);
    }

    // Create loading record
    const completedRecord = {
      ...currentRecord,
      proofImages: proofImages.map(img => img.url),
      status: LOAD_STATUSES.FINISHED,
      completedAt: new Date().toISOString()
    };

    // Save loading record
    const existingRecords = JSON.parse(localStorage.getItem('loading_records') || '[]');
    existingRecords.push(completedRecord);
    localStorage.setItem('loading_records', JSON.stringify(existingRecords));

    setLoadingRecords([...loadingRecords, completedRecord]);
    setStatus(LOAD_STATUSES.FINISHED);
    
    alert('Loading completed successfully!');
    
    // Reset for next load
    resetForm();
    
    // Return to landing page after a short delay
    if (onBack) {
      setTimeout(() => {
        onBack();
      }, 500);
    }
  };

  const resetForm = () => {
    setSelectedPallets([]);
    setSearchCode('');
    setSelectedOcrCode('');
    setProofImages([]);
    setCurrentRecord(null);
    setStatus(LOAD_STATUSES.TRUCK_ARRIVAL);
  };

  const tally = calculateTally();

  return (
    <div className="load-screen">
      <div className="screen-content">
        {status === LOAD_STATUSES.TRUCK_ARRIVAL && (
          <button
            className="action-button primary"
            onClick={() => setStatus(LOAD_STATUSES.ADDING_PALLETS)}
          >
            Begin Adding Pallets
          </button>
        )}

      {(status === LOAD_STATUSES.ADDING_PALLETS || status === LOAD_STATUSES.BEGIN_LOADING) && (
        <div className="form-section">
          <h3>Add Pallets by Unique Code</h3>
          <div className="search-section">
            <div className="ocr-selector-container">
              <label htmlFor="ocr-dropdown">Select OCR / Unique Code:</label>
              <select
                id="ocr-dropdown"
                value={selectedOcrCode}
                onChange={handleDropdownChange}
                className="ocr-dropdown"
              >
                <option value="">-- Select from existing OCRs --</option>
                {availableShipments
                  .filter(s => !selectedPallets.find(p => p.uniqueCode === s.uniqueCode))
                  .filter(s => {
                    // Only show shipments with remaining quantity > 0
                    const remaining = (parseInt(s.pkg) || 0) - (s.loadedQuantity || 0);
                    return remaining > 0;
                  })
                  .map((shipment) => {
                    const remaining = (parseInt(shipment.pkg) || 0) - (shipment.loadedQuantity || 0);
                    return (
                      <option key={shipment.uniqueCode} value={shipment.uniqueCode}>
                        {shipment.uniqueCode} | MAWB: {shipment.mawb} | Location: {shipment.warehouseLocation} | Available: {remaining}/{shipment.pkg} | {shipment.shipper?.substring(0, 30) || 'N/A'}...
                      </option>
                    );
                  })}
              </select>
              {availableShipments.length === 0 && (
                <p className="no-ocrs-message">No OCRs available. Please unload trucks first.</p>
              )}
            </div>
            <div className="manual-input-section">
              <label htmlFor="manual-input">Or enter manually:</label>
              <input
                id="manual-input"
                type="text"
                placeholder="Enter Unique Code (OCR)"
                value={searchCode}
                onChange={(e) => {
                  setSearchCode(e.target.value);
                  setSelectedOcrCode(''); // Clear dropdown when typing manually
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="search-input"
              />
            </div>
            <button 
              className="action-button primary" 
              onClick={handleSearch}
              disabled={!selectedOcrCode && !searchCode.trim()}
            >
              Search & Add
            </button>
          </div>

          {selectedPallets.length > 0 && (
            <>
              <div className="selected-pallets">
                <h4>Selected Pallets ({selectedPallets.length})</h4>
                {selectedPallets.map((pallet) => (
                  <div key={pallet.uniqueCode} className="pallet-card">
                    <div className="pallet-header">
                      <div>
                        <strong>MAWB: {pallet.mawb}</strong>
                        <span className="unique-code">{pallet.uniqueCode}</span>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => handleRemovePallet(pallet.uniqueCode)}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="pallet-details">
                      <p><strong>Location:</strong> {pallet.warehouseLocation}</p>
                      <p><strong>Total Arrived:</strong> {pallet.pkg} packages</p>
                      <p><strong>Previously Loaded:</strong> {pallet.loadedQuantity || 0}</p>
                      <p><strong>Remaining:</strong> {pallet.remainingQuantity} packages</p>
                      <p><strong>Shipper:</strong> {pallet.shipper}</p>
                      <div className="quantity-selector">
                        <label>Quantity to Load:</label>
                        <div className="quantity-controls">
                          <button
                            type="button"
                            className="quantity-btn decrease"
                            onClick={() => {
                              const currentQty = (pallet.selectedQuantity !== undefined && pallet.selectedQuantity !== null) ? pallet.selectedQuantity : 0;
                              if (currentQty > 0) {
                                handleQuantityChange(pallet.uniqueCode, currentQty - 1);
                              }
                            }}
                            disabled={!pallet.selectedQuantity || pallet.selectedQuantity === 0 || pallet.selectedQuantity === ''}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="0"
                            max={pallet.remainingQuantity}
                            value={pallet.selectedQuantity !== undefined && pallet.selectedQuantity !== null ? pallet.selectedQuantity : ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow empty string while typing
                              if (value === '') {
                                handleQuantityChange(pallet.uniqueCode, '');
                              } else {
                                handleQuantityChange(pallet.uniqueCode, value);
                              }
                            }}
                            onBlur={(e) => {
                              // Ensure valid value on blur - set to 0 if empty
                              if (!e.target.value || e.target.value === '' || isNaN(parseInt(e.target.value))) {
                                handleQuantityChange(pallet.uniqueCode, 0);
                              }
                            }}
                            className="quantity-input"
                            placeholder="0"
                          />
                          <button
                            type="button"
                            className="quantity-btn increase"
                            onClick={() => {
                              const currentQty = (pallet.selectedQuantity !== undefined && pallet.selectedQuantity !== null) ? pallet.selectedQuantity : 0;
                              const maxQty = pallet.remainingQuantity || 0;
                              if (currentQty < maxQty) {
                                handleQuantityChange(pallet.uniqueCode, currentQty + 1);
                              }
                            }}
                            disabled={!pallet.remainingQuantity || ((pallet.selectedQuantity !== undefined && pallet.selectedQuantity !== null && pallet.selectedQuantity !== '') ? pallet.selectedQuantity : 0) >= pallet.remainingQuantity}
                          >
                            +
                          </button>
                        </div>
                        <span className="max-quantity">/ {pallet.remainingQuantity} available</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {tally.length > 0 && (
                <div className="tally-section">
                  <h4>Loading Tally by MAWB</h4>
                  <div className="tally-table">
                    <div className="tally-header">
                      <div>MAWB</div>
                      <div>Total Arrived</div>
                      <div>Previously Loaded</div>
                      <div>Selected Now</div>
                      <div>Remaining</div>
                    </div>
                    {tally.map((item) => (
                      <div key={item.mawb} className="tally-row">
                        <div><strong>{item.mawb}</strong></div>
                        <div>{item.totalArrived}</div>
                        <div>{item.totalLoaded}</div>
                        <div className={item.selectedForThisLoad > 0 ? 'selected-amount' : ''}>
                          {item.selectedForThisLoad}
                        </div>
                        <div className={item.remaining === 0 ? 'fully-loaded' : ''}>
                          {item.remaining}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {status === LOAD_STATUSES.ADDING_PALLETS && (
                <button
                  className="action-button primary"
                  onClick={handleBeginLoading}
                  disabled={selectedPallets.length === 0}
                >
                  Begin Loading
                </button>
              )}
            </>
          )}
        </div>
      )}

      {status === LOAD_STATUSES.BEGIN_LOADING && (
        <div className="form-section">
          <h3>Upload Proof of Loading</h3>
          <div className="proof-upload-section">
            <input
              type="file"
              id="proof-upload"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handleProofImageUpload}
              className="file-input"
            />
            <label htmlFor="proof-upload" className="upload-button">
              📷 Upload Proof Images
            </label>

            {proofImages.length > 0 && (
              <div className="proof-images-grid">
                {proofImages.map((image) => (
                  <div key={image.id} className="proof-image-item">
                    <img src={image.url} alt="Proof of loading" />
                    <button
                      className="remove-image-button"
                      onClick={() => handleRemoveProofImage(image.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button
              className="action-button primary"
              onClick={handleCompleteLoading}
              disabled={proofImages.length === 0}
            >
              Complete Loading
            </button>
            <button className="action-button secondary" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {status === LOAD_STATUSES.FINISHED && (
        <div className="success-message">
          <h3>✓ Loading Completed Successfully!</h3>
          <div className="action-buttons">
            {onBack && (
              <button className="action-button primary" onClick={onBack}>
                Back to History
              </button>
            )}
            <button className="action-button secondary" onClick={resetForm}>
              Start New Loading
            </button>
          </div>
        </div>
      )}

      {loadingRecords.length > 0 && (
        <div className="loading-records">
          <h3>Recent Loading Records</h3>
          <div className="records-grid">
            {loadingRecords.map((record) => (
              <div key={record.id} className="record-card">
                <div className="record-header">
                  <strong>Record #{record.id}</strong>
                  <span className="record-date">
                    {new Date(record.completedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="record-details">
                  <p><strong>Pallets Loaded:</strong> {record.pallets.length}</p>
                  <p><strong>Total Quantity:</strong> {
                    record.pallets.reduce((sum, p) => sum + (p.selectedQuantity || 0), 0)
                  } packages</p>
                  {record.proofImages && record.proofImages.length > 0 && (
                    <p><strong>Proof Images:</strong> {record.proofImages.length}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default LoadTruckScreen;

