import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import DropDown from "./templets/DropDown";
import Topnav from "./templets/Topnav";
import Loading from "./Loading";
import Cards from "./templets/Cards";

const People = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Movies | person ";

    const GetPerson = async () => {
      try {
        const { data } = await axios.get(`/person/${category}?page=${page}`);
        // setpersonShow(data.results);
        if (data.results.length > 0) {
          setperson((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    // console.log(personShow);
    const refershHandler = () => {
      if (person.length === 0) {
        GetPerson();
      } else {
        setpage(1);
        setperson([]);
        GetPerson();
      }
    };

    useEffect(() => {
      refershHandler();
    }, [category]);
  return person.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between fixed top-0 bg-[#1f1e34] z-10">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          People <small className="text-sm text-zinc-600">{category}</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={true}
        loader={<h1>Loading...</h1>}
        className=" relative top-24"
      >
        <Cards data={person} title="person" show={false} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
