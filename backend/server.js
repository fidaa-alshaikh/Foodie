require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true  },
  () => {
    console.log("mongoDb is connected");
  }
);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", require("./routers/userRouter"));
app.use("/api/recipe", require("./routers/recipeRouter"));
app.use("/api/review", require("./routers/reviewRouter"));

app.listen(PORT, () => console.log(`server running in ${PORT}`));

const path = require('path')
app.use(express.static(path.join(__dirname , "build")));
app.get("*" , (req,res ) =>{
res.sendFile(path.join(__dirname , "build" , "index.html"))
})