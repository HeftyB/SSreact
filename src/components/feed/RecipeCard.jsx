import React from "react";
import {Link} from "react-router-dom";

export default function RecipeCard ({id, title, description, url, created}) {
  return (
    <div className="max-w-xl mx-auto my-4 px-4 py-4 bg-white shadow-md rounded-lg">
      <Link to={`/recipe/${id}`}>
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <p className="">{title}</p>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-xs font-semibold text-gray-500">{created}</p>
          </div>
        </div>
      </Link>
      <div className="py-2">
        <p className="leading-snug">{description}</p>
      </div>
      <div className="mt-2">


        <div className="flex justify-between">
          <div className="py-2 flex flex-row items-center">
            <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                   viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span className="ml-1">3431</span>
            </button>
            <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                   viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span className="ml-1">566</span>
            </button>
          </div>

          {url ? <p className="">{url}</p> : <p className="">www.heftyb.com</p>}
        </div>
      </div>
    </div>
  );
}
