import React from 'react'
import { Link } from "react-router-dom";
export default function CardAllRecipe(props) {
    return (
        <>
        <div className="col-md-4 col-sm-6 col-remove">
       <div className="widget-image has-shadow">
           <div className="contact-card-2">
               <div className="cover-bg">

                   <img src={props.recipeImage} className="img-fluid" alt="..."/>
               </div>
               <div className="widget-body">
 
                   <h4 className="name"><a href="#">{props.recipeName}</a></h4>
                   <div className="job">{props.category}</div>
                   <div className="job">By {props.userName}</div>
                   <div className="text-center pt-5 pb-3">

                   <Link to ={`/viewRecipe/${props._id}`}>  <a href="#" className="btn btn-shadow">More Details </a> </Link>
                      
                       {/* <a href="#" className="btn btn-shadow">Message</a> */}
                   </div>
               </div>
           </div>
       </div>
   </div>
   <br/><br/>
   </>
   
    )
}
