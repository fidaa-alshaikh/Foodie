const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    recipeName : {
        type : String , 
        required : true ,
    },
    recipeImage : {
        type : String , 
        required : true
    } , 
    category : {
        type : String , 
        required : true
    },
    cookTime : {
        type : String , 
        required : true
    },
    ingredients : {
        type : String , //[{type:String}] or Array
        required : true
    },
    method : {
        type : String , 
        required : true
    },
    likes : Number,
    views : Number,

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],

} , {timestamps : true})


const Recipe = mongoose.model('Recipe' , recipeSchema)
module.exports = Recipe