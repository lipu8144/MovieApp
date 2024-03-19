import React, { useState, useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";

import Loading from "./Loading";
import HorizontalCards from "./templets/HorizontalCards";
import DropDown from "./templets/DropDown";

const PersonDetails = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");
  
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  // console.log(info);
  return info ? (
    <div className="px-[3%] w-screen bg-[#1f1e24] h-fit flex flex-col">
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className=" w-full flex">
        {/* part 2 left poster and details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          {/* Social media links */}
          <div className="text-xl text-white flex gap-x-5">
            <a
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              target="_blank"
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              target="_blank"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              target="_blank"
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              target="_blank"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal information */}
          <h1 className=" text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>

          <h1 className=" text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className=" text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className=" text-lg text-zinc-400 font-semibold">Gender</h1>
          <h1 className=" text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className=" text-lg text-zinc-400 font-semibold">Birth Day</h1>
          <h1 className=" text-zinc-400">{info.detail.birthday}</h1>

          <h1 className=" text-lg text-zinc-400 font-semibold">Death Day</h1>
          <h1 className=" text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className=" text-lg text-zinc-400 font-semibold">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className=" text-lg text-zinc-400 font-semibold">
            Also Known as
          </h1>
          <h1 className=" text-zinc-400">{info.detail.also_known_as}</h1>
        </div>

        {/* part 3 right details and information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className=" text-6xl text-zinc-400 font-black my-5">{info.detail.name}</h1>
          <h1 className=" text-lg text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className=" mt-5 text-lg text-zinc-400 font-semibold">Top Movies</h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>

            <DropDown title={"Category"} options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />
          </div>

          <div className=" list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.5)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c,i) => (

              <li key={i} className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer">

              <Link to={`/${category}/details/${c.id}`} className="">
                <span>{
                    c.name || c.title || c.original_name || c.original_title
                  }</span>

                <span className="block ml-5 mt-2">{c.character && `Character Name:  ${c.character}`}</span>
              </Link>
            </li>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
