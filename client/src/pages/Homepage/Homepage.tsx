// import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import video from "/src/assets/ArabaTanıtım.mp4";
import DatePicker from "../../components/DatePicker/DatePicker";
import { useTranslation } from "react-i18next";
type Props = {};

const Homepage = (props: Props) => {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const {t}=useTranslation();
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
          <span className="text-warning">{t("rentacar")}</span> {t("deal")}
        </h1>
        <p>
          {t("homeinfo")}
        </p>
        <p>{t("homeinfo2")}</p>
        <DatePicker />
      </div>
    </div>
  );
};

export default Homepage;
