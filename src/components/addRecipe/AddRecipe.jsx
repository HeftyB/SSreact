import React, {useEffect, useState} from 'react';
import axios from "axios";
import Ingredient from "./Ingredient";
import Step from "./Step";
import RecipeTag from "./RecipeTag";
import TagModal from "./TagModal";

// Default objects
const initialRecipe = {
  title: "",
  description: "",
  url: "",
  imgUrl: "",
  totalTime: "",
  prepTime: "",
  cookTime: "",
  yields: "",
  feeds: "",
  ingredients: [],
  steps: [],
  tags: []
};

const inError = {
  title: false,
  description: false,
  tags: false,
  qty: false,
  ingredient: false,
  steps: false
};

export default function AddRecipe () {

  // Component state slices
  const [recipe, setRecipe] = useState(initialRecipe);
  const [tags, setTags] = useState([]);
  const [recipeTags, setRecipeTags] = useState([]);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(inError);

  // Get tags from server
  const getTags = () => {
    axios.get(`${process.env.REACT_APP_DOCKS}/tags`)
      .then(({data}) => {
        console.log("getting tags");
        setTags(data);
      })
      .catch(e => {
        debugger
      });
  };

  // Executes getTags() on components initial render
  useEffect(getTags, []);

  // Input handler for recipe state
  const handler = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  // Submit Recipe
  const submitRecipe = e => {
    let err = checkError();
    if (err) return;

    let s = recipe.steps.map((step, index) => {
      return {
        ...step,
        step_num: index + 1
      };
    });

    let r = {
      ...recipe,
      steps: s,
      tags: recipeTags
    };

    axios.post(`${process.env.REACT_APP_DOCKS}/recipes`, r)
      .then(data => {
        console.log(data);
        debugger
      })
      .catch(e => {
        debugger
      });
  };

  // Check for required fields
  const checkError = () => {
    setError(inError);
    let isError, title, des, tags, steps, ingr = false;

    if (recipe.title.length === 0) {
      title = true;
      isError = true;
    }

    if (recipe.description.length === 0) {
      des = true;
      isError = true;
    }

    if (recipe.tags.length === 0) {
      tags = true;
      isError = true;
    }

    if (recipe.ingredients.length === 0) {
      ingr = true;
      isError = true;
    }

    if (recipe.steps.length === 0) {
      steps = true;
      isError = true;
    }

    setError({
      ...error,
      title: title,
      description: des,
      tags: tags,
      ingredient: ingr,
      steps: steps
    });
    return isError;

  };

  return (
    <div className="bg-color4 w-10/12 mx-auto h-full">
      <TagModal active={active} setActive={setActive} getTags={getTags}/>
      <div className="text-3xl text-center font-bold">Add Recipe</div>
      <div className="w-8/12 bg-color3 mx-auto">
        <section>
          <div className="flex justify-around p-4">
            <label htmlFor="title" className="w-2/5 text-lg font-bold">Recipe Name: <span
              className="text-red-600">*</span></label>
            <input type="text" id="title" name="title" value={recipe.title} onChange={handler}
                   className={error.title ? "w-3/5 border-red-600 border-2" : "w-3/5"}/>
          </div>
          <p className={error.title ? "text-red-600 text-center text-xs italic mb-2" : "hidden"}>***
            TITLE is required! ***</p>

          <div className="flex justify-around p-4">
            <label htmlFor="description" className="w-2/5 text-lg font-bold">Recipe Description: <span
              className="text-red-600">*</span></label>
            <input type="text" id="description" name="description" value={recipe.description}
                   onChange={handler}
                   className={error.description ? "w-3/5 border-red-600 border-2" : "w-3/5"}/>
          </div>
          <p className={error.description ? "text-red-600 text-center text-xs italic mb-2" : "hidden"}>***
            DESCRIPTION is required! ***</p>

          <div className="flex justify-around p-4">
            <label htmlFor="url" className="w-2/5 text-lg font-bold">Recipe URL: </label>
            <input type="text" id="url" name="url" value={recipe.url} onChange={handler} className="w-3/5"/>
          </div>





          <div className="flex justify-around p-4">
            <label htmlFor="imgUrl" className="w-2/5 text-lg font-bold"> Recipe Photo: </label>
            <input type="text" id="imgUrl" name="imgUrl" value={recipe.imgUrl} onChange={handler} className="w-3/5"/>
          </div>
          <div className="flex justify-around p-4">
            <div className="flex justify-around p-4">
              <label htmlFor="cookTime" className="w-2/5 text-lg font-bold">Cook Time: </label>
              <input type="text" id="cookTime" name="cookTime" value={recipe.cookTime} onChange={handler} className="w-3/5"/>
            </div>
            <div className="flex justify-around p-4">
              <label htmlFor="prepTime" className="w-2/5 text-lg font-bold">Prep Time: </label>
              <input type="text" id="prepTime" name="prepTime" value={recipe.prepTime} onChange={handler} className="w-3/5"/>
            </div>
          </div>
          <div className="flex justify-around p-4">
            <label htmlFor="totalTime" className="w-2/5 text-lg font-bold">Total Time: </label>
            <input type="text" id="totalTime" name="totalTime" value={recipe.totalTime} onChange={handler} className="w-3/5"/>
          </div>
          <div className="flex justify-around p-4">
            <div className="flex justify-around p-4">
              <label htmlFor="yields" className="w-2/5 text-lg font-bold">Yields: </label>
              <input type="text" id="yields" name="yields" value={recipe.yields} onChange={handler} className="w-3/5"/>
            </div>
            <div className="flex justify-around p-4">
              <label htmlFor="feeds" className="w-2/5 text-lg font-bold">Feeds: </label>
              <input type="text" id="feeds" name="feeds" value={recipe.feeds} onChange={handler} className="w-3/5"/>
            </div>

          </div>






        </section>
        <RecipeTag tags={tags} recipeTags={recipeTags} setRecipeTags={setRecipeTags} active={active} setActive={setActive} error={error}/>
        <Ingredient recipe={recipe} setRecipe={setRecipe} error={error} setError={setError}/>
        <hr/>
        <hr/>
        <Step recipe={recipe} setRecipe={setRecipe} error={error} setError={setError}/>
        <div
          className="bg-green-400 border-black border-dotted text-xl text-center font-bold cursor-pointer"
          onClick={submitRecipe}>
          SUBMIT RECIPE
        </div>
      </div>
    </div>
  );
}

