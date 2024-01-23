import React, { useEffect, useState } from "react";
import { UserModel } from "../models/UserModel";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import FormikInput from "./FormikInput/FormikInput";

type Props = {};

const UserPanel = (props: Props) => {
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 1 });
  const [editable, setEditable] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/users/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      setUserList(response.data.content);
      console.log(response);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const handleUpdateUser = async (
    values: UserModel,
    { setErrors }: FormikHelpers<UserModel>
  ) => {
    try {
      const response = await axiosInstance.put(`/v1/users`, values);
      toast.success("User updated");
      console.log(response);
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
      }
    }
  };
  const handleDeleteUser = async (user: UserModel) => {
    try {
      const response = await axiosInstance.delete(`/v1/users/${user.id}`);

      console.log(response);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const [initialValues, setInitialValues] = useState<UserModel>({
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

  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchUsers();
    console.log(userList);
  }, [pageable]);

  return (
    <>
      <div>
        {userList.map((user) => (
          <div key={user.id}>
            {editable && (
              <div className="d-flex flex-row ">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdateUser}
                >
                  {({ isSubmitting, values, handleChange }) => (
                    <Form className="row">
                      <div className="col">
                       
                        <FormikInput
                          onChange={(e: any) => {
                            onChangeInput(handleChange, e, values);
                          }}
                          value={initialValues.email}
                          name="email"
                          type="email"
                        />
                      </div>

                      <div  className="col">
                        <FormikInput
                          onChange={(e: any) => {
                            onChangeInput(handleChange, e, values);
                          }}
                          value={initialValues.name}
                          name="name"
                        />
                      </div>

                      <div className="col">
                        <FormikInput
                          onChange={(e: any) => {
                            onChangeInput(handleChange, e, values);
                          }}
                          value={initialValues.surname}
                          name="surname"
                        />
                      </div>

                      <div  className="col">
                        <FormikInput
                          onChange={(e: any) => {
                            onChangeInput(handleChange, e, values);
                          }}
                          value={initialValues.birthDate}
                          name="birthDate"
                          type="date"
                        />
                      </div>
                      <div  className="col">
                        <FormikInput
                          onChange={(e: any) => {
                            onChangeInput(handleChange, e, values);
                          }}
                          value={initialValues.password}
                          name="password"
                          type="password"
                        />
                      </div>

                      <div className="col" >

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
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setPageable({ ...pageable, page: pageable.page + 1 })}
      >
        +
      </button>
      <button
        onClick={() => setPageable({ ...pageable, page: pageable.page - 1 })}
      >
        -
      </button>
    </>
  );
};

export default UserPanel;
