import React, { useState } from 'react';

const initialRecipe = {
    title : "", 
    description : "",
    url: "",
    ingredients: [],
    steps: [],
    tags: []
}

const initialStep = {
  stepNum: "",
  step: ""
}

const initialIngredient = {
  ingredient: "",
  qty: ""
}

export default function AddRecipe (props) {

    const [ recipe, setRecipe ] = useState(initialRecipe);
    const [ ingredient, setIngredient ] = useState(initialIngredient);
    const [ step, setStep ] = useState(initialStep);

    const handler = e => {
        setRecipe({
            ...recipe, 
            [e.target.name]: e.target.value
        });
    };

    const ingredientHandler = e => {
      setIngredient({
        ...ingredient,
        [e.target.name]: e.target.value
      });
    };

    const ingredientAdder = e => {
      setRecipe({ingredients: ["test bitch"]});
      // setRecipe({
      //   ...recipe,
      //   ingredients: x
      // });

      // setIngredient(initialIngredient);
    };

    const stepHandler = e => {
      setStep({
        ...step,
        [e.target.name]: e.target.value
      });
    };

    const stepAdder = e => {
      setRecipe({
        ...recipe,
        steps: [...recipe.steps, step]
      });

      setStep(initialStep);
    };

    const delIngredient = index => {
      let x = [...recipe.ingredients];

      x.splice(index, 1);
      setRecipe({
        ...recipe,
        ingredients: x
      });
    };

    const delStep = index => {
      let x = [...recipe.steps];

      x.splice(index, 1);
      setRecipe({
        ...recipe,
        steps: x
      });
    };

    return (
        <div className="bg-color4 w-10/12 mx-auto h-full">
          <div className="text-3xl text-center font-bold">Add Recipe</div>
            <div className="w-8/12 bg-color3 mx-auto">
                <div className="flex justify-around p-4">
                    <label htmlFor="title" className="w-2/5 text-lg font-bold">Recipe Name: </label>
                    <input type="text" id="title" name="title" value={recipe.title} onChange={handler} className="w-3/5"/>
                </div>

                <div className="flex justify-around p-4">
                    <label htmlFor="description" className="w-2/5 text-lg font-bold">Recipe Description: </label>
                    <input type="text" id="description" name="description" value={recipe.description} onChange={handler} className="w-3/5"/>
                </div>

                <div className="flex justify-around p-4">
                    <label htmlFor="url" className="w-2/5 text-lg font-bold">Recipe URL: </label>
                    <input type="text" id="url" name="url" value={recipe.url} onChange={handler} className="w-3/5"/>
                </div>

                <div className="border border-blue-800 w-9/12 mx-auto my-4">
                  <div className="border border-black">
                    <div className="text-center text-xl">Ingredients:</div>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <th>QTY</th>
                          <th>Ingredient</th>
                          <th>Delete</th>
                        </tr>
                      </tbody>
                      {/* {recipe.ingredients.map((i, index) => {
                      return(
                        <tbody>
                          <tr key={index}>
                            <td>{i.qty}</td>
                            <td>{i.ingredient}</td>
                            <td onClick={delIngredient(index)}>X</td>
                          </tr>
                        </tbody>
                      )
                    })} */}
                    </table>
                  </div>
                  <div className="flex justify-around p-4">
                      <label htmlFor="qty">qty: </label>
                      <input type="text" id="qty" name="qty" value={ingredient.qty} onChange={ingredientHandler}/>
                  </div>
                  <div className="flex justify-around p-4">
                      <label htmlFor="ingredient">Ingredient: </label>
                      <input type="text" id="ingredient" name="ingredient" value={ingredient.ingredient} onChange={ingredientHandler}/>
                  </div>
                  <div className="text-center mx-auto border border-dashed border-black bg-red-600 text-xl" onClick={ingredientAdder}>Add Ingredient</div>
                </div>

                <div className="border border-blue-800 w-9/12 mx-auto my-4">
                  <div className="border border-black">
                    <div className="text-center text-xl">Steps:</div>
                    <ul>
                    {recipe.steps.map(s => {
                      return(
                        <li>{`${s.stepNum}: ${s.step}`}</li>
                      )
                    })}
                    </ul>
                  </div>
                  <div className="flex justify-around p-4">
                      <label htmlFor="stepNum">Step Number: </label>
                      <input type="text" id="stepNum" name="stepNum" value={step.stepNum} onChange={stepHandler}/>
                  </div>
                  <div className="flex justify-around p-4">
                      <label htmlFor="step">Step Instruction: </label>
                      <input type="text" id="step" name="step" value={step.step} onChange={stepHandler}/>
                  </div>
                  <div className="text-center mx-auto border border-dashed border-black bg-red-600 text-xl" onClick={stepAdder}>Submit</div>
                </div>
                <div className="bg-green-400 border-black border-dotted text-xl text-center font-bold">SUBMIT RECIPE</div>
            </div>
        </div>
    )
}

