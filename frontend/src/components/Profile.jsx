import React from 'react'

import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import FollowingsCard from './FollowingsCard';
import FollowersCard from './FollowersCard';
import OneCardRecipe from './OneCardRecipe';
import Swal from 'sweetalert2'
import API_URL from '../APIconfig';


export default function Profile(props) {

    const { following,followers,_id } = props.auth.currentUser;
    const [user , setUser] = useState({})
    const [changeUser , setChaneUser] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    let switchCard

    // to refresh data
      let userId=_id
      useEffect(() => {
      axios.get(`${API_URL}/api/user/profile/${userId}`)
      .then(res => {
        console.log(res.data)
        let data=Object.assign(res.data)
        setUser({data})
        
        setLoadingPage(true)
        
      })
    }, [changeUser])
    //console.log(user)

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


      //opentab2 function
      function openTab2(event,tabName) {
        var i, tabcontent2, tablinks2;
        tabcontent2 = document.getElementsByClassName("tab-pane fade");
        for (i = 0; i < tabcontent2.length; i++) {
          tabcontent2[i].style.display = "none";
        }
        tablinks2 = document.getElementsByClassName("list-group-item");
        for (i = 0; i < tablinks2.length; i++) {
          tablinks2[i].className = tablinks2[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";
      }


    //Edit profile
    const [editProfile, setEditProfile] = useState({})
    const onChange = ({ target: { name, value } }) => {
    setEditProfile({ ...editProfile, [name]: value, ["userImage"]: image });
    };


    const editingProfile = (event) => {
      
    event.preventDefault();
    
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    // console.log({...user,...editProfile})
    const {bio , name , userImage, password } = user.data
    editProfile.name = editProfile.name ? editProfile.name  : name
    editProfile.bio = editProfile.bio ? editProfile.bio  : bio
    editProfile.userImage = image ? image  : userImage
    editProfile.password = editProfile.password ? editProfile.password  : password

    axios
    .put(`${API_URL}/api/user/update/${userId}`, editProfile) 
    .then(res => {
    setChaneUser(pre => !pre)
    console.log(res.data.user)
    setEditProfile(editProfile)
    })
   .catch((err) => console.log(err));
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
   };

   // Delete recipe 
   const deleteRecipe =(recipeId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/api/recipe/${userId}/delete/${recipeId}`)
        .then(() => setChaneUser(pre => !pre)
        )
        .catch(err => console.log(err))
        Swal.fire(
          'Deleted!',
          'Your recipe has been deleted.',
          'success'
        )
      }
    })
}

   // Delete Fav recipe
   const deleteFavRecipe =(recipeId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/api/user/${userId}/fav/${recipeId}`)
        .then(() => setChaneUser(pre => !pre)
        )
        .catch(err => console.log(err))
        Swal.fire(
          'Removed!',
          'The recipe has been removed.',
          'success'
        )
      }
    })

}

//Unfollow
const unfollow =(userIdToFollow)=>{
  axios.post(`${API_URL}/api/user/unfollow` , {userIdToFollow: userIdToFollow ,  userId: userId })
  .then((data) => {
  setChaneUser(pre => !pre)
  console.log("Unfollowed",data);
  })
  .catch(err => console.log(err))
}

  //render
    return (
      <>{loadingPage && 

           //Followers map
           
           

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
              <Link to ="/addRecipe"> <a className="btn btn-success btn-sm">Add new recipe!</a></Link>
            </div>
          </div>
        </div>
        <hr className="m-0"/>
      
        <div className="container">
          <div className="text-center py-5">
          {loading ? <>
        <img src="" alt="Loading.." className="d-block ui-w-80"/>
         </> : <>
           {loadImage ? <>
            <img src={image}  className="ui-w-100 rounded-circle"/>
           </>:<>
            <img src={user.data.userImage}  className="ui-w-100 rounded-circle"/>
           </>}
         </>} 
      
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
          <li className="nav-item">
            <a className="nav-link py-4" href="#" onClick={(e) => openTab(e,'Favorites')}>Favorites</a>
          </li>
          <li className="nav-item">
            <a className="nav-link py-4" href="#" onClick={(e) => openTab(e,'Settings')}>Settings</a>
          </li>
          
        </ul>
        
        
{/* Recipes TAB */}
<div id="Recipes"  className="tabcontent">
<div className="container light-style flex-grow-1 container-p-y">
<br/>
<div className="container bootdey">
    <div className="row flex-row">

  {user.data.recipes.map((ele)=>{
    return <OneCardRecipe _id={ele._id} recipeName={ele.recipeName} recipeImage={ele.recipeImage} category={ele.category} method={ele.method} deleteRecipe={deleteRecipe} switchCard={switchCard=true}/>} )  } 

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
   {user.data.followers.map((ele,i)=>{return <FollowersCard key={i} _id={ele._id} userName={ele.userName} name={ele.name} userImage={ele.userImage} />})  } 
</div>
<div className="text-center p-3">
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
  {user.data.following.map((ele,i)=>{return <FollowingsCard  _id={ele._id} userName={ele.userName} name={ele.name} userImage={ele.userImage} unfollow={unfollow} />})  } 
</div>
<div className="text-center p-3">

</div></div></div>

  </div>
</div>

{/* Favorites TAB */}
<div id="Favorites" style={{display : "none"}} className="tabcontent">
<div className="container light-style flex-grow-1 container-p-y">
<br/>
<div className="container bootdey">
    <div className="row flex-row">

  {user.data.favoriteRecipes.map((ele)=>{
    return <OneCardRecipe _id={ele._id} recipeName={ele.recipeName} recipeImage={ele.recipeImage} category={ele.category} method={ele.method} deleteFavRecipe={deleteFavRecipe} switchCard={switchCard=false}/>} )  } 

  </div>
</div>
</div>
</div>


{/* Setting tab */}
<div id="Settings" style={{display : "none"}} className="tabcontent">
        <div className="container light-style flex-grow-1 container-p-y">

<h4 className="font-weight-bold py-3 mb-4">
  Account settings
</h4>

<div className="card overflow-hidden">
  <div className="row no-gutters row-bordered row-border-light">
    <div className="col-md-3 pt-0">
      <div className="list-group list-group-flush account-settings-links">
        <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general"onClick={(e) => openTab2(e,'account-general')} >General</a>
        <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password"onClick={(e) => openTab2(e,'account-change-password')}>Change password</a>
      </div>
    </div>

    
    <div className="col-md-9">
      <div className="tab-content">
      {/* General */}
        <div className="tab-pane fade active show" id="account-general">
          <div className="card-body media align-items-center">

         {loading ? <>
          <img src="" alt="Loading.." className="d-block ui-w-80"/>
         </> : <>
           {loadImage ? <>
            <img src={image} alt="" className="d-block ui-w-80"/>
           </>:<>
           <img src={user.data.userImage} alt="" className="d-block ui-w-80"/>
           </>}
         </>} 

            <div className="media-body ml-4">
              <label className="btn btn-outline-primary">
                Upload new photo
                <input type="file" className="account-settings-fileinput"
                name="file" onChange={uploadImage}/>
              </label> &nbsp;
              {/* <button type="button" className="btn btn-default md-btn-flat">Reset</button> */}

              <div className="text-light small mt-1">Allowed JPG, GIF or PNG.</div>
            </div>
          </div>
          <hr className="border-light m-0"/>

          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" readOnly className="form-control mb-1" value={user.data.userName}/>
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" 
              name="name"
              defaultValue={user.data.name}
              onChange={(e) => onChange(e)} 
              
              />
            </div>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input type="text" readOnly className="form-control mb-1" value={user.data.email}/>
              {/* <div className="alert alert-warning mt-3">
              Your email is not confirmed. Please check your inbox.<br/>
              <a href="javascript:void(0)">Resend confirmation</a>
              </div> */}
            </div>
              <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="form-control" rows="5"
              name="bio"
              
              onChange={(e) => onChange(e)}>{user.data.bio}</textarea>
            </div>
          </div>

        </div>

        {/* Change password */}
        <div className="tab-pane fade active show" id="account-change-password" style={{display : "none"}}>
          <div className="card-body pb-2">


            <div className="form-group">
              <label className="form-label">New password</label>
              <input type="password" className="form-control" name="password" onChange={(e) => onChange(e)}/>
            </div>

            <div className="form-group">
              <label className="form-label">Repeat new password</label>
              <input type="password" className="form-control"/>
            </div>

          </div>
        </div>



      </div>
    </div>
  </div>
</div>

<div className="text-right mt-3">
  <button type="button" className="btn btn-primary" onClick={(e) => editingProfile(e)}>Save changes</button>&nbsp;
  
</div>

</div>
       {/* end setting tab */}
</div>



      </div>
} 
</>
    )
}
