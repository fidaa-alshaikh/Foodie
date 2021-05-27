import React from 'react'
import axios from "axios";
import {useEffect, useState } from "react";
import {useParams,useHistory,Link} from 'react-router-dom';

import FollowingsCard from './FollowingsCard';
import FollowersCard from './FollowersCard';
import OneCardRecipe from './OneCardRecipe';
import API_URL from '../APIconfig';

export default function OneUser(props) {
const [user , setUser] = useState({})
const [switchTF , setSwitchTF] = useState(false)
const {_id} = useParams()
const [changeUser , setChaneUser] = useState(false)
const [loadingPage, setLoadingPage] = useState(false)
let notShow

//console.log("recipe :",user)

useEffect(() => {
axios.get(`${API_URL}/api/user/profile/${_id}`)   
 .then(res =>{  
  console.log("one user",res.data) 
  let data=Object.assign(res.data)
  setUser({data})
  setLoadingPage(true)
  })
}, [changeUser], )

//Follow 
const follow = () =>{
  let userId = props.auth.currentUser._id;
    axios.post(`${API_URL}/api/user/follow` , {userIdToFollow: _id ,  userId: userId })
    .then(data =>{
      setChaneUser(pre => !pre)
      console.log("followed",data);
        // data.favoriteProduct
       // localStorage[_id] = JSON.stringify(data.data.favoriteProducts)
       setSwitchTF(true)
    }) .catch(err => console.log(err))
  }
  
//Unfollow
   const Unfollow =()=>{
    let userId = props.auth.currentUser._id;
    axios.post(`${API_URL}/api/user/unfollow`, {userIdToFollow: _id ,  userId: userId })
    .then((data) => {
    setChaneUser(pre => !pre)
    console.log("Unfollowed",data);
    setSwitchTF(false)
    })
    .catch(err => console.log(err))
}

 //opentab function
 function openTab(event,tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("nav-link py-4");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
  
}



    return (
   
<>{loadingPage && 

<div className="bg-white">
<br/><br/><br/>
<div className="container">
 <div className="d-flex justify-content-between align-items-center py-4">
   <div>
     <a href="#" className="d-inline-block text-dark">
       <strong>{user.data.recipes.length}</strong>
       <span className="text-muted"> Recipes</span>
     </a>
     <a href="#" className="d-inline-block text-dark ml-3">
       <strong>{user.data.followers.length}</strong>
       <span className="text-muted"> Followers</span>
     </a>
     <a href="#" className="d-inline-block text-dark ml-3">
       <strong>{user.data.following.length}</strong>
       <span className="text-muted"> Following</span>
     </a>
   </div>
   <div>
            {!props.isLoggedIn ? <> 

             </> : <>
            {switchTF? 
             <a className="btn btn-danger btn-sm" onClick={()=> Unfollow()}>UnFollow!</a>
            :
            <a className="btn btn-success btn-sm" onClick={()=> follow()}>Follow!</a>
            } </>}

   </div>
 </div>
</div>
<hr className="m-0"/>

<div className="container">
 <div className="text-center py-5">
   <img src={user.data.userImage}  className="ui-w-100 rounded-circle"/>


   <div className="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto">
     <h4 className="font-weight-bold my-4">{user.data.name}</h4>
     <p className="my-4">@{user.data.userName}</p>

     <div className="text-muted mb-4">
       {user.data.bio}
     </div>
   </div>

 </div>
</div>
<hr className="m-0"/>

<ul className="nav nav-tabs tabs-alt justify-content-center">
 <li className="nav-item">
   <a className="nav-link py-4 active" href="#" onClick={(e) => openTab(e,'Recipes')}  >Recipes</a>
 
 </li>
 <li className="nav-item">
   <a className="nav-link py-4"   href="#" onClick={(e) => openTab(e,'Followers')}>Followers</a>
 </li>
 <li className="nav-item">
   <a className="nav-link py-4" href="#" onClick={(e) => openTab(e,'Following')}>Following</a>
 </li>
 
</ul>


{/* Recipes TAB */}
<div id="Recipes"  className="tabcontent">
<div className="container light-style flex-grow-1 container-p-y">
<br/>
<div className="container bootdey">
<div className="row flex-row">

{user.data.recipes.map((ele)=>{
return <OneCardRecipe _id={ele._id} recipeName={ele.recipeName} recipeImage={ele.recipeImage} category={ele.category} method={ele.method} notShow={notShow=true}/>} )  } 

</div>
</div>
</div>


</div>

{/* FOLLOWERS TAB */}
<div id="Followers"  style={{display : "none"}} className="tabcontent">
<div className="container light-style flex-grow-1 container-p-y">
<br/>

<div className="row">
<div className="col-xl-12">
<div className="list-group">
{user.data.followers.map((ele,i)=>{return <FollowersCard key={i} _id={ele._id} userName={ele.userName} name={ele.name} userImage={ele.userImage} notShow={notShow=true}/>})  } 
</div>
<div className="text-center p-3">
<a href="#" className="text-dark text-decoration-none">Show more <b className="caret"></b></a>
</div></div></div>

</div>
</div>

{/* FOLLOWING TAB */}
<div id="Following"  style={{display : "none"}} className="tabcontent">
<div className="container light-style flex-grow-1 container-p-y">
<br/>

<div className="row">
<div className="col-xl-12">
<div className="list-group">
{user.data.following.map((ele,i)=>{return <FollowingsCard  _id={ele._id} userName={ele.userName} name={ele.name} userImage={ele.userImage} notShow={notShow=true}/>}) } 
</div>
<div className="text-center p-3">
<a href="#" className="text-dark text-decoration-none">Show more <b className="caret"></b></a>
</div></div></div>

</div>
</div>



</div>
} 
</>
    )
}
