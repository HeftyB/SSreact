import React, {useState} from 'react';
import axios from "axios";

// default state objects
const initialRecipe = {
    title: "",
    description: "",
    url: "",
    ingredients: [],
    steps: [],
    tags: []
}

const initialStep = {
    step: ""
}

const initialIngredient = {
    ingredient: "",
    qty: ""
}

export default function AddRecipe() {

    // slices of component state
    const [recipe, setRecipe] = useState(initialRecipe);
    const [ingredient, setIngredient] = useState(initialIngredient);
    const [step, setStep] = useState(initialStep);
    const [error, setError] = useState({
        qty: false,
        ingredient: false,
        instruction: false
    });

    // input handler for recipe state
    const handler = e => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    };

    // input handler for ingredient state
    const ingredientHandler = e => {
        setIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        });
    };

    // add current ingredient state to recipe.ingredients
    const ingredientAdder = e => {
        let q = ingredient.qty.length === 0;
        let i = ingredient.ingredient.length === 0;

        if (q || i) {
            setError({
                ...error,
                qty: q,
                ingredient: i
            });

            return
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

    // input handler for step state
    const stepHandler = e => {
        setStep({
            ...step,
            [e.target.name]: e.target.value
        });
    };

    // add current step state to ingredient.steps
    const stepAdder = e => {
        if (step.step.length === 0) {
            setError({
                ...error,
                instruction: true
            });
            return
        }

        setRecipe({
            ...recipe,
            steps: [...recipe.steps, step]
        });

        setStep(initialStep);

        if (error.instruction) {
            setError({
                ...error,
                instruction: false
            });
        }
    };

    // remove ingredient from recipe.ingredients
    const delIngredient = index => {
        let x = [...recipe.ingredients];

        x.splice(index, 1);
        setRecipe({
            ...recipe,
            ingredients: x
        });
    };

    // remove step from recipe.steps
    const delStep = index => {
        let x = [...recipe.steps];

        x.splice(index, 1);
        setRecipe({
            ...recipe,
            steps: x
        });
    };

    // change order of step in ingredient.steps
    const stepOrder = (index, dir) => {
        if (index + dir < 0 || index + dir > recipe.steps.length - 1) {
            return;
        }

        let x = [...recipe.steps];
        let a = x[index];

        x[index] = x[index + dir];
        x[index + dir] = a;

        setRecipe({
            ...recipe,
            steps: x
        })
    };

    const submitRecipe = e => {
        let s = recipe.steps.map((step, index) => {
            return {
                ...step,
                step_num: index + 1
            }
        })

        let r = {
            ...recipe,
            steps: s,
            tags: []
        }

        axios.post("http://192.168.1.125:2021/recipes", r)
            .then(data => {
                console.log(data);
                debugger
            })
            .catch(e => {
                debugger
            })
    }

    return (
        <div className="bg-color4 w-10/12 mx-auto h-full">
            <div className="text-3xl text-center font-bold">Add Recipe</div>
            <div className="w-8/12 bg-color3 mx-auto">

                {/*recipe head*/}
                <section>
                    <div className="flex justify-around p-4">
                        <label htmlFor="title" className="w-2/5 text-lg font-bold">Recipe Name: </label>
                        <input type="text" id="title" name="title" value={recipe.title} onChange={handler}
                               className="w-3/5"/>
                    </div>

                    <div className="flex justify-around p-4">
                        <label htmlFor="description" className="w-2/5 text-lg font-bold">Recipe Description: </label>
                        <input type="text" id="description" name="description" value={recipe.description}
                               onChange={handler} className="w-3/5"/>
                    </div>

                    <div className="flex justify-around p-4">
                        <label htmlFor="url" className="w-2/5 text-lg font-bold">Recipe URL: </label>
                        <input type="text" id="url" name="url" value={recipe.url} onChange={handler} className="w-3/5"/>
                    </div>
                </section>

                {/*ingredient section*/}
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

                                {/* list ingredients in recipe.ingredients */}
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
                                    )
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

                <hr/>
                <hr/>


                {/*step section*/}
                <section>
                    <div className="w-9/12 mx-auto my-4">
                        <div className="">
                            <div className="text-center text-3xl font-bold">Steps:</div>
                            <hr className="border-black"/>
                            <div className="">
                                <div className="flex text-center text-xl font-bold">
                                    <div className="w-full border-black border-r">STEP</div>
                                    <div className="w-20 border-black boarder-l text-lg">ORDER</div>
                                </div>

                                {/* list steps in recipe.steps */}
                                {recipe.steps.map((s, index) => {
                                    return (
                                        <div className="flex text-center border-t border-b border-black py-2"
                                             key={index}>
                                            <div className="w-full text-left border-black border-r px-2">{s.step}</div>
                                            <div className="w-20 flex justify-evenly">
                                                <span
                                                    className={index === 0 ? "my-auto font-bold cursor-not-allowed" : "my-auto font-bold cursor-pointer"}
                                                    onClick={e => stepOrder(index, -1)}>↑</span>
                                                <span
                                                    className={index === recipe.steps.length - 1 ? "my-auto font-bold cursor-not-allowed" : "my-auto font-bold cursor-pointer"}
                                                    onClick={e => stepOrder(index, 1)}>↓</span>
                                                <span className="my-auto font-extrabold text-red-500 cursor-pointer"
                                                      onClick={e => delStep(index)}>X</span>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        <form className="border border-black my-2">
                            <textarea className="text-center w-full" id="step" name="step"
                                      placeholder="STEP INSTRUCTION" value={step.step} onChange={stepHandler}/>
                        </form>
                        <p className={error.instruction ? "text-red-600 text-center text-sm italic mb-2" : "hidden"}>***
                            INSTRUCTION is required! ***</p>
                        <div className="text-center mx-auto bg-red-600 text-xl cursor-pointer" onClick={stepAdder}>Add
                            Step
                        </div>
                    </div>
                </section>

                <div
                    className="bg-green-400 border-black border-dotted text-xl text-center font-bold cursor-pointer"
                    onClick={submitRecipe}>
                    SUBMIT RECIPE
                </div>
            </div>
        </div>
    )
}

