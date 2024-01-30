"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const excelreader_1 = require("./excelreader"); // Import the function
// Initialize Express app
const app = (0, express_1.default)();
// Use bodyParser middleware to parse JSON body
app.use(body_parser_1.default.json());
const emailData = (0, excelreader_1.readExcelData)('src/data.xlsx');
// Mapping emails to their full record
const emailToRecordMap = {};
emailData.forEach(item => {
    emailToRecordMap[item.EMAIL] = item;
});
// POST endpoint to get delivery units for emails
app.post('/getDeliveryUnits', (req, res) => {
    const emails = req.body.emails;
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
