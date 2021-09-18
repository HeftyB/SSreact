import React, {useState} from "react";
import axios from "axios";

export default function TagModal ({active, setActive, getTags}) {

  // Component state slices
  const [newTag, setNewTag] = useState("");

  // POST new tag to server
  const submitTag = e => {
    axios.post(`${process.env.REACT_APP_DOCKS}/tags`, {tag: newTag})
      // .then(({data}) => {})
      .catch(e => {
        debugger
      })
      .finally(() => {
        setNewTag("");
        getTags();
        setActive(false);
      });
  };

  return (
    <div
      className={active ?
        "modal h-screen w-full fixed left-0 top-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50"
        : "modal h-screen w-full fixed left-0 top-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50 hidden"}
      onClick={e => setActive(false)}>
      <div className="container bg-gray-200 w-5/12 p-4 flex justify-between blowUpModal"
           onClick={e => e.stopPropagation()}>
        <input type="text" placeholder="Enter a new tag(e.g., spicy, vegan, gluten-free, Italian)"
               value={newTag} onChange={e => setNewTag(e.target.value)}
               className="w-10/12 text-center text-xs shadow appearance-none border rounded py-2 px-3 mx-auto text-grey-darker"/>
        <button
          className="w-1/12 bg-gray-800 rounded-lg border text-center shadow">
          <p className="font-semibold text-white"
             onClick={submitTag}>OK</p>
        </button>
      </div>
    </div>
  );
}
