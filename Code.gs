// Replace with your Google Sheet ID
const SHEET_ID = '13rqzm3_fhPDgTo4g61OUaxxE8wBeKHdyR4F1VcU630c';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.parameter.data);
    
    // Get the specific sheet by name
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name,
      data.contact,
      data.position,
      data.position === 'syndicate' ? data.district : '',
      data.position === 'campus-body' ? data['campus-name'] : ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput('success')
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader('Access-Control-Allow-Origin', '*');
    
  } catch(error) {
    // Return error response
    return ContentService.createTextOutput('error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}

// Add doGet function to handle CORS preflight requests
function doGet(e) {
  return ContentService.createTextOutput('success')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*');
}

// Function to set up the sheet headers
function setupSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Set headers to match existing sheet
  const headers = [
    'Timestamp',
    'Name',
    'Contact Number',
    'Position (Syndicate/Campus Body)',
    'District (if Syndicate)',
    'Campus Name (if Campus Body)'
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.appendRow(headers);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#1db584');
  headerRange.setFontColor('white');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}