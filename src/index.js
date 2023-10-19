const express = require('express');
const axios = require('axios');
const cors = require('cors');
const technicalIndicators = require('technicalindicators');

const app = express();
app.use(cors());

// Endpoint to get historical data
app.get('/historical-data/:pair/:interval', async (req, res) => {
    try {
        const { pair, interval } = req.params;
        const url = `https://public.coindcx.com/market_data/candles?pair=${pair}&interval=${interval}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching historical data');
    }
});

// Endpoint to get real-time data
app.get('/real-time-data/:pair', async (req, res) => {
    try {
        const { pair } = req.params;
        const url = `https://api.coindcx.com/exchange/ticker?pair=${pair}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching real-time data');
    }
});

app.get('/moving-average/:pair/:interval/:period', async (req, res) => {
    try {
        const { pair, interval, period } = req.params;
        const url = `https://public.coindcx.com/market_data/candles?pair=${pair}&interval=${interval}`;
        const response = await axios.get(url);

        const closingPrices = response.data.map(candle => candle.close);
        const input = {
            values: closingPrices,
            period: parseInt(period, 10)
        };

        const sma = technicalIndicators.sma(input);
        res.json({ sma });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching and calculating moving average');
    }
});

// Endpoint to get Markets
app.get('/markets', async (req, res) => {
    try {
        const url = "https://api.coindcx.com/exchange/v1/markets";
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching market data');
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
