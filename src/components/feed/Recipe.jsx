import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function Recipe () {
  const {id} = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOCKS}/recipes/${id}`)
      .then(({data}) => {
        setRecipe(data);
      })
      .catch(e => {
        debugger
      });
  }, [id]);

  return (
    <div className="bg-color4 min-h-screen w-9/12 mx-auto p-8">
      {recipe ?
        <div className="">
          <p className="text-center text-6xl">{recipe.title}</p>

          <p className="m-4">{recipe.description}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad aliquam amet aperiam beatae distinctio dolore doloribus ducimus fuga illum laudantium modi mollitia nam nobis officiis pariatur, perspiciatis porro quas quasi qui rem totam ullam veniam. Alias error qui quo sed sequi! Dolore, dolores ea eveniet explicabo fugiat hic illum laboriosam laudantium maiores, minima molestias mollitia nam nobis, non obcaecati quia quisquam quod recusandae reiciendis rem sed sequi soluta sunt tempore ut veritatis vero. Accusamus at aut ducimus error excepturi hic ipsam iure magnam maxime minima nesciunt numquam pariatur perspiciatis possimus provident, quam quasi, quisquam sit sunt vel vero voluptatem!
          </p>

          <div className="flex justify-between">
            <p className="text-sm">uploaded 3 years ago</p>
            <p className="text-lg">By author</p>
            <p className="">{recipe.url}</p>
          </div>
          <hr className="m-8"/>
          <div className="flex m-4">
            <div className="border border-black w-4/12 bg-white">
              <p className="text-2xl text-center">Ingredients:</p>
              <ul className="list-disc list-inside p-4">
                {recipe.ingredients.map((i, index) => {
                  return (
                    <li key={index} className="">{i.qty} &nbsp; {i.ingredient}</li>
                  );
                })}
              </ul>
            </div>
            <p className="italic w-8/12 p-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis dicta inventore modi nulla sit. Ad aut, autem doloremque doloribus est fugit ipsa laboriosam nulla placeat, possimus quam temporibus unde velit! Accusamus dolore dolores, eligendi error, expedita fugit laborum libero non obcaecati odio praesentium repellendus, soluta tempore. Consectetur cumque distinctio doloribus eligendi enim eum ex facere facilis fugit harum id laboriosam, laborum molestias nam nostrum nulla numquam officia porro repudiandae tempora veniam veritatis vero? Alias, provident.
            </p>
          </div>

          <div className="w-10/12 mx-auto border-black border-l border-r">
            <p className="text-center text-2xl">Recipe Steps:</p>
            <ol className="list-decimal list-inside p-4">
              {recipe.steps.map((s, index) => {
                return (
                  <li key={index} className="my-4 text-base bg-white">{s.step}:</li>
                );
              })}
            </ol>
          </div>
        </div> :
        // loading spinner/
        <div className="min-h-screen flex justify-around">
          <button type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed"
                  disabled>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ...LOADING
          </button>
        </div>
      }
    </div>
  );
}
