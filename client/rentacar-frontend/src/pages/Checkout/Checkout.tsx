import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarModel } from "../../models/CarModel";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

type Props = {};

type CarSearchValues = {
  startDate: string;
  endDate: string;
};

const Checkout = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);
  const { id } = useParams();
  const [car, setCar] = useState<CarModel>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<CarSearchValues>({
    startDate: "",
    endDate: "",
  });
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
  }, []);

  const validationSchema = Yup.object({
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
  });

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
      setTotalPrice(0);
      setInitialValues({ startDate: "", endDate: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      initialValues.endDate &&
      initialValues.startDate &&
      initialValues.endDate > initialValues.startDate
    ) {
      fetchRentalTotalPrice(initialValues);
    }
  }, [initialValues]);

  const fetchRentalTotalPrice = async (values: any) => {
    try {
      const response = await axiosInstance.post("/v1/rentals/total", {
        ...values,
        carId: car?.id,
      });
      setTotalPrice(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            {({ values, handleChange, handleBlur }) => (
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
                      onChange={(e: any) => {
                        onChangeInput(handleChange, e, values);
                      }}
                      onBlur={handleBlur}
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
                      onChange={(e: any) => {
                        onChangeInput(handleChange, e, values);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  {totalPrice !== 0 && <div> Total Price : {totalPrice}</div>}
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-warning">
                    Kiralama onayla
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
