import React from 'react';
import {Link} from "react-router-dom";

export default function Welcome () {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="w-8/12 h-1/2 mx-auto bg-color4 flex flex-col justify-around">
        <div className="w-8/12 mx-auto text-6xl text-center font-bold border-2 border-dashed border-black p-4">
          Super-Supper!
        </div>
        <div className="text-center -mt-20">
          <p className="italic">
            "Where all your dreams come true!"
          </p>
        </div>
        <div className="w-8/12 mx-auto text-center bg-color3">
          <Link to={"/home"}>
            <div className="p-8 font-bold text-2xl">Welcome!!!!!!!!!!!!!!!</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
