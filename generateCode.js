import { v4 as uuidv4 } from 'uuid';

// Generate a unique OCR code for each shipment
export const generateUniqueCode = () => {
  // Generate a shorter, more readable code
  const uuid = uuidv4();
  // Take first 8 characters and make uppercase
  const shortCode = uuid.replace(/-/g, '').substring(0, 8).toUpperCase();
  // Format as XXX-XXXX for readability
  return `${shortCode.substring(0, 3)}-${shortCode.substring(3)}`;
};

// Generate a timestamp-based code (alternative)
export const generateTimestampCode = () => {
  const now = new Date();
  const timestamp = now.getTime().toString(36).toUpperCase();
  return `OCR-${timestamp.substring(timestamp.length - 8)}`;
};

