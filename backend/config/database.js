const mongoose = require('mongoose') //connecting with mongoose
require('../models/User')
require('../models/Create')

mongoose.set('strictQuery', false)

//TOO change dbName
const dbName = "groseryStorig" //the name must be pasted
const db = `mongodb://127.0.0.1:27017/${dbName}`

module.exports = async (app) => { 
 try {                                         
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
 
    console.log('Database connected');

    mongoose.connection.on('error', (err) => {
        console.error('Database error');
        console.error(err);
    });

  } catch (err) {
     console.error('Error connecting to database');
     process.exit(1);
  }
}
