import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarModel } from "../../models/CarModel";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { CarSearchValues } from "../../models/CarSearchModel";
import { useTranslation } from "react-i18next";
import CarImage from "../../components/CarImage/CarImage";
import { toast } from "react-toastify";
import Image from "../../components/CarImage/CarImage";
import "./checkOut.css";

type Props = {};

const Checkout = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);
  const rentalState = useSelector((store: any) => store.rental);
  const { t } = useTranslation();
  const { id } = useParams();
  const [car, setCar] = useState<CarModel>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
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
    } catch (error: any) {
      toast.error(error?.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
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
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-12 d-flex car-image justify-content-center align-items-center ">
        <Image source={car?.image} model={"car"} />
      </div>
      <div className="  col-12 col-md-6 border o rounded border-3 py-3 mb-5   border-warning ">
        <div className="text-start  d-flex flex-column text-capitalize gap-3 fw-bold">
          <div className="text-center fs-1">{t("checkout")}</div>
          <div className="row  border-bottom border-3 border-secondary-subtle">
            <span className="col"> Model: </span>
            <span className="col"> {car?.modelName}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">{t("modelyear")}: </span>
            <span className="col">{car?.year}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">
              {t("perday")} {t("price")} :{" "}
            </span>
            <span className="col"> {car?.dailyPrice}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">{t("kilometer")} :</span>
            <span className="col"> {car?.kilometer}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">{t("plate")} : </span>
            <span className="col">{car?.plate}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">{t("color")} :</span>
            <span className="col">{car?.colorName}</span>
          </div>
          <div className="row border-bottom border-3 border-secondary-subtle">
            <span className="col">{t("price")} : </span>
            <span className="col">{totalPrice} $</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-warning"
            onClick={() => handleOnSubmit(rentalState)}
            disabled={isLoading}
          >
            {t("rent")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
