import React from 'react'
import { useHistory, Link } from "react-router-dom";
export default function FollowersCard(props) {
    const history = useHistory();
    return (
<div>
<div className="list-group-item d-flex align-items-center">
  <img src={props.userImage} alt="" width="50px" className="rounded-sm ml-n2" />
<div className="flex-fill pl-3 pr-3">


 <div className="text-dark font-weight-600">{props.name}</div>

<div className="text-muted fs-13px">
    <a onClick={() => history.push(`/oneUser/${props._id}`)} href="" >@{props.userName}</a></div>
</div>
</div>


</div>

    )
}
