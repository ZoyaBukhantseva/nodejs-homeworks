
const mongoose = require("mongoose");

const app = require('./app')
const DB_HOST= "mongodb+srv://Zoya:5A2mA92NUmce5hSD@cluster0.cvnjhmr.mongodb.net/contacts_reader?retryWrites=true&w=majority"
mongoose.connect(DB_HOST)
.then(()=>app.listen(3000), console.log("Database connection successful"))
.catch(error=>console.log(error.message))
// 5A2mA92NUmce5hSD parol