const authController = require('../controllers/auth.js')
const homeController = require('../controllers/home.js')  
const catalogController = require('../controllers/catalog.js')
const detailsController = require('../controllers/details')


module.exports = (app) => {
    app.use(authController)
    app.use(homeController) 
    app.use(catalogController)
    app.use(detailsController)
}
