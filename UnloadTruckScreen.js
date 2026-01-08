import React, { useState, useEffect } from 'react';
import './UnloadTruckScreen.css';
import WarehouseGrid from './WarehouseGrid';
import { extractDataFromImage } from '../utils/ocr';
import { generateUniqueCode } from '../utils/generateCode';
import { saveShipment } from '../utils/storage';

export const UNLOAD_STATUSES = {
  TRUCK_ARRIVAL: 'Truck Arrival',
  BEGIN_UNLOADING: 'Begin Unloading',
  UPLOADING_PICTURE: 'Uploading Picture',
  DATA_FETCHING: 'Data Fetching from Picture',
  SELECTING_LOCATION: 'Selecting Location in Warehouse',
  CREATING_OCR: 'Creating OCR/Unique Number',
  FINISHED: 'Finished Unloading'
};

const UnloadTruckScreen = ({ onSave, onBack, onStatusChange }) => {
  const [shipments, setShipments] = useState([]);
  const [currentShipment, setCurrentShipment] = useState(null);
  const [status, setStatus] = useState(UNLOAD_STATUSES.TRUCK_ARRIVAL);

  // Update parent when status changes
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    mawb: '',
    pkg: '',
    weight: '',
    origin: '',
    shipper: '',
    shipperAddress: '',
    consignee: '',
    consigneeAddress: '',
    natureOfGoods: '',
    finalDest: '',
    date: '',
    flight: '',
    hawb: '',
    warehouseLocation: '',
    uniqueCode: '',
    imageUrl: ''
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setStatus(UNLOAD_STATUSES.UPLOADING_PICTURE);
      
      // Auto-process image after upload
      setTimeout(() => {
        handleExtractData(file);
      }, 500);
    }
  };

  const handleExtractData = async (file) => {
    if (!file) return;
    
    setIsProcessing(true);
    setStatus(UNLOAD_STATUSES.DATA_FETCHING);
    
    try {
      const extractedData = await extractDataFromImage(file);
      
      setFormData(prev => ({
        ...prev,
        mawb: extractedData.mawb || prev.mawb,
        pkg: extractedData.pkg || prev.pkg,
        weight: extractedData.weight || prev.weight,
        origin: extractedData.origin || prev.origin,
        shipper: extractedData.shipper || prev.shipper,
        shipperAddress: extractedData.shipperAddress || prev.shipperAddress,
        consignee: extractedData.consignee || prev.consignee,
        consigneeAddress: extractedData.consigneeAddress || prev.consigneeAddress,
        natureOfGoods: extractedData.natureOfGoods || prev.natureOfGoods,
        finalDest: extractedData.finalDest || prev.finalDest,
        date: extractedData.date || prev.date,
        flight: extractedData.flight || prev.flight,
        hawb: extractedData.hawb || prev.hawb,
        imageUrl: imagePreview || prev.imageUrl
      }));
      
      setStatus(UNLOAD_STATUSES.SELECTING_LOCATION);
    } catch (error) {
      console.error('Error extracting data:', error);
      alert('Error extracting data from image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({ ...prev, warehouseLocation: location }));
    setStatus(UNLOAD_STATUSES.CREATING_OCR);
    
    // Auto-generate unique code when location is selected
    if (!formData.uniqueCode) {
      const uniqueCode = generateUniqueCode();
      setFormData(prev => ({ ...prev, uniqueCode }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.mawb || !formData.warehouseLocation || !formData.uniqueCode) {
      alert('Please fill in all required fields (MAWB, Location, and ensure Unique Code is generated)');
      return;
    }

    const shipment = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: UNLOAD_STATUSES.FINISHED,
      type: 'unload',
      loadedQuantity: 0 // Track how much has been loaded later
    };

    const updatedShipments = [...shipments, shipment];
    setShipments(updatedShipments);
    saveShipment(shipment);
    onSave(shipment);
    
    setStatus(UNLOAD_STATUSES.FINISHED);
    alert(`Shipment saved successfully!\nUnique Code: ${shipment.uniqueCode}\nLocation: ${shipment.warehouseLocation}`);
    
    // Reset form
    resetForm();
    
    // Return to landing page after a short delay
    if (onBack) {
      setTimeout(() => {
        onBack();
      }, 500);
    }
  };

  const resetForm = () => {
    setFormData({
      mawb: '',
      pkg: '',
      weight: '',
      origin: '',
      shipper: '',
      shipperAddress: '',
      consignee: '',
      consigneeAddress: '',
      natureOfGoods: '',
      finalDest: '',
      date: '',
      flight: '',
      hawb: '',
      warehouseLocation: '',
      uniqueCode: '',
      imageUrl: ''
    });
    setImagePreview(null);
    setImageFile(null);
    setCurrentShipment(null);
    setStatus(UNLOAD_STATUSES.TRUCK_ARRIVAL);
  };

  const handleBeginUnloading = () => {
    setStatus(UNLOAD_STATUSES.BEGIN_UNLOADING);
  };

  return (
    <div className="unload-screen">
      <div className="screen-content">
        {status === UNLOAD_STATUSES.TRUCK_ARRIVAL && (
          <button className="action-button primary" onClick={handleBeginUnloading}>
            Begin Unloading
          </button>
        )}

      {(status === UNLOAD_STATUSES.BEGIN_UNLOADING ||
        status === UNLOAD_STATUSES.UPLOADING_PICTURE ||
        status === UNLOAD_STATUSES.DATA_FETCHING) && (
        <div className="form-section">
          <h3>Upload MAWB or Pallet Details</h3>
          <div className="image-upload-section">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="image-upload" className="upload-button">
              {imagePreview ? 'Change Image' : '📷 Take/Upload Picture'}
            </label>
            
            {isProcessing && (
              <div className="processing-indicator">
                <div className="spinner"></div>
                <p>Extracting data from image...</p>
              </div>
            )}

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Uploaded MAWB" />
              </div>
            )}
          </div>
        </div>
      )}

      {(status === UNLOAD_STATUSES.SELECTING_LOCATION ||
        status === UNLOAD_STATUSES.CREATING_OCR ||
        status === UNLOAD_STATUSES.FINISHED) && (
        <>
          <div className="form-section">
            <h3>Shipment Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>MAWB *</label>
                <input
                  type="text"
                  value={formData.mawb}
                  onChange={(e) => handleInputChange('mawb', e.target.value)}
                  placeholder="e.g., 784-75327420"
                />
              </div>
              <div className="form-group">
                <label>HAWB</label>
                <input
                  type="text"
                  value={formData.hawb}
                  onChange={(e) => handleInputChange('hawb', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>PKG (Packages) *</label>
                <input
                  type="text"
                  value={formData.pkg}
                  onChange={(e) => handleInputChange('pkg', e.target.value)}
                  placeholder="e.g., 10"
                />
              </div>
              <div className="form-group">
                <label>Weight (KG) *</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="e.g., 3030"
                />
              </div>
              <div className="form-group">
                <label>Origin / Port of Discharge *</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="e.g., LAX"
                />
              </div>
              <div className="form-group">
                <label>Final Destination</label>
                <input
                  type="text"
                  value={formData.finalDest}
                  onChange={(e) => handleInputChange('finalDest', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Shipper (SHPR) *</label>
                <input
                  type="text"
                  value={formData.shipper}
                  onChange={(e) => handleInputChange('shipper', e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div className="form-group full-width">
                <label>Shipper Address</label>
                <textarea
                  value={formData.shipperAddress}
                  onChange={(e) => handleInputChange('shipperAddress', e.target.value)}
                  rows="2"
                />
              </div>
              <div className="form-group full-width">
                <label>Consignee</label>
                <input
                  type="text"
                  value={formData.consignee}
                  onChange={(e) => handleInputChange('consignee', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Consignee Address</label>
                <textarea
                  value={formData.consigneeAddress}
                  onChange={(e) => handleInputChange('consigneeAddress', e.target.value)}
                  rows="2"
                />
              </div>
              <div className="form-group full-width">
                <label>Nature of Goods</label>
                <input
                  type="text"
                  value={formData.natureOfGoods}
                  onChange={(e) => handleInputChange('natureOfGoods', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Flight</label>
                <input
                  type="text"
                  value={formData.flight}
                  onChange={(e) => handleInputChange('flight', e.target.value)}
                />
              </div>
              {formData.uniqueCode && (
                <div className="form-group">
                  <label>Unique Code (OCR)</label>
                  <input
                    type="text"
                    value={formData.uniqueCode}
                    readOnly
                    className="readonly-input"
                  />
                </div>
              )}
            </div>
          </div>

          <WarehouseGrid
            onLocationSelect={handleLocationSelect}
            selectedLocation={formData.warehouseLocation}
          />

          {formData.warehouseLocation && formData.uniqueCode && (
            <div className="action-buttons">
              <button className="action-button primary" onClick={handleSave}>
                Save & Complete Unloading
              </button>
              <button className="action-button secondary" onClick={resetForm}>
                Clear & Start New
              </button>
            </div>
          )}
        </>
      )}

      {shipments.length > 0 && (
        <div className="shipments-list">
          <h3>Unloaded Shipments (This Session)</h3>
          <div className="shipments-grid">
            {shipments.map((shipment) => (
              <div key={shipment.id} className="shipment-card">
                <div className="shipment-header">
                  <strong>MAWB: {shipment.mawb}</strong>
                  <span className="unique-code">{shipment.uniqueCode}</span>
                </div>
                <div className="shipment-details">
                  <p>Location: {shipment.warehouseLocation}</p>
                  <p>PKG: {shipment.pkg} | Weight: {shipment.weight} KG</p>
                  <p>Shipper: {shipment.shipper}</p>
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

export default UnloadTruckScreen;

