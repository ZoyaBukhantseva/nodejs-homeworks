const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

mongoose.Promise = global.Promise;

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.disconnect(DB_HOST).then(()=>
  app.listen(PORT, () => { console.log(`Database disconnected successfuly`); process.exit(1)})
).catch(
  error => console.log(`Server not running. Error message: ${error.message}`),
);
