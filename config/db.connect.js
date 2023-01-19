const mongoose  = require("mongoose");
// mongoose.set("strictQuery", false);

const dbconnect = mongoose.connect("mongodb://127.0.0.1:27017/mock-11")
.then(()=> console.log('connected to DB'))

module.exports = dbconnect