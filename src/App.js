import Reactm,{useState} from 'react'
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import "./App.css";
import Recipe from './components/Recipe';
import Alert from './components/Alert';

const App = () => {
    const [query, setQuery] = useState("");
    //new state for recipes
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");

    const APP_ID = "61df6f4d";
    const APP_KEY = "618243147694979521a0c73455011558"; 
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    //create a function for using axios jiji, making a request
    const getData = async () =>{
        if(query !== ""){
            const result = await Axios.get(url);
            //necesito saber cuando alguien mete algo que no existe en la api
            //yyy pa eso pues investigue q en la consola hay una propiedad de 
            //data: more: false, que significa que ese dato no existe.
            //i need to update the value of recipes in the state
            if(!result.data.more){
                return setAlert('No hay comida con ese nombre');
            }
            setRecipes(result.data.hits);    
            console.log(result);
            //aqui es para que la alerta se vaya si esq ya queremos buscar algo
            setAlert("");
            setQuery("");          
        } else{
            setAlert('Por favor escribe algo, si no como buscamos (・_・;)')
        }
       
    };

    const onChange = (e) =>{
        setQuery(e.target.value);
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        getData();
    };

  return (
    <div className='App'>
        <h1>Recetas de comida</h1>     
        <form className='search-form' onSubmit={onSubmit}>
            {alert !== "" && <Alert alert={alert} />}
            <input type="text" placeholder="Escribe alguna comida o postre" autocomplete="off" onChange = {onChange} value={query}/>
            <input type="submit" value="Buscar"/>
        </form>
        <div className='recipes'>
            {recipes !== [] && recipes.map(recipe => 
                <Recipe key={uuidv4()} recipe = {recipe}/>)}

        </div>
    </div>
  );
};

export default App
