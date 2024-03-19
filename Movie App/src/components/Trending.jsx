import React, { useEffect,useState } from "react";


import axios from "../utils/axios"
import Topnav from "./templets/Topnav";
import DropDown from "./templets/DropDown";
import { useNavigate } from "react-router-dom";
import Cards from "./templets/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component"

const Trending = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('all');
    const [duration, setDuration] = useState('day');
    const [trending, setTrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);    
    document.title = "Movies | Trending " + category;
    
    const GetTrending = async () => {
      try {
        const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
        // setTrending(data.results);
        if(data.results.length > 0){
            setTrending((prevState) => [...prevState, ...data.results]);
            setpage(page + 1);
            
        }else{
            setHasMore(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    // console.log(trending);
    const refershHandler = () => {
        if(trending.length === 0){
            GetTrending();
        }else{
            setpage(1)
            setTrending([])
            GetTrending()
        }
    }

    useEffect(() => {
        refershHandler();
    },[category, duration])

  return trending.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between z-10 fixed top-0 bg-[#1f1e34]">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <DropDown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={true}
        loader={<h1>Loading...</h1>}
        className=" relative top-24"
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
