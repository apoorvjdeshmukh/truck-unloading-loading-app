# Use Cases: Truck Unloading and Loading Management System

## Product Overview
A tablet application for warehouse managers to track the complete lifecycle of cargo shipments - from truck arrival and unloading to storage location assignment and subsequent loading for delivery.

---

## User Persona
**Primary User:** Warehouse Manager
- Uses tablet device in warehouse environment
- Needs to quickly log and track cargo movements
- Requires accurate inventory tracking
- Works in fast-paced environment with time constraints
- May have varying levels of technical expertise

---

## Use Case 1: Unload Truck - Complete Flow

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Unload cargo from arriving truck and store in warehouse

**Preconditions:**
- Truck has arrived at warehouse
- Manager has access to tablet application
- MAWB/pallet documentation is available

**Main Success Scenario:**
1. Manager opens application (defaults to "Unload Truck" mode)
2. Manager sees landing page with unloading history
3. Manager clicks "+ new" button next to "Unload Truck" selector
4. Manager clicks "Begin Unloading" button
5. Manager uploads/takes photo of MAWB or pallet details
6. System automatically extracts data from image (OCR):
   - MAWB number
   - Package count (PKG)
   - Weight
   - Origin/Port of Discharge
   - Shipper information
   - Consignee details
   - Flight number, date, etc.
7. Manager reviews and edits extracted data if needed
8. Manager selects warehouse location from interactive grid map
9. System automatically generates unique OCR code
10. Manager reviews all information
11. Manager clicks "Save & Complete Unloading"
12. System saves shipment record with unique code
13. Manager is returned to landing page with updated history

**Postconditions:**
- Shipment is recorded in system
- Unique OCR code is generated
- Cargo location is assigned
- Data is available for loading process

**Alternative Flows:**
- **A1:** OCR extraction fails → Manager manually enters all data
- **A2:** Manager wants to unload multiple shipments → Can repeat process for each MAWB
- **A3:** Manager selects wrong location → Can change before saving

---

## Use Case 2: Unload Truck - Multiple Shipments

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Unload truck containing multiple shipments (MAWBs)

**Main Success Scenario:**
1. Manager completes unloading for first shipment (Use Case 1)
2. After saving, manager clicks "Clear & Start New" or "Add New Unload"
3. Manager repeats unloading process for next MAWB
4. Each shipment gets its own unique OCR code
5. Each shipment is stored in different or same warehouse location
6. All shipments appear in unloading history

**Postconditions:**
- Multiple shipment records created
- Each with unique OCR code
- All tracked independently

---

## Use Case 3: Load Truck - Single Pallet

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Load single pallet onto truck for delivery

**Preconditions:**
- Cargo has been previously unloaded (exists in system)
- Manager knows the unique OCR code or can select from dropdown

**Main Success Scenario:**
1. Manager switches to "Load Truck" mode
2. Manager sees landing page with loading history
3. Manager clicks "+ new" button next to "Load Truck" selector
4. Manager clicks "Begin Adding Pallets"
5. Manager selects OCR code from dropdown OR enters unique code manually
6. System retrieves shipment data:
   - MAWB, location, packages, weight, shipper
   - Previously loaded quantity
   - Remaining available quantity
7. Manager sets quantity to load using:
   - Number input field (typing)
   - Increment (+) button
   - Decrement (-) button
8. Manager clicks "Search & Add" to add pallet to loading list
9. Manager reviews loading tally (shows arrived vs loaded vs remaining)
10. Manager clicks "Begin Loading"
11. Manager uploads proof of loading images
12. Manager clicks "Complete Loading"
13. System updates shipment records with loaded quantities
14. Manager is returned to landing page

**Postconditions:**
- Loading record created
- Shipment's loaded quantity updated
- Proof images stored
- History updated

---

## Use Case 4: Load Truck - Multiple Pallets (Different MAWBs)

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Load multiple pallets from different shipments onto one truck

**Main Success Scenario:**
1. Manager starts loading process (Use Case 3, steps 1-4)
2. Manager adds first pallet by OCR code
3. Manager sets quantity for first pallet
4. Manager adds second pallet (different OCR/MAWB) from dropdown
5. Manager sets quantity for second pallet
6. Manager continues adding pallets as needed
7. Manager reviews comprehensive tally showing:
   - Total arrived for each MAWB
   - Previously loaded for each MAWB
   - Selected for this load
   - Remaining in warehouse
8. Manager completes loading with proof images
9. All pallets are loaded and records updated

**Postconditions:**
- Multiple pallets from different shipments loaded
- Tally shows accurate tracking per MAWB
- All records updated correctly

---

## Use Case 5: View History - Unloading Records

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Review past unloading activities

**Main Success Scenario:**
1. Manager is on landing page in "Unload Truck" mode
2. Manager sees table with all unloading records showing:
   - Date/Time
   - Unique Code
   - MAWB
   - Warehouse Location
   - Package count
   - Weight
   - Shipper
   - Status
3. Manager can scroll through records
4. Manager can click history icon (📋) in header to see all history in modal

**Postconditions:**
- Manager has visibility into all unloading activities
- Can track what cargo is in warehouse

---

## Use Case 6: View History - Loading Records

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Review past loading activities

**Main Success Scenario:**
1. Manager switches to "Load Truck" mode
2. Manager sees landing page with loading history table showing:
   - Date/Time
   - Number of pallets loaded
   - Total quantity
   - MAWBs involved
   - Number of proof images
   - Status
3. Manager can review past loading transactions
4. Manager can click history icon for detailed view

**Postconditions:**
- Manager has visibility into all loading activities
- Can track what has been shipped out

---

## Use Case 7: Search and Retrieve Cargo by OCR Code

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Find and load specific cargo using unique OCR code

**Main Success Scenario:**
1. Manager is in "Load Truck" mode
2. Manager has unique OCR code (e.g., "OCR-A01")
3. Manager selects code from dropdown OR types it manually
4. System searches and retrieves shipment data
5. Manager sees all shipment details
6. Manager can proceed with loading

**Alternative Flows:**
- **A1:** Code not found → System shows error message
- **A2:** Code already added → System prevents duplicate

---

## Use Case 8: Warehouse Location Selection

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Assign storage location for unloaded cargo

**Main Success Scenario:**
1. Manager is in unloading process
2. Manager reaches location selection step
3. Manager sees interactive grid map (10x10 grid)
4. Grid shows:
   - Available locations (green)
   - Occupied locations (red)
   - Selected location (blue)
5. Manager clicks on available location cell
6. Location code is assigned (e.g., "A01", "B05")
7. System generates unique OCR code
8. Manager can proceed to save

**Alternative Flows:**
- **A1:** Manager clicks occupied location → System prevents selection
- **A2:** Manager wants different location → Can click another cell

---

## Use Case 9: Quantity Adjustment During Loading

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Adjust quantity to load for a pallet

**Main Success Scenario:**
1. Manager has added pallet to loading list
2. Manager sees quantity input with current value
3. Manager can:
   - **Type number:** Directly enter quantity in input field
   - **Click + button:** Increment quantity by 1
   - **Click - button:** Decrement quantity by 1
4. System validates:
   - Quantity cannot exceed remaining available
   - Quantity cannot be negative
   - Quantity must be integer
5. Tally updates automatically showing new totals
6. Manager can adjust multiple times before completing

**Alternative Flows:**
- **A1:** Manager enters number exceeding available → System caps at maximum
- **A2:** Manager enters negative number → System sets to 0
- **A3:** Manager types invalid characters → System ignores or shows error

---

## Use Case 10: Track Loading Progress with Tally

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Monitor how much cargo has been loaded vs arrived for each MAWB

**Main Success Scenario:**
1. Manager has added multiple pallets to loading list
2. Manager sees tally table showing for each MAWB:
   - Total Arrived (original quantity)
   - Previously Loaded (from past loading sessions)
   - Selected Now (quantity being loaded in this session)
   - Remaining (still in warehouse)
3. Manager can see at a glance:
   - Which MAWBs are fully loaded (remaining = 0)
   - Which MAWBs have partial loads
   - How much is being loaded in current session
4. Manager uses this to ensure correct quantities

**Postconditions:**
- Manager has clear visibility into inventory status
- Can prevent over-loading or under-loading

---

## Use Case 11: Status Tracking - Unloading Progress

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Monitor progress through unloading steps

**Main Success Scenario:**
1. Manager sees status bar at top with milestones:
   - 🚚 Truck Arrival
   - 📦 Begin Unloading
   - 📷 Uploading Picture
   - 🔍 Data Fetching from Picture
   - 📍 Selecting Location in Warehouse
   - 🔢 Creating OCR/Unique Number
   - ✅ Finished Unloading
2. As manager progresses, milestones turn green
3. Current milestone is enlarged and highlighted
4. Green progress bar connects completed milestones
5. Manager can see exactly where they are in the process

**Postconditions:**
- Clear visual feedback on progress
- Manager knows what step comes next

---

## Use Case 12: Status Tracking - Loading Progress

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Monitor progress through loading steps

**Main Success Scenario:**
1. Manager sees status bar with milestones:
   - 🚚 Truck Arrival
   - 📦 Adding Pallets
   - ⏳ Begin Loading
   - 📷 Uploading Proof of Loading
   - ✅ Finished Loading
2. Progress bar shows completion status
3. Current step is visually emphasized
4. Manager can track where they are in the process

---

## Use Case 13: Image Upload - MAWB/Pallet Details

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Capture and process MAWB documentation

**Main Success Scenario:**
1. Manager reaches image upload step
2. Manager clicks "Take/Upload Picture" button
3. System opens device camera OR file picker
4. Manager takes photo or selects image
5. Image preview appears
6. System automatically processes image (OCR)
7. System extracts and fills form fields
8. Manager can edit extracted data if needed

**Alternative Flows:**
- **A1:** Image quality poor → Manager retakes photo
- **A2:** OCR fails → Manager manually enters data
- **A3:** Manager wants different image → Can upload again

---

## Use Case 14: Image Upload - Proof of Loading

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Upload proof images for loading verification

**Main Success Scenario:**
1. Manager is in loading process
2. Manager reaches "Upload Proof of Loading" step
3. Manager clicks "Upload Proof Images" button
4. Manager can select multiple images
5. Images appear in grid preview
6. Manager can remove images if needed
7. Manager must upload at least one image to complete
8. Images are stored with loading record

**Postconditions:**
- Proof images attached to loading record
- Visual documentation of loading process

---

## Use Case 15: Manage OCRs - View All Codes

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** View and manage all OCR codes in system

**Main Success Scenario:**
1. Manager clicks "🔍 Manage OCRs" button (bottom right)
2. Modal opens showing:
   - All unique codes
   - Associated MAWBs
   - Warehouse locations
   - Package counts
   - Loading status (loaded vs remaining)
3. Manager can see summary statistics
4. Manager can close modal

---

## Use Case 16: Manage OCRs - Add Sample Data

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Load sample data for testing

**Main Success Scenario:**
1. Manager opens OCR Manager
2. Manager clicks "📦 Add Sample Data (5 OCRs)" button
3. System confirms action
4. System creates 5 sample unloading records
5. Sample data appears in history
6. Can be used for testing loading functionality

---

## Use Case 17: Manage OCRs - Clear All Data

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Reset system by clearing all data

**Main Success Scenario:**
1. Manager opens OCR Manager
2. Manager clicks "🗑️ Clear All Data" button
3. System shows confirmation dialog
4. Manager confirms deletion
5. All shipments and loading records deleted
6. System resets to empty state

**Postconditions:**
- All data cleared
- Fresh start for testing

---

## Use Case 18: Navigation - Switch Between Modes

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Switch between Unload and Load modes

**Main Success Scenario:**
1. Manager is on landing page
2. Manager clicks "Load Truck" button (or "Unload Truck")
3. Slider animates to selected mode
4. Landing page updates to show relevant history
5. "+ new" button appears next to active mode
6. Manager can start new process in selected mode

---

## Use Case 19: Navigation - Return to History

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Return to history view from form

**Main Success Scenario:**
1. Manager is in unloading/loading form
2. Manager clicks "← Back" button (top left)
3. Manager is returned to landing page
4. History is refreshed with latest data
5. Manager can see updated records

**Alternative Flows:**
- **A1:** After completing process → Automatically returns to history
- **A2:** Manager wants to cancel → Can click back anytime

---

## Use Case 20: Error Handling - Invalid OCR Code

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Handle invalid OCR code entry

**Main Success Scenario:**
1. Manager enters OCR code that doesn't exist
2. Manager clicks "Search & Add"
3. System shows error: "No shipment found with this unique code"
4. Manager can try again with correct code
5. Manager can select from dropdown instead

---

## Use Case 21: Error Handling - Exceed Available Quantity

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Prevent loading more than available

**Main Success Scenario:**
1. Manager sets quantity higher than remaining
2. System automatically caps at maximum available
3. Input shows maximum value
4. System prevents invalid entry
5. Manager can adjust to valid quantity

---

## Use Case 22: Error Handling - Duplicate Pallet Addition

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Prevent adding same pallet twice

**Main Success Scenario:**
1. Manager adds pallet to loading list
2. Manager tries to add same OCR code again
3. System shows error: "This shipment is already added"
4. Manager cannot add duplicate
5. Manager can adjust quantity of existing entry instead

---

## Use Case 23: Responsive Design - Tablet Usage

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Use application on tablet device

**Main Success Scenario:**
1. Manager accesses app on tablet (via network IP)
2. Interface adapts to tablet screen size
3. Touch-friendly buttons and controls
4. Camera access for photo capture
5. Grid map is interactive and touch-responsive
6. All features work seamlessly on tablet

---

## Use Case 24: Data Persistence - Session Continuity

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Data persists across sessions

**Main Success Scenario:**
1. Manager creates unloading records
2. Manager closes browser/app
3. Manager reopens application
4. All previous records are still present
5. History shows all past activities
6. OCR codes are still searchable

**Postconditions:**
- Data stored in browser localStorage
- No data loss between sessions

---

## Use Case 25: Multi-Shipment Tracking - Same MAWB

### Primary Flow
**Actor:** Warehouse Manager  
**Goal:** Track multiple unloading instances of same MAWB

**Main Success Scenario:**
1. Manager unloads shipment with MAWB "784-75327420"
2. Later, another shipment arrives with same MAWB
3. Manager unloads second shipment
4. Both appear in history with different unique codes
5. When loading, tally shows combined totals for same MAWB
6. System tracks each instance separately

---

## Edge Cases & Error Scenarios

### EC1: Network Disconnection
- **Scenario:** Manager loses internet while using app
- **Behavior:** App continues working (localStorage), data syncs when connection restored

### EC2: Browser Refresh During Process
- **Scenario:** Manager accidentally refreshes page mid-process
- **Behavior:** Form data may be lost, but saved records persist

### EC3: Invalid Image Format
- **Scenario:** Manager uploads non-image file
- **Behavior:** System rejects file, shows error, allows retry

### EC4: Warehouse Location Already Occupied
- **Scenario:** Manager selects location that becomes occupied
- **Behavior:** System shows occupied status, prevents selection

### EC5: Maximum Quantity Reached
- **Scenario:** All cargo for MAWB has been loaded
- **Behavior:** MAWB shows 0 remaining, cannot add more to load list

---

## Key Design Considerations

### Visual Feedback
- Status milestones with icons and names
- Color-coded progress (green = completed, grey = pending)
- Enlarged current milestone
- Progress bar connecting milestones

### User Experience
- Touch-friendly interface for tablets
- Large, accessible buttons
- Clear visual hierarchy
- Immediate feedback on actions
- Error messages are clear and actionable

### Data Integrity
- Validation at every step
- Prevents invalid entries
- Tracks quantities accurately
- Maintains audit trail

### Performance
- Fast image processing (OCR)
- Smooth animations
- Responsive interactions
- Quick data retrieval

---

## Success Metrics

### Efficiency
- Time to unload single shipment: < 3 minutes
- Time to load truck with multiple pallets: < 5 minutes
- OCR accuracy: > 90% (with manual override option)

### Usability
- Zero training required for basic operations
- Error rate: < 5%
- User satisfaction: High

### Data Accuracy
- 100% tracking of cargo locations
- Accurate quantity tracking
- Complete audit trail

---

## Future Enhancements (Out of Scope for Prototype)

1. Barcode/QR code scanning for OCR codes
2. Backend integration for multi-device sync
3. Advanced filtering and search
4. Export functionality for reports
5. Multi-warehouse support
6. Real-time inventory dashboard
7. Integration with warehouse management systems
8. Mobile app version
9. Offline mode with sync
10. Advanced analytics and reporting

---

## Technical Constraints

- Browser-based application (requires modern browser)
- LocalStorage for data persistence (limited to ~5-10MB)
- Camera access required for photo capture
- Network access for tablet connectivity
- OCR currently uses mock data (can be enhanced with real OCR)

---

This document provides comprehensive use cases for the designer to understand all functionality, user flows, and edge cases in the application.

