import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authStore/authSlice";
import axiosInstance, {
  setToken,
} from "../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type SignInFormValues = {
  email: string;
  password: string;
};

type Props = {};

const SignIn = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

      dispatch(loginSuccess(response.data.user));

      setToken(response.data.token.refreshToken);

      // Handle the response or redirect to another page if needed
      setResponseAlert("success"); // Set the alert type to success

      navigate("/");
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
        toast.error(error.response.data.message);
        setResponseAlert("danger");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" row d-flex col-12 col-md-8 col-xl-4 align-items-start justify-content-center ">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">{t("login")}</h5>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignInSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikInput label={t("email")} name="email" type="email" />
                <FormikInput
                  label={t("password")}
                  name="password"
                  type="password"
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? `${t("loading")}` : `${t("login")}`}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
