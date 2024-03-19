import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import DropDown from "./templets/DropDown";
import Topnav from "./templets/Topnav";
import Loading from "./Loading";
import Cards from "./templets/Cards";

const Movie = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Movies | movie "

    const Getmovie = async () => {
      try {
        const { data } = await axios.get(`/movie/${category}?page=${page}`);
        // setmovie(data.results);
        if (data.results.length > 0) {
          setmovie((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    // console.log(movie);
    const refershHandler = () => {
      if (movie.length === 0) {
        Getmovie();
      } else {
        setpage(1);
        setmovie([]);
        Getmovie();
      }
    };

    useEffect(() => {
      refershHandler();
    }, [category]);

  return movie.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between fixed top-0 bg-[#1f1e34] z-10">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          Movie <small className="text-sm text-zinc-600">{category}</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={Getmovie}
        hasMore={true}
        loader={<h1>Loading...</h1>}
        className=" relative top-24"
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
