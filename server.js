/**
 * Developed by Ramzan Ahsan
 * GitHub: https://github.com/Ramzan-Ahsan
 * Description: Clean Proxy API for Kilwa Video
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// 1. Root Route - Welcome Message
app.get('/', (req, res) => {
    res.send('Kilwa Proxy API is Running! Developed by Ramzan Ahsan.');
});

// 2. Generation Route - Filtered Response
app.get('/api/generate', async (req, res) => {
    const userInput = req.query.text;

    // Validation
    if (!userInput) {
        return res.status(400).json({
            success: false,
            error: "Missing 'text' query parameter.",
            developed_by: "Ramzan Ahsan"
        });
    }

    try {
        const encodedText = encodeURIComponent(userInput);
        const externalApiUrl = `http://de3.bot-hosting.net:21007/kilwa-video?text=${encodedText}`;

        const response = await fetch(externalApiUrl);

        if (!response.ok) {
            throw new Error(`External API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Send only the required fields
        res.json({
            success: true,
            video_url: data.video_url || null,
            developed_by: "Ramzan Ahsan"
        });

    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).json({
            success: false,
            error: "Failed to fetch data from the external API.",
            developed_by: "Ramzan Ahsan"
        });
    }
});

app.listen(PORT, () => {
    console.log(`--- Server running on port ${PORT} ---`);
    console.log(`--- Developed by Ramzan Ahsan ---`);
});
