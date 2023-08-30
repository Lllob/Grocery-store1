const jwt = require("jsonwebtoken"); //npm i jsonwebtoken

const { validateToken } = require('../services/user')

const JWT_SECRET = 'jhuy76540kmzczx91j6y95gk66t'

function generateToken(id) { 
  const accessToken = jwt.sign({ id } , JWT_SECRET, {
    expiresIn: "20d",
   });
  return accessToken
};

async function getDataFromToken(accessToken) {
  const validate = await validateToken(accessToken) //is it blacklisted?
  if (validate) {
    const data = jwt.verify(accessToken, JWT_SECRET) 
    //console.log(`getDataFromToken util ${data.id._id}`) // id: { _id: '64592ea46f051e', email: 'aaf@s.s' }
  return data;
  } else {
    throw new Error('Token is in blacklist');
  }
}


module.exports = {
   generateToken,
   getDataFromToken,
  }
