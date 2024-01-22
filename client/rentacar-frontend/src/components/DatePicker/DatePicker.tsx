import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormikInput from "../FormikInput/FormikInput";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import * as Yup from "yup";
import { CarSearchValues } from "../../models/CarSearchModel";
import { useDispatch } from "react-redux";
import { loadAuthState } from "../../store/storage";
import { loadRental } from "../../store/rentalStore/rentalSlice";
import { toast } from "react-toastify";

type Props = {};

const DatePicker = (props: Props) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [initialValues, setInitialValues] = useState<CarSearchValues>({
    startDate: "",
    endDate: "",
  });
  const validationSchema = Yup.object({
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
  });
  const handleOnSubmit = async (values: CarSearchValues, { setErrors, setSubmitting }: FormikHelpers<CarSearchValues>) => {
    try {
      const response = await axiosInstance.post("/v1/cars/rentable-cars", {
        ...values,
      });
      console.log(values)
      dispatch(loadRental(values))
      //İf no response throw tastify error
      navigate(`/cars`, {
        state: { cars: response.data },
      });
      setInitialValues({ startDate: "", endDate: "" });
    } catch (error: any) {
      if (error.response.data.validationErrors) {
        const validationErrors: Record<string, string> =
          error.response.data.validationErrors;
        const formikErrors: Record<string, string> = {};
        Object.entries(validationErrors).forEach(([field, message]) => {
          formikErrors[field] = message;
        });
        setErrors(formikErrors);
      } else {
        console.error("Signup failed:", error);
        toast.error(error.response.data.message)
        
      }
    } finally {
      setSubmitting(false);
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
