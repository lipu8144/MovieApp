import React, { useEffect, useState } from "react";
import Sidenav from "./templets/Sidenav";
import Topnav from "./templets/Topnav";
import axios from "../utils/axios";
import Headers from "./templets/Headers";
import HorizontalCards from "./templets/HorizontalCards";
import DropDown from "./templets/DropDown";
import Loading from "./Loading";


const Home = () => {
    document.title = "Movie App"
    const [wallpaper, setwallpaper] = useState(null);
    const [trending, settrending] = useState(null);
    const [category, setcategory] = useState("all");
    
    

    const GetHeaderWallpaper = async() =>{
      try {
        const {data} = await axios.get(`/trending/all/day`);
        let randomData = data.results[(Math.random() * data.results.length).toFixed()];
        setwallpaper(randomData);
      } catch (error) {
        console.log("Error: ", error)
      }
    }


    const GetTrending = async () => {
      try {
        const { data } = await axios.get(`/trending/${category}/day`);
        settrending(data.results);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    useEffect(() => {
      GetTrending();
      !wallpaper && GetHeaderWallpaper();
    }, [category]);
    
  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Headers data={wallpaper} />

        <div className="p-4 flex justify-between">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <DropDown title="Filter" options={["tv", "movie", "all"]} func={(e) => setcategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
