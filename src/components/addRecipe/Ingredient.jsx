import React, {useState} from "react";

// Default object
const initialIngredient = {
  ingredient: "",
  qty: ""
};

export default function Ingredient ({recipe, setRecipe, error, setError}) {

  // Component state slices
  const [ingredient, setIngredient] = useState(initialIngredient);

  // Input handler for ingredient state
  const ingredientHandler = e => {
    setIngredient({
      ...ingredient,
      [e.target.name]: e.target.value
    });
  };

  // Add current ingredient state to recipe.ingredients
  const ingredientAdder = e => {
    let q = ingredient.qty.length === 0;
    let i = ingredient.ingredient.length === 0;

    if (q || i) {
      setError({
        ...error,
        qty: q,
        ingredient: i
      });

      return;
    }

    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ingredient]
    });

    setIngredient(initialIngredient);
    if (error.qty || error.ingredient) {
      setError({
        ...error,
        qty: false,
        ingredient: false
      });
    }
  };

  // Remove ingredient from recipe.ingredients
  const delIngredient = index => {
    let x = [...recipe.ingredients];

    x.splice(index, 1);
    setRecipe({
      ...recipe,
      ingredients: x
    });
  };


  return (
    <section>
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
                <div className="flex text-center border-t border-b border-black py-2"
                     key={index}>
                  <div className="w-1/5">{i.qty}</div>
                  <div className="w-3/5 border-black border-l border-r">{i.ingredient}</div>
                  <div className="w-1/5 font-extrabold text-red-500 cursor-pointer"
                       onClick={e => delIngredient(index)}>X
                  </div>
                </div>
              );
            })}

          </div>
        </div>
        <div className="border border-black my-2">
          <input
            className={error.qty ? "w-1/5 text-center border-red-600 border-2" : "w-1/5 text-center border-black border-r"}
            type="text" id="qty" name="qty"
            placeholder="QTY" value={ingredient.qty} onChange={ingredientHandler}/>
          <input
            className={error.ingredient ? "w-4/5 text-center border-red-600 border-2" : "w-4/5 text-center"}
            type="text" id="ingredient" name="ingredient"
            placeholder="INGREDIENT" value={ingredient.ingredient} onChange={ingredientHandler}/>
        </div>
        <p className={error.qty || error.ingredient ? "text-red-600 text-center text-sm italic mb-2" : "hidden"}>***
          QTY & INGREDIENT are required! ***</p>
        <div className="text-center mx-auto bg-red-600 text-xl cursor-pointer"
             onClick={ingredientAdder}>Add Ingredient
        </div>
      </div>
    </section>
  );
}
