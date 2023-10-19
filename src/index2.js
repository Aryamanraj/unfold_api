const axios = require('axios');

// Function to fetch and display candlestick data
async function fetchAndDisplayCandleData(pair, interval, startTime, endTime, limit) {
    try {
        const url = 'https://api.coindcx.com/market_data/candles'; // Replace with the actual endpoint if different
        const params = {
            pair,
            interval,
            startTime,
            endTime,
            limit,
        };

        const response = await axios.get(url, { params });
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
            console.log('Candlestick Data:');
            data.forEach((candle, index) => {
                console.log(`Candle ${index + 1}:`);
                console.log('Open:', candle.o);
                console.log('High:', candle.h);
                console.log('Low:', candle.l);
                console.log('Close:', candle.c);
                console.log('Volume:', candle.v);
                console.log('Time:', new Date(candle.t).toLocaleString());
                console.log('----------------------------------');
            });
        } else {
            console.log('No data retrieved.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Execute the function with example parameters
fetchAndDisplayCandleData('B-BTC_USDT', '1m', null, null, 10);
