import React, { useEffect, useState } from "react";
import { RentalModel } from "../../models/RentalModel";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { InvoiceModel } from "../../models/InvoiceModel";
import "./profile.css";
import { DiVim } from "react-icons/di";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { useTranslation } from "react-i18next";
import { UserModel } from "../../models/UserModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../store/authStore/authSlice";
import * as Yup from "yup";
import ProfileUpdate from "./ProfileUpdate";

type Props = {};

const Profile = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<number>(1);
  const [rentals, setRentals] = useState<RentalModel[]>();
  const [invoice, setInvoice] = useState<InvoiceModel[]>([]);
  const [user, setUser] = useState<UserModel>();
  const [openInvoiceId, setOpenInvoiceId] = useState<number>(0);
  const [editable, setEditable] = useState<boolean>(false);

  
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(`/v1/users/${authState.id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRentals = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/rentals/rentals-userid?user=${authState.id}`
      );
      setRentals(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInvoice = async (rentalId: number) => {
    try {
      // Assuming you have an API endpoint to fetch invoice by rental ID
      const invoiceResponse = await axiosInstance.get(
        `/v1/invoices/invoices-rentalid?rental=${rentalId}`
      );
      setInvoice(invoiceResponse.data);

      //   console.log("Invoice:", invoiceResponse.data);
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

  const userDeleteBtn= async ()=>{
  confirm()
  try {
    const response = await axiosInstance.delete(`/v1/users/${user?.id}`);
    toast.success( "deleted successfully");
    dispatch(logoutSuccess());
    navigate("/")
    
  } catch (error: any) {
    toast.error(error?.response.data.message);
  }
  
  }

  useEffect(() => {
    console.log(rentals)
  }, [rentals])
  

  return (
    <div className="container ">
      <div className="row">
        {/* Aside-Start */}
        <div className="col-2  d-flex flex-column row-gap-2 me-3 ">
          <div
            className="btn btn-primary row "
            onClick={() => handleAsideClick(1)}
          >
            {t("rentals")}
          </div>
          <div
            className="btn btn-primary row "
            onClick={() => handleAsideClick(2)}
          >
            {t("account")}
          </div>
        </div>
        {/* Aside-End */}
        {/* Main-Start */}
        <div className="  col-9 ">
          {/* Siparişler-Start */}
          <div className={`${isClicked === 1 ? "d-flex" : "d-none"} row `}>
            {rentals?.map((rental) => {
              return (
                <div
                  key={rental.id}
                  className="  row  justify-content-start align-items-center mb-3"
                >
                  <div className="col-12 col-md-6 border-bottom  w-100  border-start  rounded border-3 p-md-5   border-warning">
                    <div className="text-center fs-1 text-capitalize fw-bolder">
                      <span className="fw-bold">{t("rentalIdLabel")}</span>
                      {rental?.id}
                    </div>
                    <div>
                      <span className="fw-bold">{t("carIdLabel")}</span>
                      {rental?.carId}
                    </div>
                    <div>
                      <span className="fw-bold">{t("startDateLabel")}</span>
                      {rental?.startDate}
                    </div>
                    <div>
                      <span className="fw-bold">{t("endDateLabel")}</span>
                      {rental?.endDate}
                    </div>
                    <div>
                      <span className="fw-bold">{t("totalPriceLabel")}</span>
                      {rental?.totalPrice}
                    </div>
                    <div>
                      <span className="fw-bold">{t("returnDateLabel")}</span>
                      {rental?.returnDate}
                    </div>
                    <div>
                      <span className="fw-bold">
                        {t("startKilometerLabel")}
                      </span>
                      {rental?.startKilometer}
                    </div>
                    <div
                      className={`${rental.endKilometer ? "d-flex" : "d-none"}`}
                    >
                      <span className="fw-bold">
                        {" "}
                        {t("endKilometerLabel")} :{" "}
                      </span>
                      {rental?.endKilometer}
                    </div>
                    {/* Show/Hide invoice Button start */}
                    <div className="d-flex flex-row   justify-content-start mt-3 ">
                      <button
                        onClick={() => handleDetailbutton(rental.id)}
                        className={`btn btn-primary row d-flex flex-row  align-items-center `}
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
                            className={`card mt-3 expanded start-height mb-3  `}
                          >
                            <div className="card-body">
                              <h5 className="card-title">
                                {t("invoiceDetails")}
                              </h5>
                              <p className="card-text">
                                {t("invoice")} ID: {ivoice?.id}
                              </p>
                              <p className="card-text">
                                {t("rentalId")}: {ivoice?.rentalId}
                              </p>
                              <p className="card-text">
                                {t("createdDate")}: {ivoice?.createDate}
                              </p>
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
          {/* Siparişler-End */}
          {/* HesapDetayları-Start */}
          {editable? (<ProfileUpdate user={user} setEditab={setEditable}/>):(<div
            className={`${isClicked === 2 ? "d-flex" : "d-none"} flex-column`}
          >
            <div className="card" style={{ width: "24rem" }}>
            <img src="https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600nw-149083895.jpg" className="card-img-top" alt="Profil Resmi" />
              <div className="card-body">
                <h5 className="card-title">
                  {user?.name} {user?.surname}
                </h5>
                <p className="card-text">
                  <strong>
                    {" "}
                    {t("email")} {t("createdDate")}
                  </strong>{" "}
                  {user?.email}
                </p>
                <p className="card-text">
                  <strong>{t("date")} </strong> {user?.birthDate}
                </p>
                <button className="btn btn-primary" onClick={()=>{setEditable(!editable)}}>{t("edit")} </button>
                <button className="btn btn-danger ms-2" onClick={()=> userDeleteBtn()}>{t("delete")}</button>
              </div>
            </div>
          </div>) }
          {/* HesapDetayları-End */}
        </div>
        {/* Main-End */}
      </div>
    </div>
  );
};

export default Profile;
