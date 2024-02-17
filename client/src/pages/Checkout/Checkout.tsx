import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarModel } from "../../models/CarModel";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { CarSearchValues } from "../../models/CarSearchModel";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./checkOut.css";
import { deleteRental } from "../../store/rentalStore/rentalSlice";
import { FaEquals } from "react-icons/fa";
import { TbArrowBigRightLineFilled } from "react-icons/tb";
import CreditCardInfo from "../../components/CreditCardInfo/CreditCardInfo";

type Props = {};

const Checkout = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);
  const rentalState = useSelector((store: any) => store.rental);
  const { t } = useTranslation();
  const { id } = useParams();
  const [car, setCar] = useState<CarModel>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const fetchCar = async () => {
    try {
      const response = await axiosInstance(`/v1/cars/${id}`);

      setCar(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
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
      dispatch(deleteRental());
      navigate(`/order-complete`, {
        state: { rental: response.data },
      });
    } catch (error: any) {
      toast.error(error?.response.data.message);
      if (authState.id === 0) {
        navigate("/login");
      }
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
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="row w-100  d-flex justify-content-center gap-3 align-items-center">
      <div className="col-12 col-md-8  d-flex car-image justify-content-center align-items-center ">
        {car?.image && (
          <img
            className="img-fluid  border border-2 border-info  "
            src={`/assets/car/${car.image}`}
          ></img>
        )}
      </div>
      <div className="col-12 col-md-6 border  rounded bg-body-secondary py-3 mb-5    ">
        <div className="text-start  d-flex flex-column text-capitalize gap-3 ">
          <div className="text-center border border-2 bg-light fw-medium  mb-3 display-5 fw-normal py-2">
            {t("checkout")}
          </div>
          <div className="d-flex flex-column gap-2 ">
            <div className="d-flex flex-column flex-md-row w-100 gap-2 ">
              <div className="col d-flex align-items-center gap-3 border border-2 bg-light p-2 rounded">
                <span className="col-4 text-center  p-1 text-light bg-success rounded">
                  Model
                </span>
                <TbArrowBigRightLineFilled />
                <span className="col "> {car?.modelName}</span>
              </div>
              <div className="col d-flex align-items-center gap-3 border border-2 bg-light p-2 rounded ">
                <span className="col-4 text-center  p-1 text-light bg-success rounded ">
                  {t("modelyear")}
                </span>
                <TbArrowBigRightLineFilled />
                <span className="col">{car?.year}</span>
              </div>
            </div>
            <div className="d-flex  flex-column flex-md-row w-100 gap-2">
              <div className="col d-flex align-items-center gap-3 border border-2 bg-light p-2 rounded">
                <span className="col-4 text-center  p-1 text-light bg-success rounded">
                  {t("perday")} {t("price")}
                </span>
                <TbArrowBigRightLineFilled />
                <span className="col"> {car?.dailyPrice} $</span>
              </div>
              <div className="col d-flex align-items-center gap-3 border border-2 bg-light p-2 rounded">
                <span className="col-4 text-center  p-1 text-light bg-success rounded">
                  {t("kilometer")}
                </span>
                <TbArrowBigRightLineFilled />
                <span className="col"> {car?.kilometer}</span>
              </div>
            </div>
            <div className="d-flex  flex-column flex-md-row w-100 gap-2">
              <div className="col d-flex align-items-center gap-3 border border-2 bg-light p-2 rounded">
                <span className="col-4 text-center  p-1 text-light bg-success rounded ">
                  {t("plate")}
                </span>
                <TbArrowBigRightLineFilled color="black" />
                <span className="col">{car?.plate}</span>
              </div>
              <div className="col d-flex align-items-center gap-3 border border-2 bg-light p-2 rounded">
                <span className="col-4 text-center  p-1 text-light bg-success rounded">
                  {t("color")}
                </span>
                <TbArrowBigRightLineFilled color="black" />

                <span className="col">{car?.colorName}</span>
              </div>
            </div>
            <div className="d-flex  flex-column justify-content-center align-items-center flex-md-row w-100 ">
              <div className=" col-12 col-md-6 d-flex text-center justify-content-center align-items-center  gap-3 me-md-3 border border-2 bg-light p-2 rounded">
                <span className="col text-center  p-1 text-light bg-success rounded ">
                  {t("price")}
                </span>
                <span className="col-1">
                  <FaEquals color="black" />
                </span>
                <span className="col text-start">{totalPrice} $</span>
              </div>
            </div>
          </div>
        </div>
        <CreditCardInfo />
        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary text-capitalize fs-5 px-5"
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
