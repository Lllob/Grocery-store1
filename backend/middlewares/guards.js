const { getDataFromToken } = require('../util/generateToken')
const Post = require('../models/Create.js')

module.exports = {
    isUser: () => (req, res, next) => {
        const accessToken = req.header('x-authorization')
        //const accessToken = req.headers["authorization"]
        if (accessToken) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    },

    isOwner: () => async (req, res, next) => {
       const accessToken = req.header('x-authorization')
       //const accessToken = req.headers["authorization"]
        const userDataToken = await getDataFromToken(accessToken)
        const postId = req.params.id
        const post = await Post.findById(postId)
        //console.log(`gards userData ${userDataToken.id._id}`)
        if (userDataToken.id._id == post.owner) {
            next();
         } else {
            res.status(403).json({ message: 'You cannot modify this record' });
        }
    }
};

