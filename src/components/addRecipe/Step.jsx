import React, {useState} from "react";

// Default objects
const initialStep = {
  step: ""
};

export default function Step ({recipe, setRecipe, error, setError}) {

  // Component state slices
  const [step, setStep] = useState(initialStep);

  // Input handler for step state
  const stepHandler = e => {
    setStep({
      ...step,
      [e.target.name]: e.target.value
    });
  };

  // Add step to recipe
  const stepAdder = e => {
    if (step.step.length === 0) {
      setError({
        ...error,
        steps: true
      });
      return;
    }

    setRecipe({
      ...recipe,
      steps: [...recipe.steps, step]
    });

    setStep(initialStep);

    if (error.steps) {
      setError({
        ...error,
        steps: false
      });
    }
  };

  // Remove step from recipe
  const delStep = index => {
    let x = [...recipe.steps];

    x.splice(index, 1);
    setRecipe({
      ...recipe,
      steps: x
    });
  };

  // Change order of steps in recipe
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
    });
  };

  return (
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
              );
            })}

          </div>
        </div>
        <form className={error.steps ? "border-red-600 border-2 my-2" : "border border-black my-2"}>
                            <textarea className="text-center w-full" id="step" name="step"
                                      placeholder="STEP INSTRUCTION" value={step.step} onChange={stepHandler}/>
        </form>
        <p className={error.steps ? "text-red-600 text-center text-sm italic mb-2" : "hidden"}>***
          INSTRUCTION is required! ***</p>
        <div className="text-center mx-auto bg-red-600 text-xl cursor-pointer" onClick={stepAdder}>Add
          Step
        </div>
      </div>
    </section>
  );
}
