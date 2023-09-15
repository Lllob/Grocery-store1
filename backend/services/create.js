const Post = require('../models/Create.js')
const User = require('../models/User.js') 
const dataD = require('../data/data.js')

//Catalog
async function getPost() {  
   let posts = await Post.find({})
  
    if (posts.length > 0) {
      return posts;
    } else {
        let result
        for (let el of dataD) {
           result = new Post(el) //we insert the initial data into the template
          await result.save()
        }
         return await Post.find({})  
      }
   
}
//////////


//Create
async function createPost(post) { 
  const result = new Post(post);
  return await result.save()
}
///////


//Details
async function getPostById(id) {
  return await Post.findById(id) 
}


//Edit
async function editPost(id, post) {
  const existing = await Post.findById(id); //take details
   
    //we change the data in Post mpdel
   existing.title = post.title;
   existing.imageUrl = post.imageUrl;
   existing.description = post.description;
   existing.type = post.type;
   
   return await existing.save()
}
///////

//Delete
async function deletePost(id) {
  return Post.findByIdAndDelete(id)
}  

/////////////////////////////////

//Buyer//the user who bought the post
async function buyer(postId, userId) {
  const post = await Post.findById(postId) 
   
   if (post.boughtBy.includes(userId)) {
       throw new Error('User has already buy it')
   }
  
  post.boughtBy.push(userId)
  await post.save()

  //the offers that the user bought, we put them in the basket
  const user = await User.findById(userId)
  user.basket.push(postId) 
  await user.save()
  
  return post.boughtBy.length;
}
////////////////////////

//Likes
async function likesPost(postId, userId) {
  const post = await Post.findById(postId) 
   
  if (post.likes.includes(userId)) {
    throw new Error('User has already like it')
  }
  
  post.likes.push(userId) //we put the user in the .likes (list of those who liked the post)
  await post.save()
  
  return post.likes.length;
} 
////////////////////////

//My Profil
  async function getProfil(userId) {
     return await Post.find({ owner: userId }) //finds all user posts
   }
////////

//My shopping 
async function getShopping(userId) {
  const user = await User.findById(userId) 
  const basketBuyId = user.basket; //the entire basket (all the IDs of the purchased posts)
  const allBuyPosts = await Post.find({ _id: basketBuyId });
  //console.log(`myShoppingPosts ${allBuyPosts}`)
  return allBuyPosts;
}


module.exports = {
  createPost,
  getPost,
  getPostById,
  editPost,
  deletePost,
  buyer,
  likesPost,
  getProfil,
  getShopping
}
  
