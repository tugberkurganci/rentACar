import { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import FormikInput from "../../components/FormikInput/FormikInput";
import Alert from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/authStore/authSlice";

type SignInFormValues = {
  email: string;
  password: string;
};

type Props = {};

const SignIn = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: SignInFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const [responseAlert, setResponseAlert] = useState<string | null>(null);

  const handleSignInSubmit = async (
    values: SignInFormValues,
    { setErrors, setSubmitting }: FormikHelpers<SignInFormValues>
  ) => {
    try {
      setSubmitting(true);
      setResponseAlert(null);

      const response = await axiosInstance.post("/auth", values);
      console.log(response.data);

      dispatch(loginSuccess(response.data.user));

      // Handle the response or redirect to another page if needed
      setResponseAlert("success"); // Set the alert type to success

      navigate("/cars");
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
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Sign Up</h5>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignInSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <FormikInput label="Email" name="email" type="email" />
                    <FormikInput
                      label="Password"
                      name="password"
                      type="password"
                    />
                    // TODO: toaster
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
    </div>
  );
};

export default SignIn;
