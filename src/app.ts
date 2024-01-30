import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { readExcelData, EmailRecord } from './excelreader'; // Import the function

// Initialize Express app
const app = express();

// Use bodyParser middleware to parse JSON body
app.use(bodyParser.json());

const emailData = readExcelData('src/data.xlsx');

// Mapping emails to their full record
const emailToRecordMap: { [email: string]: EmailRecord } = {};
emailData.forEach(item => {
  emailToRecordMap[item.EMAIL] = item;
});
  

// POST endpoint to get delivery units for emails
app.post('/getDeliveryUnits', (req, res) => {
    const emails: string[] = req.body.emails;
  
    if (!emails || !Array.isArray(emails)) {
      return res.status(400).send('Invalid request format. Expected an array of emails.');
    }
  
    const results = emails.map(email => emailToRecordMap[email] || { email, error: 'Not found' });
  
    res.json({ results });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
