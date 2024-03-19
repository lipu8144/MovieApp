import axios from "../../utils/axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import noimage from "/noimage.jpg"

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  
  
  const GetSerches = async () =>{
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results)
    } catch (error) {
        console.log("Erroe: ", error);
    }
  }

  useEffect(()=>{
    GetSerches();
  },[query])

  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center">
      <i className=" text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className=" w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        placeholder="Search here..."
        type="text"
      />
      {query && (
        <i
          onClick={() => setquery("")}
          className=" text-zinc-400 text-3xl ri-close-fill"
        ></i>
      )}

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] overflow-auto rounded">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className=" hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-r-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
             s.backdrop_path || s.profile_path ?
             `https://image.tmdb.org/t/p/original/${
               s.backdrop_path || s.profile_path
             }` : noimage}
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
