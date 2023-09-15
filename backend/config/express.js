const express = require('express')

 const cors = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
};

module.exports = async (app) => { 
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
}
