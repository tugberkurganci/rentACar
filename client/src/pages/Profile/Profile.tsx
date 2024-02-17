import { useEffect, useState } from "react";
import { RentalModel } from "../../models/RentalModel";
import { GoTriangleDown } from "react-icons/go";
import { InvoiceModel } from "../../models/InvoiceModel";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { useTranslation } from "react-i18next";
import { UserModel } from "../../models/UserModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../store/authStore/authSlice";
import UserUpdate from "../../components/Dashboard/UserPanel/UserUpdate";
import { TbArrowBigRightLineFilled } from "react-icons/tb";

type Props = {};

const Profile = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<number>(2);
  const [rentals, setRentals] = useState<RentalModel[]>();
  const [invoice, setInvoice] = useState<InvoiceModel[]>([]);
  const [user, setUser] = useState<UserModel>();
  const [openInvoiceId, setOpenInvoiceId] = useState<number>(0);
  const [editable, setEditable] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(`/v1/users/${authState.id}`);
      setUser(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const fetchRentals = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/rentals/rentals-userid?user=${authState.id}`
      );
      setRentals(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const fetchInvoice = async (rentalId: number) => {
    try {
      // Assuming you have an API endpoint to fetch invoice by rental ID
      const invoiceResponse = await axiosInstance.get(
        `/v1/invoices/invoices-rentalid?rental=${rentalId}`
      );
      setInvoice(invoiceResponse.data);
      // Handle the invoice data as needed
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  const handleAsideClick = (id: number) => {
    setIsClicked(id);
  };
  useEffect(() => {
    fetchRentals();
    fetchUser();
  }, [editable]);

  const handleDetailbutton = (id: number) => {
    fetchInvoice(id);
    // setIsDropped(!isDropped);
    if (openInvoiceId === id) {
      setOpenInvoiceId(0); // Eğer aynı rentalId'ye sahip invoice zaten açıksa kapat
    } else {
      setOpenInvoiceId(id); // Değilse yeni invoice'ı aç
    }
  };

  const userDeleteBtn = async () => {
    const confirmation = confirm("Are you sure you want to delete?");

    if (confirmation) {
      try {
        const response = await axiosInstance.delete(`/v1/users/${user?.id}`);
        toast.success("deleted successfully");

        dispatch(logoutSuccess());

        navigate("/");
      } catch (error: any) {
        toast.error(error?.response.data.message);
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-start w-100  align-items-center">
      <div className="d-flex justify-content-center w-100 flex-column flex-md-row gap-3">
        {/* Aside-Start */}
        <div className=" col-md-2  d-flex flex-row flex-md-column gap-1 ">
          <div
            className={`btn ${
              isClicked === 1 ? "btn-warning" : "btn-primary"
            }   `}
            onClick={() => handleAsideClick(1)}
          >
            {t("rentals")}
          </div>
          <div
            className={`btn ${
              isClicked === 2 ? "btn-warning" : "btn-primary"
            }   `}
            onClick={() => handleAsideClick(2)}
          >
            {t("account")}
          </div>
        </div>
        {/* Aside-End */}
        {/* Main-Start */}
        <div className="col-12 ps-4 d-flex col-md-9">
          {/* Rentals-Start */}
          <div className={`${isClicked === 1 ? "d-flex" : "d-none"}  row `}>
            {rentals?.map((rental) => {
              return (
                <div
                  key={rental.id}
                  className=" border d-flex border-3 row  bg-secondary-subtle rounded  justify-content-center align-items-center mb-3"
                >
                  <div className=" col-12 col-md-6   w-100  mb-3 d-flex flex-column gap-2 fw-semibold">
                    <div className="text-center fs-1 text-capitalize d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                      <span>{t("rentalIdLabel")}</span>
                      <span>{rental?.id}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2  border-bottom border-dark rounded p-2">
                      <span className="col-5 text-center text-light p-1 bg-success rounded">
                        {t("carIdLabel")}
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-5">{rental?.carId}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-dark rounded p-2">
                      <span className="col-5 text-center text-light p-1 bg-success rounded">
                        {t("startDateLabel")}
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-5">{rental?.startDate}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-dark rounded p-2">
                      <span className="col-5 text-center text-light p-1 bg-success rounded">
                        {t("endDateLabel")}
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-5">{rental?.endDate}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-dark rounded p-2">
                      <span className="col-5 text-center text-light p-1 bg-success rounded">
                        {t("totalPriceLabel")}
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-5">{rental?.totalPrice}</span>
                    </div>
                    <div
                      className={`${
                        rental.returnDate ? "d-flex" : "d-none"
                      } flex-row align-items-center gap-2 border-bottom border-dark rounded p-2`}
                    >
                      <span className="col-5 text-center text-light p-1 bg-success rounded">
                        {t("returnDateLabel")}
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-5">{rental?.returnDate}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 border-bottom border-dark rounded p-2">
                      <span className="col-5 text-center text-light p-1 bg-success rounded">
                        {t("startKilometerLabel")}
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-5">{rental?.startKilometer}</span>
                    </div>
                    <div
                      className={`${
                        rental.endKilometer ? "d-flex" : "d-none"
                      } flex-row align-items-center gap-2 border-bottom border-dark rounded p-2`}
                    >
                      <span className="col-5 text-center text-light p-1 bg-success rounded">
                        {t("endKilometerLabel")} :
                      </span>
                      <TbArrowBigRightLineFilled color="black" />
                      <span className="col-5">{rental?.endKilometer}</span>
                    </div>
                    {/* Show/Hide invoice Button start */}
                    <div className="d-flex flex-row justify-content-center  justify-content-md-start mt-3 ">
                      <button
                        onClick={() => handleDetailbutton(rental.id)}
                        className={`btn btn-primary row d-flex flex-row  align-items-center`}
                      >
                        <div className="col-10">
                          {openInvoiceId === rental.id
                            ? t("hideInvoice")
                            : t("showInvoice")}
                        </div>
                        <div
                          className={` col-2   rotate ${
                            openInvoiceId === rental.id
                              ? "start-rotation rotate-180"
                              : ""
                          }`}
                        >
                          <GoTriangleDown size={"3rem"} />
                        </div>
                      </button>
                    </div>
                    {/* Show/Hide invoice Button end */}
                    {/* Invoce Start */}
                    {invoice.map((ivoice) => {
                      return (
                        openInvoiceId === rental.id &&
                        ivoice?.rentalId === rental.id && (
                          <div
                            key={rental.id}
                            className={`card mt-3 expanded w-100 start-height mb-3  `}
                          >
                            <div className="card-body">
                              <div>
                                <h5 className="card-title text-center border border-2 bg-warning p-1 ">
                                  {t("invoiceDetails")}
                                </h5>
                              </div>
                              <div className="d-flex align-items-center border-bottom gap-2 p-2">
                                <span className="col-5 text-center text-light p-1 bg-success rounded">
                                  {t("invoice")} ID
                                </span>
                                <TbArrowBigRightLineFilled color="black" />
                                <span className="col-5">{ivoice?.id}</span>
                              </div>
                              <div className="d-flex align-items-center border-bottom gap-2 p-2">
                                <span className="col-5 text-center text-light p-1 bg-success rounded">
                                  {t("rentalId")}
                                </span>
                                <TbArrowBigRightLineFilled color="black" />
                                <span className="col-5">
                                  {ivoice?.rentalId}
                                </span>
                              </div>
                              <div className="d-flex align-items-center border-bottom gap-2 p-2">
                                <span className="col-5 text-center text-light p-1 bg-success rounded">
                                  {t("createdDate")}
                                </span>
                                <TbArrowBigRightLineFilled color="black" />
                                <span className="col-5">
                                  {ivoice?.createDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                    {}
                    {invoice.length < 1 && !invoice && (
                      <div className="text-danger">{t("noInvoiceFound")}</div>
                    )}
                    {/* Invoce End */}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Rentals-End */}
          {/* Account-Start */}
          {editable ? (
            <UserUpdate user={user} editable={setEditable} />
          ) : (
            <div
              className={`
              ${isClicked === 2 ? "d-flex" : "d-none"} w-100  flex-column `}
            >
              <div className="card">
                <div className="profile-img">
                  <img
                    className=" rounded-top"
                    src={user?.image ? `/assets/${"user"}/${user?.image}` : ""}
                  />
                </div>
                <div className="card-body d-flex  flex-column gap-3">
                  <div className="text-capitalize justify-content-center d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                    <h5 className="card-title ">
                      {user?.name} {user?.surname}
                    </h5>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1 ">
                    <div className="col-4 text-center text-light p-1 bg-success rounded">
                      {t("email")}
                    </div>
                    <TbArrowBigRightLineFilled color="black" />
                    <span className="col-7">{user?.email}</span>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2 border-bottom border-2 rounded p-1">
                    <div className="col-4 text-center text-light p-1 bg-success rounded">
                      {t("date")}
                    </div>
                    <TbArrowBigRightLineFilled color="black" />
                    <span className="col-7">{user?.birthDate}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn col btn-primary"
                      onClick={() => {
                        setEditable(!editable);
                      }}
                    >
                      {t("edit")}
                    </button>
                    <button
                      className="btn col btn-danger ms-2"
                      onClick={() => userDeleteBtn()}
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Account-End */}
        </div>
        {/* Main-End */}
      </div>
    </div>
  );
};

export default Profile;
