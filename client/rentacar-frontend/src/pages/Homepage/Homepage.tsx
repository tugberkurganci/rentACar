// import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import video from "../../../public/assets/ArabaTanıtım.mp4";
type Props = {};

const Homepage = (props: Props) => {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <div className="home row d-flex  justify-content-center  align-items-center col-12">
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
      <div className="col-12 col-md-4  ">
        <h1>
          <span className="text-warning">Rent a car</span> and find great deal
          with us
        </h1>
        <p>
          Choose from collections of brand new cars, low prices are part of our
          day offer
        </p>
        <Link to="/cars" className="text-decoration-none">
          <button className="btn btn-warning ">Book online now!</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
