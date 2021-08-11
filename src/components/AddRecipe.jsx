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
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient]
      });

      setIngredient(initialIngredient);
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

    const stepOrder = (index, dir) => {
      if (index + dir < 0 || index + dir > recipe.steps.length - 1) {
        // consol
        console.log("catch")
        return;
      }

      let x = [...recipe.steps];
      let a = x[index]; 
      let b = x[index + dir];

      console.log(index)
      console.log(dir)
      console.log(index + dir)

      x[index + dir] = b;
      x[index] = a;
      
      setRecipe({
        ...recipe,
        steps: x
      })
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

                <div className="w-9/12 mx-auto my-4">
                  <div className="">
                    <div className="text-center text-3xl font-bold">Ingredients:</div>
                    <hr className="border-black"/>
                    <div className="">   
                      <div className="flex text-center text-xl font-bold">
                        <div className="w-1/5 border-black boarder-r">QTY</div>
                        <div className="w-3/5 border-black border-l border-r">INGREDIENT</div>
                        <div className="w-1/5 border-black boarder-l">DEL</div>
                      </div>

                      {recipe.ingredients.map((i, index) => {
                        return (
                          <div className="flex text-center border-t border-b border-black py-2" key={index}>
                            <div className="w-1/5">{i.qty}</div>
                            <div className="w-3/5 border-black border-l border-r">{i.ingredient}</div>
                            <div className="w-1/5 font-extrabold text-red-500" onClick={e => delIngredient(index)}>X</div>
                          </div>
                        )
                      })}

                    </div>
                  </div>
                  <div className="border border-black my-2">
                    <input className="w-1/5 text-center border-black border-r" type="text" id="qty" name="qty" placeholder="QTY" value={ingredient.qty} onChange={ingredientHandler}/>
                    <input className="w-4/5 text-center" type="text" id="ingredient" name="ingredient" placeholder="INGREDIENT" value={ingredient.ingredient} onChange={ingredientHandler}/>
                  </div>
                  <div className="text-center mx-auto bg-red-600 text-xl" onClick={ingredientAdder}>Add Ingredient</div>
                </div>
                <hr />
                <hr />
                <div className="w-9/12 mx-auto my-4">
                  <div className="">
                    <div className="text-center text-3xl font-bold">Steps:</div>
                    <hr className="border-black"/>
                    <div className="">   
                      <div className="flex text-center text-xl font-bold">
                        <div className="w-full border-black border-r">STEP</div>
                        <div className="w-20 border-black boarder-l text-lg">ORDER</div>
                      </div>
                      
                      {recipe.steps.map((s, index) => {
                        return (
                          <div className="flex text-center border-t border-b border-black py-2" key={index}>
                            <div className="w-full text-left border-black border-r px-2">{s.step}</div>
                            <div className="w-20 flex justify-evenly">
                              <span className={index == 0 ? "my-auto font-bold cursor-not-allowed" : "my-auto font-bold cursor-pointer"} onClick={e => stepOrder(index, -1)}>↑</span>
                              <span className={index == recipe.steps.length - 1 ? "my-auto font-bold cursor-not-allowed" : "my-auto font-bold cursor-pointer"} onClick={e => stepOrder(index, 1)}>↓</span>
                              <span className="my-auto font-extrabold text-red-500 cursor-pointer" onClick={e => delStep(index)}>X</span>
                            </div>
                          </div>
                        )
                      })}

                    </div>
                  </div>
                  <form className="border border-black my-2">
                    <textarea className="text-center w-full" id="step" name="step" placeholder="STEP INSTRUCTION" value={step.step} onChange={stepHandler}/>
                  </form>
                  <div className="text-center mx-auto bg-red-600 text-xl" onClick={stepAdder}>Add Step</div>
                </div>
                <div className="bg-green-400 border-black border-dotted text-xl text-center font-bold">SUBMIT RECIPE</div>
            </div>
        </div>
    )
}

