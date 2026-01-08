// Local storage utilities for managing shipment data
export const saveShipment = (shipment) => {
  try {
    const existing = getStoredShipments();
    const updated = [...existing, shipment];
    localStorage.setItem('truck_shipments', JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving shipment:', error);
    return false;
  }
};

export const getStoredShipments = () => {
  try {
    const stored = localStorage.getItem('truck_shipments');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error retrieving shipments:', error);
    return [];
  }
};

export const updateShipment = (uniqueCode, updates) => {
  try {
    const shipments = getStoredShipments();
    const index = shipments.findIndex(s => s.uniqueCode === uniqueCode);
    if (index !== -1) {
      shipments[index] = { ...shipments[index], ...updates };
      localStorage.setItem('truck_shipments', JSON.stringify(shipments));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating shipment:', error);
    return false;
  }
};

export const getShipmentByUniqueCode = (uniqueCode) => {
  const shipments = getStoredShipments();
  return shipments.find(s => s.uniqueCode === uniqueCode);
};

