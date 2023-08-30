const router = require('express').Router() 
const  { generateToken }  = require('../util/generateToken');
const { register, login, logout } = require('../services/user.js');

/////////////////////////////////
//register, login, logout

router.post('/register', async (req, res) => { 
 
  try {

    if (req.body.password.trim().length < 2) {
      throw new Error('Password must be at least 2 character long')
    } 
          //req.body - data from frontend
     //console.log(req.body) //to insert the new data into the body (otherwise it messes with the old)
  
   //TO chec
    let user = await register(req.body.username, req.body.email, req.body.password) //we give the data to services/user.js

          const userData = { //for generateToken()
            _id: user._id,
            email: user.email
          }
          
          const  accessToken = generateToken(userData)
        if (user) { 
          const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            basket: user.basket,
            accessToken
          } 
      
          res.status(201).json(data) //we send the data to the frontend
        }
       
		 
  } catch(err) {
     console.error(err);
     res.status(400).json({ message: err.message });
   }  
})
////////////////////////////////////////////////

                 

//TOO check
router.post('/login', async (req, res) => { 
  try {    
    const user = await login(req.body.email, req.body.password);

    const userData = {
      _id: user._id,
      email: user.email
    }
    const  accessToken = generateToken(userData)
    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
     basket: user.basket,
      accessToken
    }
 
        if (user) { 
          res.status(200).json(data) 
        }
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }                  
});
///

router.get('/logout', (req, res) => { // isUser()
  const accessToken = req.header('x-authorization')
   //console.log(accessToken)
  try {
     logout(accessToken); 
      res.status(204).end();
    
  }  catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
})

module.exports = router;
