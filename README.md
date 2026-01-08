# Truck Unloading and Loading Management App

A tablet application prototype for warehouse managers to track the unloading and loading processes of trucks at a trucking company warehouse.

## Features

### Mode Selection
- **Unload Truck** (default): Track the unloading process when trucks arrive at the warehouse
- **Load Truck**: Track the loading process when preparing cargo for delivery

### Unloading Truck Features
- **Dedicated unloading screen** to log truck unloading
- **Image upload/photo capture** of MAWB (Master Air Waybill) or pallet details
- **OCR (Optical Character Recognition)** to automatically extract data from uploaded images:
  - MAWB number
  - Package count (PKG)
  - Weight
  - Origin/Port of Discharge
  - Shipper information
  - Consignee details
  - And more
- **Warehouse location selection** with interactive grid map (10x10 grid)
- **Unique OCR code generation** for each shipment (barcode-like identifier)
- **Multiple MAWB support** - can unload multiple shipments from one truck
- **Status tracking** with visual progress indicators:
  1. Truck Arrival
  2. Begin Unloading
  3. Uploading Picture
  4. Data Fetching from Picture
  5. Selecting Location in Warehouse
  6. Creating OCR/Unique Number
  7. Finished Unloading

### Loading Truck Features
- **OCR/Unique code lookup** to retrieve previously unloaded cargo data
- **Multi-pallet selection** - select multiple pallets from different shipments (MAWBs) at once
- **Smart tallying system** that tracks:
  - Total cargo arrived for each MAWB
  - How much has been previously loaded
  - How much is being loaded in this session
  - Remaining cargo in warehouse
- **Proof of loading images** - upload multiple images as proof
- **Status tracking**:
  1. Truck Arrival
  2. Adding Pallets
  3. Begin Loading
  4. Uploading Proof of Loading
  5. Finished Loading

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd truck-unloading-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser or on your tablet device.

## Usage

### Unloading a Truck

1. Select "Unload Truck" mode (default)
2. Click "Begin Unloading"
3. Upload or take a photo of the MAWB/pallet details
4. Wait for OCR processing (automatic data extraction)
5. Review and edit the extracted data if needed
6. Select a warehouse location from the interactive grid
7. A unique code will be automatically generated
8. Click "Save & Complete Unloading"

### Loading a Truck

1. Select "Load Truck" mode
2. Click "Begin Adding Pallets"
3. Enter the unique code (OCR) for a previously unloaded shipment
4. Click "Search & Add" to retrieve the shipment data
5. Adjust the quantity to load for each pallet
6. Add multiple pallets from different shipments as needed
7. Review the loading tally to see how much cargo has been loaded vs arrived for each MAWB
8. Click "Begin Loading"
9. Upload proof of loading images
10. Click "Complete Loading" to finish

## Technical Details

### Technologies Used
- **React** 18.2.0 - UI framework
- **Tesseract.js** 5.0.4 - OCR library (currently using mock implementation for prototype)
- **UUID** 9.0.1 - Unique code generation
- **LocalStorage** - Data persistence

### Project Structure
```
truck-unloading-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ModeSelector.js
│   │   ├── UnloadTruckScreen.js
│   │   ├── LoadTruckScreen.js
│   │   └── WarehouseGrid.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── ocr.js
│   │   └── generateCode.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

### OCR Implementation

Currently, the app uses a mock OCR implementation that simulates data extraction. To enable real OCR functionality:

1. Uncomment the Tesseract.js code in `src/utils/ocr.js`
2. The real implementation will extract text from images and parse structured data

### Data Storage

The app uses browser localStorage to persist data:
- `truck_shipments`: Stores all unloaded shipment records
- `loading_records`: Stores loading transaction records

## Features for Tablet Use

- Touch-friendly interface with large buttons
- Responsive design optimized for tablet screens
- Image capture support using device camera
- Horizontal and vertical orientation support
- Visual status indicators for process tracking
- Color-coded warehouse grid for easy location selection

## Future Enhancements

- Real OCR implementation using Tesseract.js or cloud-based OCR API
- Backend integration for data synchronization
- Barcode/QR code scanning for unique codes
- Advanced filtering and search
- Export functionality for reports
- Multi-warehouse support
- Real-time inventory tracking

## License

This is a prototype application for demonstration purposes.

