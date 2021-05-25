import React from 'react'

import { useEffect, useState } from "react";
import axios from 'axios'
import {useParams,useHistory} from 'react-router-dom';
import API_URL from '../APIconfig';

export default function EditRecipe() {
 const history = useHistory();

 // upload Image 
 const [image, setImage] = useState('')
 const [loading, setLoading] = useState(false)
 const [loadImage, setLoadImage] = useState(false)

 const uploadImage = async e => {
   const files = e.target.files
   const data = new FormData()
   data.append('file', files[0])
   data.append('upload_preset', 'foodie')
   setLoading(true)
   const res = await fetch(
     '	https://api.cloudinary.com/v1_1/drtd6zi1g/image/upload',
     {
       method: 'POST',
       body: data
     }
   )
   const file = await res.json()

   setImage(file.secure_url)
   setLoading(false)
   setLoadImage(true)
 }

   // end image

   //Edit recipe
   const [editRecipe, setEditRecipe] = useState({})
   const onChangeInput = ({ target: { name, value } }) => {
   setEditRecipe({ ...editRecipe, [name]: value, ["recipeImage"]: image });
   };
   const {_id} = useParams()
   const editingRecipe = (event) => {
   event.preventDefault();
   
  // console.log(image)
   
  // console.log(editRecipe)

   axios
   .put(`${API_URL}/api/recipe/update/${_id}`, editRecipe) 
   .then(res => {
   //setChaneUser(pre => !pre)
   console.log("edited")
   console.log(res.data.recipe)
   setEditRecipe(editRecipe)
   history.push("/profile");
   })
  .catch((err) => console.log(err));
  };

    return (
<div>
<div class="container">
  <header class="header">
    <h1 id="title" class="text-center">Edit your Recipe</h1>
    <p id="description" class="description text-center">
    .
    </p>
  </header>
  <form id="survey-form">
    <div class="form-group">
      <label id="recipeName-label" for="name">Recipe Name</label>
      <input
        type="text"
        name="recipeName"
        id="recipeName"
        class="form-control"
        //value={}
        required
        onChange={(e) => onChangeInput(e)}
      />
    </div>

    <div class="form-group">
      <label id="recipeName-label" for="file">Recipe Image</label>
      <input
        type="file"
        name="file"
        id="recipeImage"
        class="form-control"
        required
        onChange={uploadImage}
      />
    </div>

    <div class="form-group">
      <label id="cookTime-label" for="number"
        >Cook Time<span class="clue">(Minutes)</span></label
      >
      <input
        type="number"
        name="cookTime"
        id="cookTime"
        min="10"
        max="99"
        class="form-control"
        //value={}
        onChange={(e) => onChangeInput(e)}
      />
    </div>

    <div class="form-group">
      <p>Category</p>
      <select id="dropdown" name="category" class="form-control" required onChange={(e) => onChangeInput(e)}>
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

    <div class="form-group">
      <p>Ingredients</p>
      <textarea
        id="ingredients"
        class="input-textarea"
        name="ingredients"
        //value={}
        onChange={(e) => onChangeInput(e)}
      ></textarea>
    </div>

    <div class="form-group">
      <p>Method</p>
      <textarea
        id="method"
        class="input-textarea"
        name="method"
        //value=""
        onChange={(e) => onChangeInput(e)}
      ></textarea>
    </div>

    <div class="form-group">
      <button type="submit" id="submit" class="submit-button" onClick={(e) => editingRecipe(e)}>
        Submit
      </button>
      <br/>
      <button type="cancel" id="cancel" class="cancel-button">
        Cancel
      </button>
    </div>
  </form>
</div>

      
      </div>
    )
}
