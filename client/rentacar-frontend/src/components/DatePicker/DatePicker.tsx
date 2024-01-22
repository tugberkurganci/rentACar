import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormikInput from "../FormikInput/FormikInput";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import * as Yup from "yup";
import { CarSearchValues } from "../../models/CarSearchModel";

type Props = {};

const DatePicker = (props: Props) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<CarSearchValues>({
    startDate: "",
    endDate: "",
  });
  const validationSchema = Yup.object({
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
  });
  const handleOnSubmit = async (values: CarSearchValues) => {
    try {
      const response = await axiosInstance.post("/v1/rentals**", {
        ...values,
      });
      //İf no response throw tastify error
      navigate(`/cars`, {
        state: { cars: response.data },
      });
      setInitialValues({ startDate: "", endDate: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {() => (
          <Form className="container mt-4">
            <div className="row">
              <FormikInput label="Start Date" name="startDate" type="date" />
              <FormikInput label="End Date" name="endDate" type="date" />
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
  );
};

export default DatePicker;
