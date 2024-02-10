import { useState } from "react";
import { UserModel } from "../../../models/UserModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import "./userPanel.css";
import Pagination from "../../Pagination/Pagination";
import { useTranslation } from "react-i18next";

type Props = { editable: any; user?: UserModel };

const UserUpdate = ({ editable, user }: Props) => {
  const [image, setImage] = useState<any>();
  const { t } = useTranslation();

  const handleUpdateUser = async (
    values: UserModel,
    { setErrors }: FormikHelpers<UserModel>
  ) => {
    try {
      const response = await axiosInstance.put(`/v1/users`, {
        ...values,
        image: image,
      });
      toast.success("User updated");
      console.log(response);

      setInitialValues({
        id: 1,
        name: "",
        surname: "",
        email: "",
        birthDate: "",
        password: "",
        image: "",
      });
      editable(false);
    } catch (error: any) {
      if (error.response.data.validationErrors) {
        const validationErrors: Record<string, string> =
          error.response.data.validationErrors;
        const formikErrors: Record<string, string> = {};
        Object.entries(validationErrors).forEach(([field, message]) => {
          formikErrors[field] = message;
        });
        setErrors(formikErrors);
        console.log(error);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
  const [initialValues, setInitialValues] = useState<UserModel>(
    user || {
      id: 1,
      name: "",
      surname: "",
      email: "",
      birthDate: "",
      password: "",
      image: "",
    }
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(`${t("mailformat")}`)
      .required(`${t("veri")}`),
    name: Yup.string().required(`${t("veri")}`),
    surname: Yup.string().required(`${t("veri")}`),
    birthDate: Yup.date().required(`${t("veri")}`),
  });

  const onChangeInput = (handleChange: any, e: any, values: any) => {
    if (e.target.files === null) {
      handleChange(e);
      setInitialValues({ ...values, [e.target.name]: e.target.value });
    } else {
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const data = fileReader.result;

        setImage(data);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex w-100 justify-content-center align-items-center "
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdateUser}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form className="  w-50">
            <div>
              <FormikInput
                label="name"
                onChange={(e: any) => {
                  onChangeInput(handleChange, e, values);
                }}
                value={initialValues.name}
                name="name"
              />
            </div>

            <div className="col">
              <FormikInput
                label="surname"
                onChange={(e: any) => {
                  onChangeInput(handleChange, e, values);
                }}
                value={initialValues.surname}
                name="surname"
              />
            </div>
            <div className="col">
              <FormikInput
                label="email"
                onChange={(e: any) => {
                  onChangeInput(handleChange, e, values);
                }}
                value={initialValues.email}
                name="email"
                type="email"
              />
            </div>

            <div className="col">
              <FormikInput
                label="birthDate"
                onChange={(e: any) => {
                  onChangeInput(handleChange, e, values);
                }}
                value={initialValues.birthDate}
                name="birthDate"
                type="date"
              />
            </div>
            <div className="col">
              <FormikInput
                label="Password"
                onChange={(e: any) => {
                  onChangeInput(handleChange, e, values);
                }}
                value={initialValues.password}
                name="password"
                type="password"
              />
            </div>
            <div className="col">
              <FormikInput
                label="İmage"
                onChange={(e: any) => {
                  onChangeInput(handleChange, e, values);
                }}
                name="image"
                type="file"
              />
            </div>

            <div className="col  d-flex justify-content-between">
              <button
                onClick={() => editable(false)}
                className="btn btn-danger "
              >
                {t("giveup")}
              </button>
              <button
                type="submit"
                className="btn btn-primary "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdate;
