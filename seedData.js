// Seed data utility - creates sample shipments with precreated OCRs for testing

export const createSeedData = () => {
  const seedShipments = [
    {
      id: 1,
      mawb: '784-75327420',
      pkg: '10',
      weight: '3030',
      origin: 'LAX',
      shipper: 'AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD',
      shipperAddress: '2ND-4TH FLOOR, NO. 176, XINFENG ROAD, XIAMEN, FUJIAN, CHINA, 361006',
      consignee: 'DB SCHENKER',
      consigneeAddress: '5420 JOHN CANNON DRIVE SUITE 400, SALT LAKE CITY, UTAH 84116',
      natureOfGoods: 'CABLE ASSEMBLY',
      finalDest: 'SLC',
      date: '2024.10.07',
      flight: 'CZ2535',
      hawb: 'HXMN20000300',
      warehouseLocation: 'A01',
      uniqueCode: 'OCR-A01',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      status: 'Finished Unloading',
      type: 'unload',
      loadedQuantity: 0
    },
    {
      id: 2,
      mawb: '784-75327421',
      pkg: '15',
      weight: '4500',
      origin: 'LAX',
      shipper: 'AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD',
      shipperAddress: '2ND-4TH FLOOR, NO. 176, XINFENG ROAD, XIAMEN, FUJIAN, CHINA, 361006',
      consignee: 'FEDEX LOGISTICS',
      consigneeAddress: '123 COMMERCE STREET, DALLAS, TEXAS 75201',
      natureOfGoods: 'ELECTRONIC COMPONENTS',
      finalDest: 'DFW',
      date: '2024.10.08',
      flight: 'CZ2536',
      hawb: 'HXMN20000301',
      warehouseLocation: 'B05',
      uniqueCode: 'OCR-B05',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: 'Finished Unloading',
      type: 'unload',
      loadedQuantity: 5 // Partially loaded
    },
    {
      id: 3,
      mawb: '784-75327422',
      pkg: '8',
      weight: '2400',
      origin: 'LAX',
      shipper: 'TECHNOLOGY IMPORTS INC.',
      shipperAddress: '456 INDUSTRY AVENUE, SHENZHEN, GUANGDONG, CHINA',
      consignee: 'UPS SUPPLY CHAIN',
      consigneeAddress: '789 WAREHOUSE BLVD, ATLANTA, GEORGIA 30309',
      natureOfGoods: 'CABLE ASSEMBLY',
      finalDest: 'ATL',
      date: '2024.10.09',
      flight: 'CZ2537',
      hawb: 'HXMN20000302',
      warehouseLocation: 'C10',
      uniqueCode: 'OCR-C10',
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      status: 'Finished Unloading',
      type: 'unload',
      loadedQuantity: 0
    },
    {
      id: 4,
      mawb: '784-75327423',
      pkg: '20',
      weight: '6000',
      origin: 'LAX',
      shipper: 'GLOBAL SHIPPING CO.',
      shipperAddress: '789 EXPORT ZONE, GUANGZHOU, CHINA',
      consignee: 'DHL SUPPLY CHAIN',
      consigneeAddress: '321 LOGISTICS PARK, CHICAGO, ILLINOIS 60609',
      natureOfGoods: 'ELECTRONIC COMPONENTS',
      finalDest: 'ORD',
      date: '2024.10.10',
      flight: 'CZ2538',
      hawb: 'HXMN20000303',
      warehouseLocation: 'D03',
      uniqueCode: 'OCR-D03',
      createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      status: 'Finished Unloading',
      type: 'unload',
      loadedQuantity: 0
    },
    {
      id: 5,
      mawb: '784-75327424',
      pkg: '12',
      weight: '3600',
      origin: 'LAX',
      shipper: 'AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD',
      shipperAddress: '2ND-4TH FLOOR, NO. 176, XINFENG ROAD, XIAMEN, FUJIAN, CHINA, 361006',
      consignee: 'DB SCHENKER',
      consigneeAddress: '5420 JOHN CANNON DRIVE SUITE 400, SALT LAKE CITY, UTAH 84116',
      natureOfGoods: 'CABLE ASSEMBLY',
      finalDest: 'SLC',
      date: '2024.10.11',
      flight: 'CZ2539',
      hawb: 'HXMN20000304',
      warehouseLocation: 'E08',
      uniqueCode: 'OCR-E08',
      createdAt: new Date().toISOString(), // Just now
      status: 'Finished Unloading',
      type: 'unload',
      loadedQuantity: 0
    }
  ];

  return seedShipments;
};

// Function to seed the localStorage with sample data
export const seedLocalStorage = () => {
  const seedData = createSeedData();
  localStorage.setItem('truck_shipments', JSON.stringify(seedData));
  return seedData;
};

// Function to clear all data
export const clearAllData = () => {
  localStorage.removeItem('truck_shipments');
  localStorage.removeItem('loading_records');
};

// Function to check if data exists
export const hasData = () => {
  const shipments = localStorage.getItem('truck_shipments');
  return shipments && JSON.parse(shipments).length > 0;
};

