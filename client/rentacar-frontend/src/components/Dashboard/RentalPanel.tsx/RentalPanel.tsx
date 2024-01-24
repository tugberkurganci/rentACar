import { useEffect, useState } from "react";
import { RentalModel } from "../../../models/RentalModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import Pagination from "../../Pagination/Pagination";

type Props = {};

const RentalPanel = (props: Props) => {
  const [rentalList, setRentalList] = useState<RentalModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (selectedPage: any) => {
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
  };
  const fetchRentals = async () => {
    try {
      const response = await axiosInstance.get(
        `v1/rentals/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      setTotalPages(response.data.totalPages);
      setRentalList(response.data.content);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const handleChangeUpdateBtn = (user: RentalModel) => {
    setEditable(!editable);
    setInitialValues(user);
  };
  const handleUpdateCar = async (
    values: RentalModel,
    { setErrors }: FormikHelpers<RentalModel>
  ) => {
    console.log(values);

    try {
      const response = await axiosInstance.put(`/v1/rentals`, values);
      toast.success("Rental updated successfully");
      console.log(response);
      setEditable(!editable);
      fetchRentals();
      setInitialValues({
        id: 1,
        carId: 0,
        endDate: "",
        endKilometer: 0,
        returnDate: "",
        startKilometer: 0,
        startDate: "",
        totalPrice: 0,
        userId: 0,
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
  const handleDeleteCar = async (car: RentalModel) => {
    try {
      const response = await axiosInstance.delete(`/v1/rentals/${car.id}`);
      toast.success("Rental deleted successfully");
      fetchRentals();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const [initialValues, setInitialValues] = useState<RentalModel>({
    id: 1,
    carId: 0,
    endDate: "",
    endKilometer: 0,
    returnDate: "",
    startKilometer: 0,
    startDate: "",
    totalPrice: 0,
    userId: 0,
  });

  const validationSchema = Yup.object({
    carId: Yup.number().required("Car ID is required"),
    endDate: Yup.string().required("End Date is required"),
    endKilometer: Yup.number().required("End Kilometer is required"),
    returnDate: Yup.string().required("Return Date is required"),
    startKilometer: Yup.number().required("Start Kilometer is required"),
    startDate: Yup.string().required("Start Date is required"),
    totalPrice: Yup.number().required("Total Price is required"),
    userId: Yup.number().required("User ID is required"),
  });
  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchRentals();
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
              <th scope="col">Rental ID</th>
              <th scope="col">Car ID</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Return Date</th>
              <th scope="col">Start Kilometer</th>
              <th scope="col">End Kilometer</th>
              <th scope="col">Total Price</th>
              <th scope="col">User ID</th>
            </tr>
          </thead>

          <tbody>
            {rentalList.map((rental) => (
              <tr className="w-100 " key={rental.id}>
                <th scope="row">{rental.id}</th>
                <td>{rental.carId}</td>
                <td>{rental.startDate}</td>
                <td>{rental.endDate}</td>
                <td>{rental.returnDate ? rental.returnDate : "-"}</td>
                <td>{rental.startKilometer}</td>
                <td>{rental.endKilometer ? rental.endKilometer : "-"}</td>
                <td>{rental.totalPrice}</td>
                <td>{rental.userId}</td>

                <td>
                  <button
                    className="me-2 btn btn-primary"
                    onClick={() => handleChangeUpdateBtn(rental)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCar(rental)}
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
                    label="Car ID"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.carId}
                    name="carId"
                    type="number"
                  />
                </div>

                <div className="col">
                  <FormikInput
                    label="Start Date"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.startDate}
                    name="startDate"
                    type="date"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="End Date"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.endDate}
                    name="endDate"
                    type="date"
                  />
                </div>

                <div className="col">
                  <FormikInput
                    label="Return Date"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.returnDate}
                    name="returnDate"
                    type="date"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="Start Kilometer"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.startKilometer}
                    name="startKilometer"
                    type="number"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="End Kilometer"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.endKilometer}
                    name="endKilometer"
                    type="number"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="Total Price"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.totalPrice}
                    name="totalPrice"
                    type="number"
                  />
                </div>
                <div className="col">
                  <FormikInput
                    label="User ID"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.userId}
                    name="userId"
                    type="number"
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

export default RentalPanel;
