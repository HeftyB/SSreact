import React, {useState} from "react";

export default function RecipeTag ({tags, active, setActive, error}) {

  // Component state slices
  const [recipeTags, setRecipeTags] = useState([]);
  const [recipeTagdd, setrecipeTagdd] = useState({value: "-0"});

  // Adds dropdown tag to recipeTags
  const addTag = e => {
    if (e.target.value === "-69420") {
      setActive(true);
      return;
    }

    if (e.target.value > tags.length - 1 || e.target.value < 0) {
      debugger;
      return;
    }

    if (recipeTags.includes(tags[e.target.value])) {
      return;
    }

    let t = tags[e.target.value];

    setRecipeTags([
      ...recipeTags, t
    ]);
  };

  // Remove tag from recipeTags
  const removeTag = index => {
    let r = [...recipeTags];
    r.splice(index, 1);
    setRecipeTags(r);
  };

  return (
    <section>
      <div className="flex justify-around p-4">
        <h3 className="w-2/5 text-lg font-bold">Tags: <span className="text-red-600">*</span></h3>
        <hr/>
        <div className={error.tags ? "w-3/5 mx-auto bg-white border-red-600 border-2" : "w-3/5 mx-auto bg-white"}>
          <div className="text-center border-b border-black grid gtc gap-2">

            {recipeTags.map((tag, index) => {
              return (
                <div key={index}
                     className="w-28 p-2 border-2 border-blue-600 rounded-3xl bg-red-200 text-xs font-bold flex justify-around">
                  <span className="w-11 truncate">{tag.tag}</span>
                  <button className="border border-red-600 rounded-full text-red-600"
                          onClick={e => removeTag(index)}>X
                  </button>
                </div>
              );
            })}

          </div>
          <select className="w-full text-center" id="recipeTagDD" value={recipeTagdd} onChange={addTag}>
            <option selected hidden value={"-0"}>SELECT A NEW TAG</option>

            {tags.map((tag, index) => {
              return (
                <option key={index} value={index}>{tag.tag}</option>
              );
            })}

            <option value={"-69420"}>Add an additional tag</option>
          </select>
        </div>
      </div>
      <p className={error.tags ? "text-red-600 text-center text-xs italic mb-2" : "hidden"}>***
        TAG is required! ***</p>
    </section>
  );
}
