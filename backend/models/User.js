const { Schema, model, Types: { ObjectId } } = require('mongoose');


//TOO meik promeni
const NAME_PATTAERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/

const userSchema = new Schema({  
    username: { type: String, required: [true, 'Username is required'], minlength: [2, 'Userme must be at least 2 character long'], validate: {   //, unique: true, minlength: 3
        validator(value) {
          return NAME_PATTAERN.test(value) //testvame NAME_PATTERN
        },
        message: 'Username may contain only english letters'
     } },
    //
    email: { type: String, required: [true, 'Email is required'], minlength: [2, 'Email must be at least 2 character long'], validate: { 
        validator(value) {
          return EMAIL_PATTERN.test(value)
        },
        message: 'Email may contain only english letters'
     } },
     //
    hashedPassword: { type: String, required: [true, 'Password is required'],  minlength: [2, 'Password must be at least 2 character long'] },
   basket: { type: [ObjectId], ref: 'Create', default: [] } //the purchased posts from the user
});
                
userSchema.index({ email: 1 }, {  
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User; 
