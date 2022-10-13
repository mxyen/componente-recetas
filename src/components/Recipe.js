import React,{useState} from 'react'
import RecipeDetails from './RecipeDetails'

const Recipe = ({recipe}) => {
    const [show, setShow] = useState(false)
    const{label, image, url, ingredients} = recipe.recipe;
    //this for getting the information we need and to look cute :3
    return (
        <div className='recipe'>
            <h2>{label}</h2>
            <img src={image} alt={label}/>
            <a href={url} target="_blank" rel='noopener noreferrer' align = "center">
                <br/> URL 
            </a>
            <br/>
            <button onClick={() => setShow(!show)}>Ingredientes</button>
            {show &&  <RecipeDetails ingredients = {ingredients}/>}

        </div>
    );
};

export default Recipe
