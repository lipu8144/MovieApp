import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import DropDown from "./templets/DropDown";
import Topnav from "./templets/Topnav";
import Loading from "./Loading";
import Cards from "./templets/Cards";

const Tvshows = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tv, setTv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Movies | TV Show ";

    const GettvShow = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        // settvShow(data.results);
        if (data.results.length > 0) {
          setTv((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    // console.log(tvShow);
    const refershHandler = () => {
      if (tv.length === 0) {
        GettvShow();
      } else {
        setpage(1);
        setTv([]);
        GettvShow();
      }
    };

    useEffect(() => {
      refershHandler();
    }, [category]);

  return tv.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between fixed top-0 bg-[#1f1e34] z-10">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          TV Show <small className="text-sm text-zinc-600">{category}</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="Category"
            options={["popular", "on_the_air", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GettvShow}
        hasMore={true}
        loader={<h1>Loading...</h1>}
        className=" relative top-24"
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
