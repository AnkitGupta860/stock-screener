const mongoose = require("mongoose");
const company = new mongoose.Schema({
    symbol: String
});
const Company = mongoose.model("companySearched",company);
module.exports = Company;