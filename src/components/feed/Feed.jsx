import React, {useEffect, useState} from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

export default function Feed () {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOCKS}/recipes`)
      .then(({data}) => {
        // **pagination**
        // const {has_more} = data;
        setRecipes(data.data);
      })
      .catch(e => {
        debugger
      });
  }, []);

  return (
    <div className="w-8/12 min-h-screen mx-auto bg-color4">
      <p className="text-center text-2xl">All Recipes:</p>
      <hr className="mt-4 mb-8"/>
      {recipes.map((recipe, index) => {
        const {recipe_id, title, description, url, created_at} = recipe;
        return <RecipeCard key={index} id={recipe_id} title={title} description={description} url={url}
                           created={created_at}/>;
      })}
    </div>
  );
}
