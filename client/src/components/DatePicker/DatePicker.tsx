import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import FormikInput from "../FormikInput/FormikInput";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import * as Yup from "yup";
import { CarSearchValues } from "../../models/CarSearchModel";
import { useDispatch } from "react-redux";
import { loadAuthState } from "../../store/storage";
import { loadRental } from "../../store/rentalStore/rentalSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LocationModel } from "../../models/LocationModel";
import FormikSelect from "../FormikSelect/FormikSelect";

type Props = {};

const DatePicker = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [initialValues, setInitialValues] = useState<CarSearchValues>({
    startDate: "",
    endDate: "",
    pickUpLocation: "",
    dropOffLocation: "",
  });

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required(`${t("veri")}`),
    startDate: Yup.string().required(`${t("veri")}`),
    endDate: Yup.string().required(`${t("veri")}`),
  });
  const handleOnSubmit = async (
    values: CarSearchValues,
    { setErrors, setSubmitting }: FormikHelpers<CarSearchValues>
  ) => {
    try {
      const response = await axiosInstance.post("/v1/cars/rentable-cars", {
        ...values,
      });
      dispatch(loadRental(values));
      //İf no response throw tastify error
      navigate(`/cars`, {
        state: { cars: response.data },
      });
      setInitialValues({
        startDate: "",
        endDate: "",
        pickUpLocation: "",
        dropOffLocation: "",
      });
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
        toast.error(error.response.data.message);
        if (!error.response.data.message)
          toast.error(error.response.statusText);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axiosInstance.get("v1/locations");
      setLocations(response.data);
    } catch (error) {}
  };
  const handleChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className="container mt-4">
            <div className="row">
              <FormikSelect
                label={t("pickuploc")}
                list={locations}
                name="name"
                targetName="pickUpLocation"
                onChange={(e: any) => {
                  handleChangeInput(handleChange, e, values);
                }}
              />

              <FormikSelect
                label={t("droppoffloc")}
                list={locations}
                name="name"
                targetName="dropOffLocation"
                onChange={(e: any) => {
                  handleChangeInput(handleChange, e, values);
                }}
              />
              <FormikInput
                label={t("startdate")}
                name="startDate"
                type="date"
              />
              <FormikInput label={t("enddate")} name="endDate" type="date" />
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-warning"
                disabled={isSubmitting}
              >
                {isSubmitting ? `${t("loading")}` : `${t("datepicker")}`}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DatePicker;
