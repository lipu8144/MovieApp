import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
    const data = [
      { title: "Trending", icon: "ri-fire-fill", path: "/trending" },
      { title: "Popular", icon: "ri-bard-fill", path: "/popular" },
      { title: "Movies", icon: "ri-movie-2-fill", path: "/movie" },
      { title: "TV Shows", icon: "ri-tv-2-fill", path: "/tv" },
      { title: "People", icon: "ri-team-fill", path: "/person" },
    ];

    

  return (
    <div className=" w-[20%] h-full border-r-2 border-zinc-400 p-10">
      <h1 className="text-2xl text-white font-bold">
        <i className="ri-tv-fill text-[#6556cd]"></i>
        <span className="text-2xl">Movies.</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        {data.map((item,index) => (
          <Link to={item.path} key={index} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
            <i className={`${item.icon} mr-2`}></i> {item.title}
          </Link>
        ))}
        <hr />
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-5 mb-5">
            Website Information
          </h1>
          <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
           <i className="mr-2 ri-information-fill"></i> About Movies
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
            <i className="mr-2 ri-phone-fill"></i> Contact Us
          </Link>
        </nav>
      </nav>
    </div>
  );
};

export default Sidenav;
