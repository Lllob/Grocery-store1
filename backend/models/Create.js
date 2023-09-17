const { Schema, model, Types: { ObjectId } } = require('mongoose');


const createSchema = new Schema({
   //_id: { type: ObjectId, ref: 'Create' }, //we automatically creat it
   title: { type: String, minlength: [2, 'Title must be at least 2 character long'] },
   imageUrl: { type: String,  required: [true, 'Image url is required'], validate: [/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i, 'Image must be a valid URL'] },
   description: { type: String, minlength: [4, 'Description must be at least 4 character long'] },
   type: { type: String, required: true, enum: ["cakes", "bread", "snacks", "pies", "other"] },
   owner: { type: ObjectId, ref: 'User' },
   boughtBy: { type: [ObjectId], ref: 'User', default: [] },  //a collection of the users who have bought post, with reference to User.js model
   likes: { type: [ObjectId], ref: 'User', default: [] } //users liked the post
   //price: { type: String, required: true, min: [2, 'Price must be at least 2'], validate: [/\d+/, 'Price must be a nuber'] },
});


const Create = model('Createstore', createSchema)
Create.createIndexes();  // automatic creation of indexes       
module.exports = Create; 
