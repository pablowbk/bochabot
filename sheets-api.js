const { google } = require('googleapis');
const sheets = google.sheets('v4');
require('dotenv').config();
// console.log('credentials', process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS)
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);


const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function getSheetData(range) {
  const authClient = await auth.getClient();
  const request = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    range,
    auth: authClient
  };

  const response = await sheets.spreadsheets.values.get(request);
  return response.data.values;
}

module.exports = {
  getSheetData
}