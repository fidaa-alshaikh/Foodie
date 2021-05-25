const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    comment: String,
    reviewImage: String,

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},

} , {timestamps : true})


const Review = mongoose.model('Review' , reviewSchema)
module.exports = Review