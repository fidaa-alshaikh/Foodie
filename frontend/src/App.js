import { Profiler, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import CreateRecipe from "./components/CreateRecipe";
import EditRecipe from "./components/EditRecipe";
import ShowOneRecipe from "./components/ShowOneRecipe";
import OneUser from "./components/OneUser";

import "./styles/addRecipe.css"
import "./styles/footer.css"
//import "./styles/search.css"
import "./styles/home.css"
import "./styles/recipeCard.css"
import "./styles/review.css"
import "./styles/signup.css"
import "./styles/profile.css"
import API_URL from "./APIconfig";


//import './App.css';


function App() {
  // const [selectMovie, setSelectMovie] = useState({});
  const [dataLoading, setDataloading] = useState(false)
  
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });

  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
    console.log("The current User is: ", auth.currentUser);
  };

  useEffect(userLogin, []);

// get recipe
const [recipes , setRecipes] = useState([])
const [types , setTypes] = useState([])
const [selectRecipe , setSelectRecipe] = useState([])
//console.log("recipe :",recipes)

useEffect(() => {
axios.get(`${API_URL}/api/recipe`)   
 .then(res =>{  
  console.log("recipe data",res.data)   
  setRecipes(res.data)
  setSelectRecipe(res.data)
  let categories = res.data.map(ele => ele.category ) // add types base on the movies
  categories.unshift('All') // add the All select top of the selects 
  setTypes(Array.from(new Set(categories))) // to make the array uniqe and non duplicate the elements
  
   })
}, [])

  return (
    <>
    { dataLoading &&
    <Router>
      <NavBar isLoggedIn={auth.isLoggedIn}
              loginCallback={userLogin}/>

      <Switch>

        <Route exact path='/'>
          <Home recipes={recipes} types={types} setSelectRecipe={setSelectRecipe} selectRecipe={selectRecipe} />
          <Footer/>
        </Route>

        <Route exact path='/viewRecipe/:_id'>
          <ShowOneRecipe auth = {auth} isLoggedIn={auth.isLoggedIn}
              loginCallback={userLogin}/>
              <Footer/>
        </Route>

        <Route exact path='/oneUser/:_id'>
          <OneUser auth = {auth} isLoggedIn={auth.isLoggedIn}/>
          <Footer/>
        </Route>
        

        {auth.isLoggedIn ? <>

        <Route exact path='/profile'>
          <Profile setAuth={setAuth}
        auth = {auth} dataLoading={dataLoading}/>
        <Footer/>
        </Route>

        <Route exact path='/addRecipe'>
          <CreateRecipe setAuth={setAuth}
        auth = {auth} />
        <Footer/>
        </Route>

        <Route exact path='/editRecipe/:_id'>
          <EditRecipe setAuth={setAuth}
        auth = {auth} />
        <Footer/>
        </Route>


</> : <>
        <Route exact path='/signup'>
          <SignUp loginCallback={userLogin}/>
        </Route>

        <Route exact path='/signin'>
          <SignIn loginCallback={userLogin}/>
        </Route>
</>
        }

        <Route path="*">
          <h1>Page not found</h1>

        </Route>

      </Switch>
      
    </Router>
    }
    </>
  );
  
}

export default App;
