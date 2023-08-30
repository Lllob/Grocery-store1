const router = require('express').Router(); 
const { getPost } = require('../services/create') 
const errorMapper = require('../util/errorMapper');


//Catalog
router.get('/catalog', async (req, res) => {  
    try {
      const posts = await getPost()
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
    }
   
}); 
 
module.exports = router;
