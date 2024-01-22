import axios from "axios";
import React, { useEffect, useState } from "react";
import { CarModel } from "../../models/CarModel";
import { Link, useLocation } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";

import CarPlaceholder from "../../components/CarPlaceholder/CarPlaceholder";



type Props = {};

const CarsPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const { cars } = location.state || [];
  const [carList, setCarList] = useState<CarModel[]>(cars);

  return (
    <div className="container row   w-100  ">
      {/* Loading-start */}

      {isLoading && (
        <div className="col-md-4col-12col-sm-6 d-flex flex-wrap    ">
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
        </div>
      )}
      {/* Loading-end */}

      {!isLoading &&
        carList?.map((car) => (
          <div key={car.id} className="col-md-4 col-12 col-sm-6   ">
            <CarCard car={car} />
          </div>
        ))}
    </div>
  );
};

export default CarsPage;
