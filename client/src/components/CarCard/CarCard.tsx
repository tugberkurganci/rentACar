import React from "react";
import { CarModel } from "../../models/CarModel";
import { Link } from "react-router-dom";
import "./carCard.css";
type Props = { car: CarModel };

const CarCard = ({ car }: Props) => {
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
              <h5 className="card-title text-capitalize">{car.modelName}</h5>
              <h5 className="card-title">
                <span>Model Yılı : </span>
                {car.year}
              </h5>
            </div>
            <p className="card-text">
              <b>Price :</b> {car.dailyPrice} ${" "}
              <span style={{ opacity: "0.5" }} className="fw-normal">
                /per day
              </span>
            </p>
          </div>
          <div className="d-flex flex-row justify-content-center ">
            <Link
              to={`/checkout/${car.id}`}
              className="btn btn-primary mx-2 w-100"
            >
              Kirala
            </Link>
            <Link
              to={`/car-detail/${car.id}`}
              className="btn btn-warning w-100"
            >
              Detayları gör...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
