import React from 'react'
import axios from "axios";
import {useEffect, useState } from "react";
import {useParams,useHistory,Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import Review from "./Review"
import API_URL from '../APIconfig';


export default function ShowOneRecipe(props) {

    // get recipe
const [recipes , setRecipes] = useState([])
const {_id} = useParams()
const [loadingPage, setLoadingPage] = useState(false)

const [changeUser , setChaneUser] = useState(false)
//console.log("recipe :",recipes)

useEffect(() => {
axios.get(`${API_URL}/api/recipe/view/${_id}`)   
 .then(res =>{  
  console.log("one",res.data)   
  setRecipes(res.data)

  setLoadingPage(true)
  
   })
}, [changeUser])

 //add favorite recipe
 const addRecipetoFavorite = () =>{
  let userId = props.auth.currentUser._id;
    Swal.fire('Saved!', 'saved to your favorite list', 'success')
    axios.post(`${API_URL}/api/user/favorite` , {recipeId: _id ,  userId: userId })
    .then(data =>{
      console.log("the fav data",data);
        // data.favoriteProduct
       // localStorage[_id] = JSON.stringify(data.data.favoriteProducts)
    })
  } 

  //Add Review
  const [review, setReview] = useState({}); // review info

  //to add the input inside review
  const onChangeInput = ({ target: { name, value } }) => {
    let userId = props.auth.currentUser._id;
    setReview({ ...review, [name]: value ,["userId"]: userId,["recipeId"]: _id, ["reviewImage"]: image});
  };
  // to add the review info to database
  const onSubmit = (event) => {

     //if(props.isLoggedIn)
    event.preventDefault();
    
    axios
      .post(`${API_URL}/api/review/addReview`, review)
      .then((res) => {
        const review = res.data.reviews;
        console.log("res",res.data.reviews)
          console.log("review added to DB ")
          //history.push("/profile");
          setChaneUser(pre => !pre)

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
        <>{loadingPage && 
          <div>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            
            <br/><br/><br/>

          
  <div className="w3-center w3-margin w3-padding-large">
     
    <div className="w3-container w3-white w3-margin w3-padding-large">
      <div className="w3-center">
        <h3><strong>{recipes.recipeName}</strong></h3>
        <h5>{recipes.category}, <span className="w3-opacity"><Link to ={`/oneUser/${recipes.user._id}`}> <a>By {recipes.user.name}</a> </Link></span></h5>
      </div>

      <div className="w3-justify">
        <img src={recipes.recipeImage} alt="Girl Hat" style={{width:"100%"}} className="w3-padding-16"/>
        <p><strong>Cook time: {recipes.cookTime} min</strong></p>
        <label><h3><strong>Ingredients:</strong></h3></label><p>{recipes.ingredients}</p>
        <label><h3><strong>Method:</strong></h3></label><p>{recipes.method}</p>
        
        <p className="w3-left"><button className="w3-button w3-white w3-border" onclick="likeFunction(this)" onClick={()=> addRecipetoFavorite()}><b><i className="fa fa-thumbs-up"></i> Save</b></button></p>

        <p className="w3-right"><button className="w3-button w3-black"  id="myBtn"><b>Print</b> </button></p>
        <p className="w3-clear"></p>
      </div>
    </div>
    <hr/>


  </div>






            <br/>


            <Review recipes={recipes} onChangeInput={onChangeInput} uploadImage={uploadImage} onSubmit={onSubmit}/>
        </div>


}</>

    )
}
