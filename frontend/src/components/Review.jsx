import React from 'react'
import Comment from "./Comment"

export default function Review(props) {

  

    const allReviews = props.recipes.reviews.slice(0).reverse().map((ele,i)=>{
        return <Comment key={i} _id={ele._id} comment={ele.comment} reviewImage={ele.reviewImage} createdAt={ele.createdAt } />
    })  

    return (
        <div>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
<div class="container bootdey">
<div class="col-md-12 bootstrap snippets">
<div class="panel">
  <div class="panel-body">
    <textarea class="form-control" rows="2" placeholder="Add comment.." name="comment" onChange={(e) => props.onChangeInput(e)}></textarea>
    <div class="mar-top clearfix">
      <button class="btn btn-sm btn-primary pull-right" type="submit" onClick={(e) => props.onSubmit(e)}><i class="fa fa-pencil fa-fw"></i> Share</button>
      
      <a class="btn btn-trans btn-icon fa fa-camera add-tooltip" href="#" >
          <input type="file" name="file" onChange={props.uploadImage}/></a>
    </div>
  </div>
</div>
<div class="panel">
    <div class="panel-body">
 
{allReviews}
  </div>
</div>
</div>
</div>
        </div>
        
    )
}
