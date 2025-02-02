// lib/googleSheet.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function getCarData() {
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  // Check if header row is present
    // Ensure that the header row is loaded
    await sheet.loadHeaderRow(1);
    console.log('Header values:', sheet.headerValues);
    
    // Now you can safely check headerValues
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
        console.error('No header values found in the sheet. Make sure the first row contains headers.');
        return;
    }

  const rows = await sheet.getRows();
  console.log('Rows fetched:', rows.length);
  console.log('Row keys:', Object.keys(rows[1]));

  const cars = rows.map(row => ({
    model: row.Model,
    year: row.Year,
    price: row.Price,
    imageUrl: row['Image URL'],
  }));

  console.log('Cars:', cars);
  return cars;
}
