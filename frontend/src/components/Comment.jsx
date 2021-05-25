import React from 'react'

export default function Comment(props) {
    return (
        <div>
    <div class="media-block pad-all">
      <a class="media-left" href="#"><img class="img-circle img-sm" alt="Profile Picture" src="https://t3.ftcdn.net/jpg/04/10/65/76/360_F_410657632_VgcV9gaH9AzGuMZgsEtsmkuLaeuiaBsw.jpg"/></a>
      <div class="media-body">
        <div class="mar-btm">
          <a href="#" class="btn-link text-semibold media-heading box-inline">{props.userName}</a>
          <p class="text-muted text-sm"><i class="fa fa-clock-o fa-lg"></i> {props.createdAt}</p>
        </div>
        <p>{props.comment}</p>
        {props.reviewImage==""?
        ""
           : 
        <img class="img-responsive thumbnail" src={props.reviewImage} alt="Image" width="300px" height="300px"/>}

        <hr/>


      </div>
    </div>
        </div>
    )
}
