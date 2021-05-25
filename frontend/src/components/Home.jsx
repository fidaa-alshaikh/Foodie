import React from 'react'

import jQuery from 'jquery'
import CardAllRecipe from './CardAllRecipe';



export default function Home(props) {


    const allRecipe = props.selectRecipe.map((ele,i)=>{
        return <CardAllRecipe key={i} _id={ele._id} recipeName={ele.recipeName} recipeImage={ele.recipeImage} category={ele.category} method={ele.method} userName={ele.user.userName}/>
    })  

    // to add the selects  type
let allSelect = props.types.map(ele => <option value={ele}>{ele}</option>)

// function to filtet the movie by the type 
const onChangeHandler = (e) =>{
    let value = e.target.value
    if (value == "All") { // if the select all show all the movies 
        props.setSelectRecipe(props.recipes)
    }else { // if not show only the movie type amd we use filter method ! 
        props.setSelectRecipe(props.recipes.filter(ele => ele.category == value))
    }

}

    return (
        <>
        <div>
            <header className="header-area overlay">
    
	
	<div className="banner">
		<div className="container">
			<h1>Foodie Website</h1>
			<p>Food that you can't resist</p>
		</div>
	</div>
</header>

<main>
	<section id="content" className="content">
        {/* <h1>SEARCH</h1> */}
     <div className="filterBox">  
     <h2>Filter Recipe by Category: </h2>
<select name="recipes" id="recipes" className="IBST" onChange ={onChangeHandler}>
{allSelect}
</select>
</div> 
<br/>
		
{/* <div className="container light-style flex-grow-1 container-p-y"> */}
    <div className="container bootdey flex">
        <div className="row flex-row">
            {allRecipe}
            
        </div>
    </div>
{/* </div> */}
		


        
	</section>
</main>

        </div>
        </>
    )
}
