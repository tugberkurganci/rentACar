import React, { useEffect, useState } from "react";
import { CarModel } from "../../models/CarModel";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";

type Props = {};

const CarDetail = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [car, setCar] = useState<CarModel>();
  const fetchCar = async () => {
    try {
      const response = await axiosInstance(`/v1/cars/${id}`);
      setCar(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCar();
  }, []);
  return (
    <div className="  row  justify-content-center align-items-center">
      {isLoading && (
        <div className="display-1">
          <LoadingSpinner style1={{ width: "100px", height: "100px" }} />
        </div>
      )}
      {!isLoading && (
        <div className="  row  justify-content-center align-items-center">
          <div className="col-12 col-md-6 ">
            <img
              className="img-fluid rounded"
              src="https://www.taxi-times.com/wp-content/uploads/2020/08/2020-08-11-Togg-kommt-elektrisch-nach-Deutschland-Foto-TOGG-750x531.jpg"
              alt=""
            />
          </div>
          <div className="col-12 col-md-6 border   rounded border-3 p-md-5   border-warning ">
            <div className="text-center fs-1 text-capitalize fw-bolder">
              {car?.modelName}
            </div>
            <div>
              <span className="fw-bold">Plaka : </span>
              {car?.plate}
            </div>
            <div>
              <span className="fw-bold">Renk : </span>
              {car?.colorName}
            </div>
            <div>
              <span className="fw-bold">Kilometre : </span>
              {car?.kilometer}
            </div>
            <div>
              <span className="fw-bold">Fiyat : </span>
              {car?.dailyPrice}
            </div>
            <div>
              <span className="fw-bold">Model Yılı : </span>
              {car?.year}
            </div>
            <div className="d-flex flex-row justify-content-center mt-3 ">
              <Link
                to={`/checkout/${car?.id}`}
                className="btn btn-primary mx-2 w-100"
              >
                Kirala
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
