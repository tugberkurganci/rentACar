import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CarModel } from "../../models/CarModel";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type Props = {};

type CarSearchValues = {
  startDate: string;
  endDate: string;
};

const Checkout = (props: Props) => {
  const { id } = useParams();
  const [car, setCar] = useState<CarModel>();
  
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
  }, []);
  
  
  
  const initialValues: CarSearchValues = {
    startDate: "",
    endDate: "",
  };

  const validationSchema = Yup.object({
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
  });

 

  const handleOnSubmit = async (values: CarSearchValues) => {
    try {
        console.log(id)
        const response=await axiosInstance.post("/v1/rentals",{
            carId:id,
            ...values,
            userId:2
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }

  };

  

  return (
    <div>
      <div></div>
      <div>
        <div>{car?.modelName}</div>
        <div>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            <Form className="container mt-4">
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    {"Rental Date"}
                  </label>
                  <Field
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    {"Return Date"}
                  </label>
                  <Field
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Kiralama onayla
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
