import React from "react";
import { CarModel } from "../../models/CarModel";
import { Link } from "react-router-dom";
import "./carCard.css";
import { useTranslation } from "react-i18next";
import Image from "../CarImage/CarImage";
type Props = { car: CarModel };

const CarCard = ({ car }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center w-100    align-items-center  mb-3">
      <div className="card col-12  d-flex flex-column flex-md-row justify-content-between">
        <div className="card-car-image">
          <Image source={car.image} model={"car"} />
        </div>
        <div className="card-body d-flex flex-column justify-content-between w-100">
          <div className="d-flex mb-4 flex-column">
            <div className="d-flex flex-row justify-content-between ">
              <h5 className="card-title text-capitalize">
                Model : {car.modelName}
              </h5>
              <h5 className="card-title">
                <span>{t("modelyear")} : </span>
                {car.year}
              </h5>
            </div>
            <p className="card-text">
              <b>{t("price")} :</b> {car.dailyPrice} ${" "}
              <span style={{ opacity: "0.5" }} className="fw-normal">
                /{t("perday")}
              </span>
            </p>
          </div>
          <div className="d-flex flex-row justify-content-between ">
            <Link to={`/checkout/${car.id}`} className="btn btn-primary mx-2 ">
              {t("rent")}
            </Link>
            <Link to={`/car-detail/${car.id}`} className="btn btn-warning ">
              {t("info")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
