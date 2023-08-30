const router = require('express').Router(); 

router.get('/', (req, res) => {
    res.send("App is Working");
});

module.exports = router; //go to config/routes.js
