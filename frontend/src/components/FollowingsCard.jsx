import React from 'react'
import { Link } from "react-router-dom";
export default function FollowingsCard(props) {
    return (
<div>

                                    <div className="list-group-item d-flex align-items-center">
                                        <img src={props.userImage} alt="" width="50px" className="rounded-sm ml-n2" />
                                        <div className="flex-fill pl-3 pr-3">
                                        <Link to ={`/oneUser/${props._id}`}><a href="#" className="text-dark font-weight-600">{props.name}</a> </Link>
                                            <div></div>
                                            <div className="text-muted fs-13px">@{props.userName}</div>
                                        </div>
                                        {props.notShow?
                                        <></>
                                        
                                        :
                                        <button type="button" className="btn btn-sm btn-danger pull-right" onClick={()=> props.unfollow(props._id)}><i className="fa fa-close-round"></i> Unfollow</button>}

                                    </div>


                                </div>
                                



    )
}
