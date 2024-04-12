const mongoose = require('mongoose');

const timeSeriesSchema = new mongoose.Schema({
  symbol: String,
  timestamp: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number
});

const TimeSeries = mongoose.model('TimeSeries', timeSeriesSchema);

module.exports = TimeSeries;
