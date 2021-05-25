const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    role : String,
    email : {
        type : String , 
        required : true ,
    },
    password : {
        type : String , 
        required : true
    } , 
    name : {
        type : String 
    },
    userName : {
        type : String , 
        required : true
    },
    userImage: String,
    bio: String,

    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

} , {timestamps : true})


const User = mongoose.model('User' , userSchema)
module.exports = User