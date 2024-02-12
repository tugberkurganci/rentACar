import { useEffect, useState } from "react";
import { RentalModel } from "../../../models/RentalModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import Pagination from "../../Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { TbArrowBigRightLineFilled } from "react-icons/tb";

type Props = {};

const RentalPanel = (props: Props) => {
  const [rentalList, setRentalList] = useState<RentalModel[]>([]);
  const { t } = useTranslation();
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
  const handleDeleteRental = async (car: RentalModel) => {
    const confirmation = confirm("Are you sure you want to delete?");
    if (confirmation) {
      try {
        const response = await axiosInstance.delete(`/v1/rentals/${car.id}`);
        toast.success("Rental deleted successfully");
        fetchRentals();
      } catch (error: any) {
        toast.error(error?.response.data.message);
      }
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
    carId: Yup.number().required(`${t("veri")}`),
    endDate: Yup.string().required(`${t("veri")}`),
    endKilometer: Yup.number().nullable(),
    returnDate: Yup.string().nullable(),
    startKilometer: Yup.number().required(`${t("veri")}`),
    startDate: Yup.string().required(`${t("veri")}`),
    totalPrice: Yup.number().required(`${t("veri")}`),
    userId: Yup.number().required(`${t("veri")}`),
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
      className="d-flex flex-column overflow-x-scroll justify-content-between align-items center"
    >
      {!editable && (
        <div className="col-12 d-flex">
          {/* Data-section-Mobile-Start */}
          <div className="d-md-none col-12">
            {rentalList.map((rental) => (
              <div className="card w-100 mb-3" key={rental.id}>
                <div className="card-body ">
                  <div className="mb-3 d-flex flex-column gap-2 fw-semibold">
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Rental ID
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.id}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Car ID
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.carId}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        User ID
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.userId}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Start Date
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.startDate}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        End Date
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.endDate}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Return Date
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">
                        {rental.returnDate ? rental.returnDate : "-"}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Start Kilometer
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.startKilometer}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        End Kilometer
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">
                        {rental.endKilometer ? rental.endKilometer : "-"}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Total price
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.totalPrice}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Drop Off Office
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.dropOffLocation}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span className=" col-5 text-center text-light p-1 bg-success rounded">
                        Pick Up Office
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-6">{rental.pickUpLocation}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between px-3 t-3">
                    <button
                      className="me-2 btn btn-primary"
                      onClick={() => handleChangeUpdateBtn(rental)}
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => handleDeleteRental(rental)}
                      className=" btn btn-danger"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Data-section-Mobile-End */}
          {/* Data-section-MD-Start */}

          <table className="table table-striped-columns d-none d-md-table">
            <thead>
              <tr>
                <th className="center-text" scope="col">
                  {t("rentalIdLabel")}{" "}
                </th>
                <th className="center-text" scope="col">
                  {t("carIdLabel")}
                </th>
                <th className="center-text" scope="col">
                  {t("startDateLabel")}
                </th>
                <th className="center-text" scope="col">
                  {t("endDateLabel")}
                </th>
                <th className="center-text" scope="col">
                  {t("returnDateLabel")}
                </th>
                <th className="center-text" scope="col">
                  {t("startKilometerLabel")}
                </th>
                <th className="center-text" scope="col">
                  {t("endKilometerLabel")}
                </th>
                <th className="center-text" scope="col">
                  {t("totalPriceLabel")}
                </th>
                <th className="center-text" scope="col">
                  {t("dropofflocation")}
                </th>
                <th className="center-text" scope="col">
                  {t("pickuplocation")}
                </th>
                <th className="center-text" scope="col">
                  {t("user")} ID
                </th>
              </tr>
            </thead>

            <tbody>
              {rentalList.map((rental) => (
                <tr className="w-100 " key={rental.id}>
                  <th className="center-text" scope="row">
                    {rental.id}
                  </th>
                  <td className="center-text">{rental.carId}</td>
                  <td className="center-text">{rental.startDate}</td>
                  <td className="center-text">{rental.endDate}</td>
                  <td className="center-text">
                    {rental.returnDate ? rental.returnDate : "-"}
                  </td>
                  <td className="center-text">{rental.startKilometer}</td>
                  <td className="center-text">
                    {rental.endKilometer ? rental.endKilometer : "-"}
                  </td>
                  <td className="center-text">{rental.totalPrice}</td>
                  <td className="center-text">{rental.dropOffLocation}</td>
                  <td className="center-text">{rental.pickUpLocation}</td>
                  <td className="center-text">{rental.userId}</td>

                  <td className="center-text d-flex flex-wrap gap-1">
                    <button
                      className="me-2 btn btn-primary"
                      onClick={() => handleChangeUpdateBtn(rental)}
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => handleDeleteRental(rental)}
                      className=" btn btn-danger"
                    >
                      {t("delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Data-section-MD-Start */}
        </div>
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

export default RentalPanel;
