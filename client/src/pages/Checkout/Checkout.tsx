import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarModel } from "../../models/CarModel";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { CarSearchValues } from "../../models/CarSearchModel";

type Props = {};

const Checkout = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);
  const rentalState = useSelector((store: any) => store.rental);

  const { id } = useParams();
  const [car, setCar] = useState<CarModel>();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const fetchCar = async () => {
    try {
      const response = await axiosInstance(`/v1/cars/${id}`);

      setCar(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCar();
    fetchRentalTotalPrice();
  }, []);

  const handleOnSubmit = async (values: CarSearchValues) => {
    try {
      const response = await axiosInstance.post("/v1/rentals", {
        carId: id,
        ...values,
        userId: authState.id,
      });
      //İf no response throw tastify error
      navigate(`/order-complete`, {
        state: { rental: response.data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRentalTotalPrice = async () => {
    try {
      const response = await axiosInstance.post("/v1/rentals/total", {
        ...rentalState,
        carId: id,
      });
      setTotalPrice(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  row d-flex justify-content-center align-items-center">
      <div className="col-12 d-flex justify-content-center align-items-center ">
        <img
          className="img-fluid rounded"
          src="https://picsum.photos/500/300"
          alt="araba"
        />
      </div>
      <div className="col-12 col-md-6 border  rounded border-3 p-md-5 w-75  border-warning ">
        <div className="text-start  d-flex flex-column text-capitalize gap-3 fw-bold">
          <div className="text-center fs-1">Sipariş Onayı </div>
          <div className="row  border-bottom border-3 border-secondary-subtle">
            <span className="col"> Model Name : </span>
            <span className="col"> {car?.modelName}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">Model Year : </span>
            <span className="col">{car?.year}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">Daily Price : </span>
            <span className="col"> {car?.dailyPrice}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">Kilometer :</span>
            <span className="col"> {car?.kilometer}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">Plate : </span>
            <span className="col">{car?.plate}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">Color :</span>
            <span className="col">{car?.colorName}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">Total price : </span>
            <span className="col">{totalPrice} $</span>
          </div>
        </div>
        <p></p>
        <div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-warning"
              onClick={() => handleOnSubmit(rentalState)}
            >
              Kiralama onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
