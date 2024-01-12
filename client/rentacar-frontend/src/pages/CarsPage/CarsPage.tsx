import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { CarModel } from "../../models/CarModel";
import { Link } from "react-router-dom";

type Props = {};

const CarsPage = (props: Props) => {
  const [carList, setCarList] = useState<CarModel[]>();

  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get("v1/cars");

      console.log(response);

      setCarList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="row">
      {carList?.map((car) => (
        <div  key={car.id} className="card col-md-4" >
        <img src="https://picsum.photos/id/237/500/200" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{car.modelName}</h5>
          <p className="card-text">Daily Price : { car.dailyPrice}</p>
          <Link to={`/checkout/${car.id}`} className="btn btn-primary">Kirala</Link>
        </div>
      </div>
      ))}
    </div>
  );
};

export default CarsPage;
