import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import FormikInput from "../../components/FormikInput/FormikInput";
import Alert from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type SignupFormValues = {
  email: string;
  name: string;
  surname: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

type Props = {};

const SignUp = (props: Props) => {
  const [responseAlert, setResponseAlert] = useState<string | null>(null);
  const navigate = useNavigate();
  const initialValues: SignupFormValues = {
    email: "",
    name: "",
    surname: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Name is required"),
    birthDate: Yup.string().required("Birth date is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignupSubmit = async (
    values: SignupFormValues,
    { setErrors, setSubmitting }: FormikHelpers<SignupFormValues>
  ) => {
    try {
      setSubmitting(true);
      setResponseAlert(null);

      const response = await axiosInstance.post("/v1/users", values);

      // Handle the response or redirect to another page if needed
      setResponseAlert("success"); // Set the alert type to success
      navigate("/login");
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
        // console.error("Signup failed:", error);
        setResponseAlert("danger");
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container w-100 d-flex align-items-center justify-content-center ">
      <div className="row  col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Sign Up</h5>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSignupSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormikInput label="Email" name="email" type="email" />
                  <FormikInput label="Name" name="name" />
                  <FormikInput label="Surname" name="surname" />
                  <FormikInput type="date" label="BirthDate" name="birthDate" />
                  <FormikInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <FormikInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />

                  {responseAlert && (
                    <Alert styleType={responseAlert}>
                      {responseAlert === "success"
                        ? "Signup successful!"
                        : "Signup failed. Please check your information."}
                    </Alert>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
