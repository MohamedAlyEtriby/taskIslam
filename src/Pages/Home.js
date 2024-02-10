import React from "react";
import HeaderPhoto from "../ReusedCompnents/HeaderPhoto";
import Title from "../ReusedCompnents/Title";
import SliderHome from "../Components/Home/SliderHome";
import UseFetch from "../UseFetch";
import Slider2Home from "../Components/Home/Slider2Home";
import Loading from "../ReusedCompnents/Loading";

const Home = () => {
  const data = UseFetch("/home?count=4");
  return (
    <div style={{ width: "100%" }}>
      <HeaderPhoto imgscr="Homeimgg.png" />
      <div
        style={{
          width: "100%",
          padding: "2rem",
        }}
      >
        <Title title="MOST POPULAR" />
        {data ? (
          <SliderHome data={data} />
        ) : (
          <div style={{ width: "100%" }} className="flex-cen">
            <Loading />
          </div>
        )}
      </div>
      <div
        style={{
          width: "100%",
          padding: "2rem",
        }}
      >
        <Title title="LATEST OFFERS" />
        {data ? (
          <Slider2Home data={data} />
        ) : (
          <div style={{ width: "100%" }} className="flex-cen">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
