import { useEffect, useState } from "react";
import { CarModel } from "../../../models/CarModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import Pagination from "../../Pagination/Pagination";
type Props = {};

const CarPanel = (props: Props) => {
  const [carList, setCarList] = useState<CarModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (selectedPage: any) => {
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
  };
  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get(
        `v1/cars/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      setTotalPages(response.data.totalPages);
      setCarList(response.data.content);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const handleChangeUpdateBtn = (user: CarModel) => {
    setEditable(!editable);
    setInitialValues(user);
  };
  const handleUpdateCar = async (
    values: CarModel,
    { setErrors }: FormikHelpers<CarModel>
  ) => {
    console.log(values);

    try {
      const response = await axiosInstance.put(`/v1/cars`, values);
      toast.success("Car updated successfully");
      console.log(response);
      setEditable(!editable);
      fetchCars();
      setInitialValues({
        id: 1,
        modelName: 0,
        colorName: 0,
        dailyPrice: 0,
        kilometer: 0,
        plate: "",
        year: 0,
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
  const handleDeleteCar = async (car: CarModel) => {
    try {
      const response = await axiosInstance.delete(`/v1/cars/${car.id}`);
      toast.success("Car deleted successfully");
      fetchCars();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const [initialValues, setInitialValues] = useState<CarModel>({
    id: 1,
    modelName: 0,
    colorName: 0,
    dailyPrice: 0,
    kilometer: 0,
    plate: "",
    year: 0,
  });

  const validationSchema = Yup.object({
    modelName: Yup.string().required("Model Name is required"),
    colorName: Yup.string().required("Color Name is required"),
    dailyPrice: Yup.number()
      .moreThan(0, "Daily Price must be greater than 0")
      .required("Daily Price is required"),
    kilometer: Yup.number().required("Kilometer is required"),
    plate: Yup.string().required("Plate is required"),
    year: Yup.number()
      .moreThan(0, "Year must be greater than 0")
      .required("Year is required"),
  });
  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchCars();
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
              <th scope="col">User ID</th>
              <th scope="col">Model Name</th>
              <th scope="col">Kilometer</th>
              <th scope="col">Color</th>
              <th scope="col">Daily Price</th>
              <th scope="col">Plate</th>
              <th scope="col">Model Year</th>
            </tr>
          </thead>

          <tbody>
            {carList.map((car) => (
              <tr className="w-100 " key={car.id}>
                <th scope="row">{car.id}</th>
                <td>{car.modelName}</td>
                <td>{car.kilometer}</td>
                <td>{car.colorName}</td>
                <td>{car.dailyPrice}</td>
                <td>{car.plate}</td>
                <td>{car.year}</td>
                <td>
                  <button
                    className="me-2 btn btn-primary"
                    onClick={() => handleChangeUpdateBtn(car)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car)}
                    className=" btn btn-danger"
                  >
                    Delete
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
            onSubmit={handleUpdateCar}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form className="  w-50">
                <div>
                  <FormikInput
                    label="Model Name"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.modelName}
                    name="modelName"
                    type="number"
                  />
                </div>

                <div className="col">
                  <FormikInput
                    label="Kilometer"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.kilometer}
                    name="kilometer"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="Color"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.colorName}
                    name="colorName"
                    type="number"
                  />
                </div>

                <div className="col">
                  <FormikInput
                    label="Daily Price"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.dailyPrice}
                    name="dailyPrice"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="Plate Number"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.plate}
                    name="plate"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="Model Year"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.year}
                    name="year"
                  />
                </div>

                <div className="col  d-flex justify-content-between">
                  <button
                    onClick={() => setEditable(!editable)}
                    className="btn btn-danger "
                  >
                    Vazgeç
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

export default CarPanel;
