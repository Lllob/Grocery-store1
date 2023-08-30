const express = require('express') //node-module/express
const expressConfig = require('./config/express') //express logic from config/express.js
const databaseConfig = require('./config/database.js')
const routesConfig = require('./config/routes')

start()
async function start() {
    const app = express()
    expressConfig(app) 
    await databaseConfig(app)
    routesConfig(app)

    app.listen(5000, () => console.log('Server running on port 5000.'));
}

