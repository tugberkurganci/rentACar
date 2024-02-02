import { useEffect, useState } from "react";
import { UserModel } from "../../../models/UserModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import ReactPaginate from "react-paginate";
import "./userPanel.css";
import Pagination from "../../Pagination/Pagination";
import { useTranslation } from "react-i18next";
import Image from "../../CarImage/CarImage";
type Props = {};

const UserPanel = (props: Props) => {
  const { t } = useTranslation();
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [image, setImage] = useState<any>();

  const handlePageChange = (selectedPage: any) => {
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
  };
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/users/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      console.log(response)
      setTotalPages(response.data.totalPages);
      setUserList(response.data.content);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const handleChangeUpdateBtn = (user: UserModel) => {
    setEditable(!editable);
    setInitialValues(user);
  };
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
      fetchUsers();
      setEditable(!editable);
      setInitialValues({
        id: 1,
        name: "",
        surname: "",
        email: "",
        birthDate: "",
        password: "",
        image: "",
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
  const handleDeleteUser = async (user: UserModel) => {
    try {
      const response = await axiosInstance.delete(`/v1/users/${user.id}`);
      toast.success("User deleted successfully");
      fetchUsers();
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
    image: "",
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
  useEffect(() => {
    fetchUsers();
  }, [pageable]);

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex flex-column  justify-content-between align-items center"
    >
      {!editable && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">{t("user")} ID</th>
              <th scope="col">{t("picture")}</th>
              <th scope="col">{t("name")}</th>
              <th scope="col">{t("surname")}</th>
              <th scope="col">{t("email")}</th>
              <th scope="col">{t("date")}</th>
            </tr>
          </thead>

          <tbody>
            {userList.map((user) => (
              <tr className="w-100 " key={user.id}>
                <th scope="row">{user.id}</th>
                <td>
                  <Image source={user.image} model={"user"} />
                 
                </td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.birthDate}</td>
                <td></td>

                <td>
                  <button
                    className="me-2 btn btn-primary"
                    onClick={() => handleChangeUpdateBtn(user)}
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className=" btn btn-danger"
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!editable && (
        <div>
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
      {editable && (
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
                    onClick={() => setEditable(!editable)}
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
      )}
    </div>
  );
};

export default UserPanel;
