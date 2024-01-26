// import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import video from "/src/assets/ArabaTanıtım.mp4";
import DatePicker from "../../components/DatePicker/DatePicker";
type Props = {};

const Homepage = (props: Props) => {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <div className="home row d-flex  justify-content-center justify-content-md-start  align-items-center  col-12">
      <div className="col-12 col-md-6  text-center">
        <video
          style={{ maxHeight: "700px" }}
          className="img-fluid rounded"
          controls
          autoPlay
          loop
          muted
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="col-12 col-md-4 text-center text-md-start  ">
        <h1>
          <span className="text-warning">Rent a car</span> and find great deal
          with us
        </h1>
        <p>
          Choose from collections of brand new cars, low prices are part of our
          day offer
        </p>
        <p>Please pick a date interval!</p>
        <DatePicker />
      </div>
    </div>
  );
};

export default Homepage;
