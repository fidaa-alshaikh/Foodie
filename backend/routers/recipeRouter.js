const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");


require("dotenv").config();

// VIEW ALL RECIPES info 
router.get("/", (req, res) => {
    Recipe.find()
    .populate('user')
        .then((recipes) => {
            res.json(recipes);
        })
        .catch((err) => res.json({ msg: err }));
});

// ONE RECIPE
router.get('/view/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId
    Recipe.findById(recipeId)
        .populate('user')
        .populate('reviews')
        .then((recipe) => {
            /* */
            /* ++++++++++++++++++++++
                User.find().then(users => {
                    
                    let allUserDetails = []
                    for (user of users){
                        for (review of recipe.reviews){
                            if (user._id == review.user){
                                allUserDetails.push(user)
                            }
                        }
                    }
                    
                }) */
                // console.log("allUsersDetails +++" ,allUsersDetails)
            res.json(recipe);
            
        })
        .catch((err) => res.json({ msg: err }));
})

// SEARCH BY CATEGORY

//CREATE RECIPE
router.post("/addRecipe", (req, res) => {
    let userId = req.body.userId

    var addRecipe = {
        user: userId,
        recipeName: req.body.recipeName,
        recipeImage: req.body.recipeImage,
        category: req.body.category,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients,
        method: req.body.method,
        likes : null,
        views : null,
    }

    Recipe.create(addRecipe)
        .then((recipe) => {
            User.findByIdAndUpdate(userId, { $addToSet: { recipes: recipe } }, { new: true })
                .populate('recipes')
                .then((user) => {
                    //console.log("test",user)
                    res.json({ msg: "recipe has been added to DB",recipes: recipe })

                })

        })
        .catch((err) => { console.log(err) })
});


// EDIT RECIPE
router.put("/update/:recipeId", (req, res) => {
    let recipeId = req.params.recipeId;

    let updateRecipe = {
        recipeName: req.body.recipeName,
        recipeImage: req.body.recipeImage,
        category: req.body.category,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients,
        method: req.body.method,
    };
    Recipe.findByIdAndUpdate(recipeId, updateRecipe)
        .then(recipe => {
            res.json({ msg: "recipe has been updated", recipe: recipe })
        }).catch(err => console.log(err))
});

// DELETE RECIPE
router.delete("/:userId/delete/:recipeId", (req, res) => {
    let userId = req.params.userId
    let recipeId = req.params.recipeId

    Recipe.findByIdAndDelete(recipeId) // delete from Recipe data
        .then(() => {
            res.json({ msg: `recipe ${recipeId} deleted successfully` });
            // delete from User data
            User.findByIdAndUpdate(userId, { $pull: { recipes: recipeId } })
                .then(user => {
                    res.json({ msg: "recipe deleted", recipe: user.recipes })
                })
        })
        .catch(err => console.log(err))

});





module.exports = router