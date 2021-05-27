import React from 'react'
import {  useHistory,Link } from "react-router-dom";
export default function FollowingsCard(props) {
    const history = useHistory();
    return (
<div>
    

     <div className="list-group-item d-flex align-items-center">
         <img src={props.userImage} alt="" width="50px" className="rounded-sm ml-n2" />
         <div className="flex-fill pl-3 pr-3">
         <div className="text-dark font-weight-600">{props.name}</div>
                                        
        <div></div>
        <a onClick={() => history.push(`/oneUser/${props._id}`)} href="" >@{props.userName}</a>
        </div>
        {props.notShow?
        <></>                        
        :
        <button type="button" className="btn btn-sm btn-danger pull-right" onClick={()=> props.unfollow(props._id)}><i className="fa fa-close-round"></i> Unfollow</button>}

         </div>

        </div>

    )
}
