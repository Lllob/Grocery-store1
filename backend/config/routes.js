const authController = require('../controllers/auth.js')
const homeController = require('../controllers/home.js')  
const catalogController = require('../controllers/catalog.js')
const detailsController = require('../controllers/details')
// const searchController = require('../controllers/search')


module.exports = (app) => {
    app.use(authController)
    app.use(homeController) 
    app.use(catalogController)
    app.use(detailsController)
    // app.use(searchController)
    

    app.get('*', (req, res) => {
      res.render('404', { title: 'Page Not Found'})
    });
}
