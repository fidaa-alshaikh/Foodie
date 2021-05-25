const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// VIEW ALL USERS INFO
router.get("/", (req, res) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => res.json({ msg: err }));
});

// ONE USER PROFILE

router.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId
    User.findById(userId)
        .populate('recipes')
        .populate('reviews')
        .populate('following')
        .populate('followers')
        .populate('favoriteRecipes')
        .then((user) => {
            res.json(user);
        })
        .catch((err) => res.json({ msg: err }));
})



// SIGNUP
router.post("/signup", (req, res) => {
    
    const newUser = {
        role: "user",
        name: req.body.userName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        userImage: "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg",
        bio: "My bio"
    };

    newUser.email = newUser.email.toLowerCase();
    User.findOne({ email: newUser.email })
        .then((user) => {
            // if the email in the database !
            if (user) {
                res.json({
                    msg: "the email is aleady used, change it plz ! ",
                });
            }
            else {
                var salt = bcrypt.genSaltSync(10);
                newUser.password = bcrypt.hashSync(req.body.password, salt);
                newUser.email = newUser.email.toLowerCase();
                User.create(newUser).then((user) => {
                    res.json({ msg: "user has been registered", user: user });
                });
            }
        })
        .catch((err) => res.json({ msg: err }));
});


//LOGIN
router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    //  let email = req.body.email ; let password = req.body.password
    email = email.toLowerCase();
    const user = await User.findOne({ email: email }); // its same to =>  User.findOne({email:email}).then(user => { })
    // if email is  not exist
    if (!user) {
        res.json({ msg: "email dose not exist" });
    }
    // if email existed
    else {
        // if password is correct
        if (bcrypt.compareSync(password, user.password)) {
            user.password = undefined;
            let payload = { user };
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1000 * 60 * 60,
            }); // to the user info
            res.json({ msg: "user successfully logged in ", token });
        }
        // / if password is not correct
        else {
            res.json({ msg: "password is not correct" });
        }
    }
});


// UPDATE USER INFO
router.put("/update/:userId", (req, res) => {
    let userId = req.params.userId;
    var salt = bcrypt.genSaltSync(10);
    let password= req.body.password
    password= bcrypt.hashSync(req.body.password, salt);

    let updateUser = {
        password: password,     //change password
        name: req.body.name,
        userImage: req.body.userImage,
        bio: req.body.bio,
    };
    User.findByIdAndUpdate(userId, updateUser)
        .then(user => {
            res.json({ msg: "user has been updated", user: user })
        }).catch(err => console.log(err))
});

//FOLLOWINNG /FOLOWERS
router.post('/follow', (req, res) => {
    const userId = req.body.userId;
    const userIdToFollow = req.body.userIdToFollow;

    User.findByIdAndUpdate(userId, { $addToSet: { following: userIdToFollow } })
    .populate('following')
    .populate('followers')
    .then(user => {
        User.findByIdAndUpdate(userIdToFollow, { $addToSet: { followers: userId } }).then(user => {
        }).catch(err => console.log(err))
        res.json({ msg: `successfully followed ${userIdToFollow} and added ${userId} to following`, user: user });

    }).catch(err => console.log(err))
})

//UnFOLLOW
router.post('/unfollow', (req, res) => {
    const userId = req.body.userId;
    const userIdToFollow = req.body.userIdToFollow;

    User.findByIdAndUpdate(userId, { $pull: { following: userIdToFollow } })
    .populate('following')
    .populate('followers')
    .then(user => {
            User.findByIdAndUpdate(userIdToFollow, { $pull: { followers: userId } })
                .then(user => {

                }).catch(err => console.log(err))
                
            res.json({ msg: `successfully unfollowed ${userIdToFollow} and removed ${userId} from following`, user: user });

        }).catch(err => console.log(err))
})


// ADD and DELETE recipes to/from FAVIORATE
router.post("/favorite", (req, res) => {
    let recipeId = req.body.recipeId
    let userId = req.body.userId
    //console.log(recipeId)

    User.findByIdAndUpdate(userId, { $addToSet: { favoriteRecipes: recipeId } }, { new: true })
        .then(user => {
            res.json({ msg: `Recipe ${recipeId} added to your favorite list`, favoriteRecipes: user.favoriteRecipes })
        })
})

router.delete('/:userId/fav/:recipeId', (req, res) => {
    let recipeId = req.params.recipeId
    let userId = req.params.userId
    User.findById(userId)
        .then(user => {
            let favoriteRecipes = user.favoriteRecipes.filter(recipe => {
                return !(recipe == recipeId)
            })
            console.log(favoriteRecipes.length)
            User.findByIdAndUpdate(userId, { favoriteRecipes: favoriteRecipes }, { new: true })
                .then(user => {
                    res.json({ msg: `Recipe ${recipeId} deleted from your favorite list`, favoriteRecipes: user.favoriteRecipes })
                })
        })
    });








//user token
router.get("/:token", (req, res) => {
    let token = req.params.token;

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) return res.json({ msg: err });

        let user = decode;

        res.json({ msg: "user decoded", user });
    });
});


module.exports = router