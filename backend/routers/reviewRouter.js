const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");
const Review = require("../models/review");

require("dotenv").config();

// VIEW ALL reviews INFO
router.get("/allReviews", (req, res) => {
    Review.find()
        .populate('user')
        .populate('recipe')
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => res.json({ msg: err }));
});

//CRAETE REVIEW
router.post("/addReview", (req, res) => {
    let userId = req.body.userId
    let recipeId = req.body.recipeId
    var addReview = {
        user: userId,
        recipe: recipeId,
        comment: req.body.comment,
        reviewImage: req.body.reviewImage,
    }

    Review.create(addReview)
        .then((review) => {
            User.findByIdAndUpdate(userId, { $addToSet: { reviews: review } }, { new: true })
                .populate('reviews')
                .then((user)=> {
            Recipe.findByIdAndUpdate(recipeId, { $addToSet: { reviews: review } }, { new: true })
                .populate('reviews')
                .then((review) => {
                     
                res.json({ msg: "review has been added to DB",reviews: review , userDetails:user})
                })
                })
       })
        .catch((err) => { console.log(err) })
});

module.exports = router