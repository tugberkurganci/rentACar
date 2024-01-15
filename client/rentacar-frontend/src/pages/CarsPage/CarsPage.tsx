import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { CarModel } from "../../models/CarModel";
import { Link } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";

type Props = {};

const CarsPage = (props: Props) => {
  const [carList, setCarList] = useState<CarModel[]>();

  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get("v1/cars");

      setCarList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="container row   w-100  ">
      {carList?.map((car) => (
        <div className="col-md-4 col-12 col-sm-6   ">
          <CarCard car={car} />
        </div>
      ))}
    </div>
  );
};

export default CarsPage;
