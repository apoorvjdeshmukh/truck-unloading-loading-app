# Precreated OCRs / Unique Codes

## Default State

**By default, there are NO precreated OCRs in the application.** The application starts with an empty state. OCRs (Unique Codes) are only created when:

1. A user unloads a truck
2. A shipment is saved
3. A unique code is automatically generated

---

## Sample Data Available

To test the application with sample data, I've created a **Seed Data Utility** that includes **5 precreated OCRs**. These can be loaded using the "Manage OCRs" button in the app (bottom right corner).

### Precreated Sample OCRs:

| Unique Code | MAWB | Location | PKG | Weight (KG) | Shipper | Loaded | Remaining |
|-------------|------|----------|-----|-------------|---------|--------|-----------|
| **OCR-A01** | 784-75327420 | A01 | 10 | 3030 | AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD | 0 | 10 |
| **OCR-B05** | 784-75327421 | B05 | 15 | 4500 | AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD | 5 | 10 |
| **OCR-C10** | 784-75327422 | C10 | 8 | 2400 | TECHNOLOGY IMPORTS INC. | 0 | 8 |
| **OCR-D03** | 784-75327423 | D03 | 20 | 6000 | GLOBAL SHIPPING CO. | 0 | 20 |
| **OCR-E08** | 784-75327424 | E08 | 12 | 3600 | AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD | 0 | 12 |

---

## Details of Each Precreated OCR:

### 1. OCR-A01
- **MAWB:** 784-75327420
- **HAWB:** HXMN20000300
- **Warehouse Location:** A01
- **Packages:** 10
- **Weight:** 3030 KG
- **Origin:** LAX
- **Final Destination:** SLC
- **Shipper:** AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD
- **Consignee:** DB SCHENKER
- **Nature of Goods:** CABLE ASSEMBLY
- **Flight:** CZ2535
- **Date:** 2024.10.07
- **Status:** Finished Unloading
- **Loaded Quantity:** 0 / 10

### 2. OCR-B05
- **MAWB:** 784-75327421
- **HAWB:** HXMN20000301
- **Warehouse Location:** B05
- **Packages:** 15
- **Weight:** 4500 KG
- **Origin:** LAX
- **Final Destination:** DFW
- **Shipper:** AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD
- **Consignee:** FEDEX LOGISTICS
- **Nature of Goods:** ELECTRONIC COMPONENTS
- **Flight:** CZ2536
- **Date:** 2024.10.08
- **Status:** Finished Unloading
- **Loaded Quantity:** 5 / 15 (Partially loaded)

### 3. OCR-C10
- **MAWB:** 784-75327422
- **HAWB:** HXMN20000302
- **Warehouse Location:** C10
- **Packages:** 8
- **Weight:** 2400 KG
- **Origin:** LAX
- **Final Destination:** ATL
- **Shipper:** TECHNOLOGY IMPORTS INC.
- **Consignee:** UPS SUPPLY CHAIN
- **Nature of Goods:** CABLE ASSEMBLY
- **Flight:** CZ2537
- **Date:** 2024.10.09
- **Status:** Finished Unloading
- **Loaded Quantity:** 0 / 8

### 4. OCR-D03
- **MAWB:** 784-75327423
- **HAWB:** HXMN20000303
- **Warehouse Location:** D03
- **Packages:** 20
- **Weight:** 6000 KG
- **Origin:** LAX
- **Final Destination:** ORD
- **Shipper:** GLOBAL SHIPPING CO.
- **Consignee:** DHL SUPPLY CHAIN
- **Nature of Goods:** ELECTRONIC COMPONENTS
- **Flight:** CZ2538
- **Date:** 2024.10.10
- **Status:** Finished Unloading
- **Loaded Quantity:** 0 / 20

### 5. OCR-E08
- **MAWB:** 784-75327424
- **HAWB:** HXMN20000304
- **Warehouse Location:** E08
- **Packages:** 12
- **Weight:** 3600 KG
- **Origin:** LAX
- **Final Destination:** SLC
- **Shipper:** AMPHENOL (XIAMEN) HIGH SPEED CABLE CO., LTD
- **Consignee:** DB SCHENKER
- **Nature of Goods:** CABLE ASSEMBLY
- **Flight:** CZ2539
- **Date:** 2024.10.11
- **Status:** Finished Unloading
- **Loaded Quantity:** 0 / 12

---

## How to Load Sample Data

### Method 1: Using the App Interface
1. Start the application (`npm start`)
2. Look for the **"🔍 Manage OCRs"** button in the bottom right corner
3. Click the button
4. Click **"📦 Add Sample Data (5 OCRs)"** button
5. The 5 sample OCRs will be loaded and available in the "Load Truck" mode

### Method 2: Using Browser Console
1. Open the application in your browser
2. Open Developer Console (F12 or Cmd+Option+I)
3. Type:
   ```javascript
   import { seedLocalStorage } from './src/utils/seedData';
   seedLocalStorage();
   ```
   Or if you have access to the module:
   ```javascript
   localStorage.setItem('truck_shipments', JSON.stringify([/* paste seed data */]));
   ```

### Method 3: Programmatically
In your browser console, you can also manually set localStorage:
```javascript
const seedData = [
  // Copy from src/utils/seedData.js
];
localStorage.setItem('truck_shipments', JSON.stringify(seedData));
```

---

## Using Precreated OCRs in Load Truck Mode

Once sample data is loaded:

1. Switch to **"Load Truck"** mode
2. Click **"Begin Adding Pallets"**
3. Enter any of the unique codes:
   - `OCR-A01`
   - `OCR-B05`
   - `OCR-C10`
   - `OCR-D03`
   - `OCR-E08`
4. Click **"Search & Add"**
5. The shipment data will be retrieved and displayed
6. Adjust quantity and complete the loading process

---

## Clearing Data

To clear all OCRs and start fresh:

1. Click the **"🔍 Manage OCRs"** button
2. Click **"🗑️ Clear All Data"**
3. Confirm the deletion
4. All shipments and loading records will be deleted

---

## Summary

- **Default:** 0 OCRs (empty state)
- **With Sample Data:** 5 OCRs (loaded via "Manage OCRs" button)
- **Format:** OCR-[Location] (e.g., OCR-A01, OCR-B05)
- **Storage:** Browser localStorage
- **All OCRs can be viewed and managed through the "Manage OCRs" interface**

