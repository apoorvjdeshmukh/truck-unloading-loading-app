// OCR utility for extracting data from MAWB images
// This is a mock implementation that simulates OCR extraction
// In production, you would use Tesseract.js or an API service

export const extractDataFromImage = async (imageFile) => {
  // Simulate OCR processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock data extraction based on the reference image structure
  // In a real implementation, you would use Tesseract.js here:
  // const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');
  // Then parse the text to extract structured data

  // For prototype, return mock data based on the provided reference image
  const mockData = {
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
    hawb: 'HXMN20000300'
  };

  return mockData;
};

// Real OCR implementation using Tesseract.js (commented out for prototype)
/*
import Tesseract from 'tesseract.js';

export const extractDataFromImage = async (imageFile) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng', {
      logger: m => console.log(m)
    });
    
    // Parse the extracted text to find relevant fields
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    // Extract MAWB (look for pattern like "784-75327420")
    const mawbMatch = text.match(/\d{3}-\d{8}/);
    const mawb = mawbMatch ? mawbMatch[0] : '';
    
    // Extract weight (look for numbers followed by KG)
    const weightMatch = text.match(/(\d+)\s*KG/i);
    const weight = weightMatch ? weightMatch[1] : '';
    
    // Extract PKG count
    const pkgMatch = text.match(/PKG[:\s]*(\d+)/i);
    const pkg = pkgMatch ? pkgMatch[1] : '';
    
    // Extract origin/destination (3-letter airport codes)
    const portMatch = text.match(/(LAX|SLC|GUANGZHOU|GZ)/i);
    const origin = portMatch ? portMatch[1].toUpperCase() : '';
    
    // Extract shipper name (usually appears after "SHPR" or "SHIPPER")
    const shipperMatch = text.match(/SHPR[:\s]*([^\n]+)/i);
    const shipper = shipperMatch ? shipperMatch[1].trim() : '';
    
    return {
      mawb,
      pkg,
      weight,
      origin,
      shipper,
      rawText: text
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
};
*/

