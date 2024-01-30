// Step 1: Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';

// Step 2: Create a mock database (You can replace this with a real database)
const emailToDeliveryUnit = {
    'example1@email.com': 'Delivery Unit 1',
    'example2@email.com': 'Delivery Unit 2',
    // Add more mappings
};

// Step 3: Initialize Express
const app = express();
app.use(bodyParser.json());

// Step 4: Define the API endpoint
app.get('/getDeliveryUnit', (req, res) => {
    const email = req.query.email;
    if (typeof email === 'string') {
        const deliveryUnit = emailToDeliveryUnit[email];
        if (deliveryUnit) {
            res.json({ deliveryUnit });
        } else {
            res.status(404).send('Delivery unit not found for the given email');
        }
    } else {
        res.status(400).send('Invalid email format');
    }
});

// Step 5: Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

