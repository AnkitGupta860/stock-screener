const mongoose = require("mongoose");

const currentStockSearchedSchema = new mongoose.Schema({
    symbol: String,
    latestTradingDay: String,
    open: Number,
    high: Number,
    low: Number,
    price: Number,
    volume: Number,
    previousClose: Number,
    change: Number,
    changePercent: String, 
});

const Current = mongoose.model("Current", currentStockSearchedSchema);
module.exports = Current;
