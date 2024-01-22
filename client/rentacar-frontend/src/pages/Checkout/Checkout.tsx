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
  const [dateValues, setDateValues] = useState<CarSearchValues>()
 
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
    <div className="  row  justify-content-center align-items-center">
     
      <div className="col-12 col-md-6 border   rounded border-3 p-md-5   border-warning ">
        <div className="text-center fs-1 text-capitalize fw-bolder">
          {"siparişi onayla"}
         <p>"total price :"{totalPrice}</p> 
        </div>
        <p>{car?.modelName}</p>
        <div>
         
        

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-warning" onClick={()=>handleOnSubmit(rentalState)}>
                    Kiralama onayla
                  </button>
                </div>
            
            
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
