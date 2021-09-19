import React from 'react';
import {Link} from "react-router-dom";

export default function Home (props) {
  return (
    <div className="bg-color3 w-10/12 mx-auto p-12 h-full">
      <p className="text-3xl font-bold text-center">HOME:</p>
      <div className="flex flex-col justify-around h-full">
        <div className="w-8/12 mx-auto bg-color5 p-12 text-center"><Link to="/all">ALL RECIPES</Link></div>
        <div className="w-8/12 mx-auto bg-color5 p-12 text-center"><Link to="/">BY TAG</Link></div>
        <div className="w-8/12 mx-auto bg-color5 p-12 text-center">BY TIME</div>
        <div className="w-8/12 mx-auto bg-color5 p-12 text-center">BY INV ON HAND</div>
        <div className="w-8/12 mx-auto bg-color5 p-12 text-center">MY RECIPES</div>
      </div>
    </div>
  );
}
