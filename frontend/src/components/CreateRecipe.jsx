import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useHistory } from "react-router-dom";
import API_URL from "../APIconfig";
//import { Link } from "react-router-dom";

export default function CreateRecipe(props) {

  const history = useHistory();

  const [recipe, setRecipe] = useState({}); // recipe info

const userId = props.auth.currentUser._id;

  //to add the input inside recipe
  const onChangeInput = ({ target: { name, value } }) => {
    setRecipe({ ...recipe, [name]: value ,["userId"]: userId, ["recipeImage"]: image});
  };
  // to add the recipe info to database
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/api/recipe/addRecipe`, recipe)
      .then((res) => {
        const recipe = res.data.recipe;
        console.log("res",res.data.recipe)
          console.log("recipe added to DB ")
          history.push("/profile");

      })
      .catch((err) => console.log(err));
  };

      // upload Image 
      const [image, setImage] = useState('')
      //const [loading, setLoading] = useState(false)
     // const [loadImage, setLoadImage] = useState(false)
    
      const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'foodie')
        //setLoading(true)
        const res = await fetch(
          '	https://api.cloudinary.com/v1_1/drtd6zi1g/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
    
        setImage(file.secure_url)
        //setLoading(false)
       // setLoadImage(true)
      }
    
        // end image


    
    return (
<div>
<div className="container">
  <header className="header">
    <br/><br/><br/>
    <h1 id="title" className="text-center">Add New Recipe</h1>
    <p id="description" className="description text-center">
    Add your delicious recipe. Any recipe is welcome !
    </p>
  </header>
  <form id="survey-form">
    <div className="form-group">
      <label id="recipeName-label" className="CRlabel" for="name">Recipe Name</label>
      <input
      className="IBST"
        type="text"
        name="recipeName"
        id="recipeName"
        className="form-control"
        placeholder="Enter recipe name here"
        required
        onChange={(e) => onChangeInput(e)}
      />
    </div>

    <div className="form-group">
      <label id="recipeName-label" for="file" className="CRlabel">Recipe Image</label>
      <input
      className="IBST"
        type="file"
        name="file"
        id="recipeImage"
        className="form-control"
        required
        onChange={uploadImage}
      />
    </div>

    <div className="form-group">
      <label id="cookTime-label" for="number" className="CRlabel"
        >Cook Time<span className="clue">(Minutes)</span></label
      >
      <input
      className="IBST"
        type="number"
        name="cookTime"
        id="cookTime"
        min="10"
        max="99"
        className="form-control"
        placeholder="0 min"
        onChange={(e) => onChangeInput(e)}
      />
    </div>

    <div className="form-group">
      <p>Category</p>
      <select id="dropdown" name="category" className="IBST" className="form-control" required onChange={(e) => onChangeInput(e)}>
        <option disabled selected value>Select recipe's category</option>
        <option value="breakfast">Breakfast</option>
        <option value="dessert">Dessert</option>
        <option value="appetizer">Appetizer</option>
        <option value="pastries">Pastries</option>
        <option value="salad">Salad</option>
        <option value="soups">Soups</option>
        <option value="drinks">Drinks</option>
        <option value="mainDish">Main dish</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="form-group">
      <p>Ingredients</p>
      <textarea
      className="IBST"
        id="ingredients"
        className="input-textarea"
        name="ingredients"
        placeholder="Enter Ingredients here..."
        onChange={(e) => onChangeInput(e)}
      ></textarea>
    </div>

    <div className="form-group">
      <p>Method</p>
      <textarea
      className="IBST"
        id="method"
        className="input-textarea"
        name="method"
        placeholder="Enter method here..."
        onChange={(e) => onChangeInput(e)}
      ></textarea>
    </div>

    <div className="form-group">
      <button type="submit" id="submit" className="IBST recipeBtn" className="submit-button" onClick={(e) => onSubmit(e)}>
        Submit
      </button>
      <br/>
      <Link to ="/profile"><button type="cancel" id="cancel"  className="IBST recipeBtn"className="cancel-button">
        Cancel
      </button></Link>
      
    </div>
  </form>
</div>

      
      </div>
    )
}
