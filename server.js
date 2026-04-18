/**
 * Developed by Ramzan Ahsan
 * GitHub: https://github.com/Ramzan-Ahsan
 * Description: Proxy server to bypass mixed-content issues for Kilwa Video API
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins so your HTTPS frontend can access it
app.use(cors());

// Endpoint: /api/generate?text=YOUR_INPUT
app.get('/api/generate', async (req, res) => {
    const userInput = req.query.text;

    // 1. Validation
    if (!userInput) {
        return res.status(400).json({
            error: "Missing 'text' query parameter.",
            developed_by: "Ramzan Ahsan"
        });
    }

    try {
        // 2. Properly encode the user input
        const encodedText = encodeURIComponent(userInput);
        const externalApiUrl = `http://de3.bot-hosting.net:21007/kilwa-video?text=${encodedText}`;

        // 3. Fetch from the HTTP external API
        const response = await fetch(externalApiUrl);

        if (!response.ok) {
            throw new Error(`External API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // 4. Return the data to the client
        res.json({
            success: true,
            data: data,
            developed_by: "Ramzan Ahsan"
        });

    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).json({
            error: "Failed to fetch data from the external video API.",
            message: error.message,
            developed_by: "Ramzan Ahsan"
        });
    }
});

app.listen(PORT, () => {
    console.log(`--- Server running on port ${PORT} ---`);
    console.log(`--- Developed by Ramzan Ahsan ---`);
});
