'use strict';
const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/User");
const app = express();
const axios = require('axios');
const md5 = require('md5');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json());
var request = require('request');
const Current = require("./db/currentStockSearched");
const TimeSeries = require("./db/timeSeries");
const Company = require("./db/companySearched");




// This is the signup api also saving the data to database
app.post("/register", async (req, resp) => {
  let { name , email, password} = req.body;
  let user = new User({name: name, email:email, password: md5(password)});   // Using Encryption and decryption using md5
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
})



// This is the login api
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne({email: req.body.email});
    if (user && user.password === md5(req.body.password)) {
      resp.send(user);
    }
    else {
      resp.send({ result: "Incorrect username and password" });
    }
  }
  else {
    resp.send({ result: 'No User Found' });
  }

})

// This api for TimeSeries data 
app.get("/search", async (req, res) => {
  try {
    const symbol = req.query.searchText;
    console.log("Searching for symbol:", symbol);

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=3HYHBTAQ6M69BQRG`;

    const response = await axios.get(url);
    const responseData = response.data;
    console.log("Received data:", responseData);

    if (responseData) {
      const globalQuote = responseData["Global Quote"];
      console.log("////////////////", globalQuote);
      // Save the data to MongoDB
      const newData = new Current({
        symbol: globalQuote["01. symbol"],
        latestTradingDay: globalQuote["07. latest trading day"],
        open: globalQuote["02. open"],
        high: globalQuote["03. high"],
        low: globalQuote["04. low"],
        price: globalQuote["05. price"],
        volume: globalQuote["06. volume"],
        previousClose: globalQuote["08. previous close"],
        change: globalQuote["09. change"],
        changePercent: globalQuote["10. change percent"],
      });

      // Save data to MongoDB
      await newData.save();
      console.log("Data saved to MongoDB:", newData);

      res.send(newData);
    } else {
      res.status(404).json({ error: "Data not found for the symbol" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// This api is for Quote Endpoint (real time)
app.get("/searchTimeSeries", async (req, res) => {
  try {
    const symbol = req.query.searchText;
    console.log("type", typeof (symbol));
    console.log("Searching for symbol:", symbol);

    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=3HYHBTAQ6M69BQRG`;

    const response = await axios.get(url);
    const responseData = response.data;
    console.log("Received data:", responseData);

    const timeSeriesData = responseData['Time Series (5min)'];
    // console.log("ttttttt",timeSeriesData);


    if (timeSeriesData) {
      const timeSeriesArray = Object.entries(timeSeriesData).map(([timestamp, values]) => ({

        symbol: symbol,
        timestamp: new Date(timestamp),
        open: values['1. open'],
        high: values['2. high'],
        low: values['3. low'],
        close: values['4. close'],
        volume: values['5. volume']
      }));

      const companyInstance = new Company();
      companyInstance.symbol = symbol;

      await companyInstance.save();


      // Save the data to MongoDB
      await TimeSeries.insertMany(timeSeriesArray);
      console.log("Data saved to MongoDB", timeSeriesArray);

      res.send(timeSeriesArray);
    } else {
      res.status(404).json({ error: "Data not found for the symbol" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.listen(7000);


