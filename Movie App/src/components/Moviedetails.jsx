import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";

import Loading from "./Loading"
import HorizontalCards from "./templets/HorizontalCards";


const Moviedetails = () => {
  
  const {pathname} = useLocation();

    const navigate = useNavigate();
    const {id} = useParams();
    const {info} = useSelector((state) => state.movie)
    const dispatch = useDispatch();
    console.log(info)
    useEffect(() => {
      dispatch(asyncloadmovie(id));
      return () => {
        dispatch(removemovie())
      }
    }, [id])
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-fit px-[10%]"
    >
      {/* part 1 nav links */}
      <nav className=" w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          target="_blank"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 poster and details */}
      <div className="w-full flex">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover "
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        {/* content */}
        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className=" mt-3 mb-3 flex text-white items-center gap-x-3">
            <span
              className="rounded-full text-xl font-semibold bg-yellow-600 text-white
         w-[5vh] h-[5vh] flex justify-center items-center"
            >
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className=" text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className=" text-2xl mb-3 mt-3 font-bold">Overview</h1>
          <p className=" leading-5">{info.detail.overview}</p>

          <h1 className=" text-2xl mb-2 mt-3 font-bold">Languages</h1>
          <p className="mb-8">{info.translations.slice(0,35).join(", ")}</p>

          <Link className="p-4 bg-[#6556cd] rounded-lg" to={`${pathname}/trailer`}>
            <i className=" text-xl ri-play-fill"></i>
            Play Trailer</Link>
        </div>
      </div>

      {/* part 3 platform */}
      <div className=" w-[80%] flex flex-col mt-10 gap-y-5 mb-4">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>

            {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                className=" w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>

            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className=" w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>

            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className=" w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>


              {/* part 4 Recommendations */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white">Recommendations & Similars</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
