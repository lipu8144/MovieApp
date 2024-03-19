import React from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";

const HorizontalCards = ({ data }) => {
  return (
    // <div className="w-full p-5">
      

      <div className="w-[100%] flex overflow-y-hidden overflow-x-auto mb-5 p-5">
        {data.length > 0 ? data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[15%] bg-zinc-900 mr-5 mb-5 pb-4">
            <img
              className="w-full h-[55%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              })`}
              alt=""
            />
            <div className="text-white p-3 h-[45%] overflow-hidden">
              <h1 className=" text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className=" mb-2">
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-500">more</span>
              </p>
            </div>
          </Link>
        )) : <h1 className="text-3xl text-white text-center font-black mt-5">Nothing to show</h1>}
      </div>
    // </div>
  );
};

export default HorizontalCards;
