/**
 * Developed by Ramzan Ahsan
 * GitHub: https://github.com/Ramzan-Ahsan
 * Description: Proxy server to bypass mixed-content issues for Kilwa Video API
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Endpoint: /api/generate?text=
app.get('/api/generate', async (req, res) => {
    const userInput = req.query.text;

    if (!userInput) {
        return res.status(400).json({
            error: "Missing 'text' query parameter.",
            developed_by: "Ramzan Ahsan"
        });
    }

    try {
        const encodedText = encodeURIComponent(userInput);
        const externalApiUrl = `http://de3.bot-hosting.net:21007/kilwa-video?text=${encodedText}`;

        // Deno and Node 18+ have global fetch
        const response = await fetch(externalApiUrl);

        if (!response.ok) {
            throw new Error(`External API responded with status: ${response.status}`);
        }

        const data = await response.json();

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
