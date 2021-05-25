import React from 'react'

import { Link } from "react-router-dom";

export default function OneCardRecipe(props) {
    return (

        <div className="col-md-4 col-sm-6 col-remove">
            <div className="widget-image has-shadow">
                <div className="contact-card-2">
                    <div className="cover-bg">
                        <img src={props.recipeImage} className="img-fluid" alt="..."/>
                    </div>
                    <div className="widget-body">

                        <h4 className="name"><a href="#">{props.recipeName}</a></h4>
                        <div className="job">{props.category}</div>
                        <div className="text-center pt-5 pb-3">
                        {props.notShow ? <>
                            <Link to ={`/viewRecipe/${props._id}`}>  <a className="btn btn-shadow">More Details </a> </Link>
                            </>:<>
                            {props.switchCard ?<>
                            <Link to ={`/editRecipe/${props._id}`}> <a className="btn btn-shadow">Edit</a> </Link>
                            <a   className="btn btn-shadow" onClick={()=> props.deleteRecipe(props._id)}>Delete</a>
                            </> :<>
                            <Link to ={`/viewRecipe/${props._id}`}>  <a className="btn btn-shadow">More Details </a> </Link>
                            <a   className="btn btn-shadow" onClick={()=> props.deleteFavRecipe(props._id)}>Remove</a>                           
                            </> }
                            </>}


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}




