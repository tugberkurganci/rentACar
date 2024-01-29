import React, { useState } from 'react';
import { UserModel } from '../../models/UserModel';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { Form, Formik, FormikHelpers } from 'formik';
import FormikInput from '../../components/FormikInput/FormikInput';
import { useTranslation } from 'react-i18next';

type Props = {user?:UserModel,setEditab:any}

const ProfileUpdate = ({user,setEditab}: Props) => {
    const {t}=useTranslation();
    const [editable, setEditable] = useState<boolean>(false);


    const handleChangeUpdateBtn = (user: UserModel) => {
        setEditable(!editable);
        setInitialValues(user);
    };

    const [initialValues, setInitialValues] = useState<UserModel>(user || {
        id: 1,
        name: "",
        surname: "",
        email: "",
        birthDate: "",
        password: "",
    });

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        birthDate: Yup.date().required("BirthDate is required"),
    });
    const handleUpdateUser = async (
        values: UserModel,
        { setErrors }: FormikHelpers<UserModel>
      ) => {
        try {
          const response = await axiosInstance.put(`/v1/users`, values);
          toast.success("User updated");
          console.log(response);
          setEditab(false);
          setInitialValues({
            id: 1,
            name: "",
            surname: "",
            email: "",
            birthDate: "",
            password: "",
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
            console.log(error);
          } else {
            toast.error(error.response.data.message);
          }
        }
      };
      const onChangeInput = (handleChange: any, e: any, values: any) => {
        handleChange(e);
        setInitialValues({ ...values, [e.target.name]: e.target.value });
      };

    return (
           <div
          style={{ minHeight: "80vh" }}
          className="d-flex flex-row justify-content-center align-items-center   "
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

                <div className="col  d-flex justify-content-between">
                  <button
                    onClick={() =>  setEditab(false)}
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

export default ProfileUpdate;
