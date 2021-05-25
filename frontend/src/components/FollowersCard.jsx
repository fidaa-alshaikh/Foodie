import React from 'react'
import { Link } from "react-router-dom";
export default function FollowersCard(props) {
    return (
<div>

<div className="list-group-item d-flex align-items-center">
  <img src={props.userImage} alt="" width="50px" className="rounded-sm ml-n2" />
<div className="flex-fill pl-3 pr-3">


 <div className="text-dark font-weight-600">{props.name}</div>

<div className="text-muted fs-13px"><Link to ={`/oneUser/${props._id}`}>
    <a href="#" >@{props.userName}</a> </Link></div>
</div>
</div>


</div>

    )
}
