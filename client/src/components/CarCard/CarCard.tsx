import React from "react";
import { CarModel } from "../../models/CarModel";
import { Link } from "react-router-dom";
import "./carCard.css";
import { useTranslation } from "react-i18next";
type Props = { car: CarModel };

const CarCard = ({ car }: Props) => {

  const {t}=useTranslation();
  return (
    <div className=" d-flex justify-content-center  align-items-center  mb-3">
      <div className="card  ">
        <img
          src="https://picsum.photos/id/237/500/200"
          className="card-img-top img-fluid"
          alt="..."
        />
        <div className="card-body">
          <div className="d-flex mb-4 flex-column">
            <div className="d-flex flex-row justify-content-between">
              <h5 className="card-title text-capitalize">Model : {car.modelName}</h5>
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
          <div className="d-flex flex-row justify-content-center ">
            <Link
              to={`/checkout/${car.id}`}
              className="btn btn-primary mx-2 w-100"
            >
              {t("rent")}
            </Link>
            <Link
              to={`/car-detail/${car.id}`}
              className="btn btn-warning w-100"
            >
              {t("info")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
