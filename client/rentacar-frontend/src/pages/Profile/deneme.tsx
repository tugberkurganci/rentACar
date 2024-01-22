import React, { useEffect, useState } from "react";
import { RentalModel } from "../../models/RentalModel";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { InvoiceModel } from "../../models/InvoiceModel";
import "./profile.css";
import { DiVim } from "react-icons/di";
import { useSelector } from "react-redux";
type Props = {};

const Profile = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);
  const [isClicked, setIsClicked] = useState<number>(2);
  const [rentals, setRentals] = useState<RentalModel[]>();
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<Invoice>();
  const [user, setUser] = useState();
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
    if (id === 1) {
      fetchRentals();
    } else if (id === 2) {
      fetchUser();
    }
  };
  const handleDetailbutton = (id: number) => {
    fetchInvoice(id);
    setIsDropped(!isDropped);
  };

  return (
    <div className="container ">
      <div className="row">
        {/* Aside-Start */}
        <div className="col-2  d-flex flex-column row-gap-2 me-3 ">
          <div
            className="btn btn-primary row "
            onClick={() => handleAsideClick(1)}
          >
            Siparişlerim
          </div>
          <div
            className="btn btn-primary row "
            onClick={() => handleAsideClick(2)}
          >
            Hesabım
          </div>
        </div>
        {/* Aside-End */}
        {/* Main-Start */}
        <div className="  col-9">
          {/* Siparişler-Start */}
          <div className={`${isClicked === 1 ? "d-flex" : "d-none"} row`}>
            {rentals?.map((rental) => {
              return (
                <div
                  key={rental.id}
                  className="  row  justify-content-center align-items-center mb-3"
                >
                  <div className="col-12 col-md-6 border-bottom  border-start  rounded border-3 p-md-5   border-warning">
                    <div className="text-center fs-1 text-capitalize fw-bolder">
                      <span>Rental Id : </span>
                      {rental?.id}
                    </div>
                    <div>
                      <span className="fw-bold">Araç Id : </span>
                      {rental?.carId}
                    </div>
                    <div>
                      <span className="fw-bold">
                        Kiralama başlangıç tarihi :
                      </span>
                      {rental?.startDate}
                    </div>
                    <div>
                      <span className="fw-bold">Kiralama bitiş tarihi : </span>
                      {rental?.endDate}
                    </div>
                    <div>
                      <span className="fw-bold">Toplam fiyat : </span>
                      {rental?.totalPrice}
                    </div>
                    <div>
                      <span className="fw-bold"> Araç teslim tarihi: </span>
                      {rental?.returnDate}
                    </div>
                    <div>
                      <span className="fw-bold">Başlangıç kilometresi : </span>
                      {rental?.startKilometer}
                    </div>
                    <div
                      className={`${rental.endKilometer ? "d-flex" : "d-none"}`}
                    >
                      <span className="fw-bold"> Bitiş kilometresi: </span>
                      {rental?.endKilometer}
                    </div>
                    {/* Invoce Start */}
                    {/* invoice.rentalId === rental.id && */}
                    {invoice &&
                      isDropped &&
                      invoice[0].rentalId === rental.id && (
                        <div
                          className={`card mt-3  ${
                            isDropped
                              ? "expanded start-height "
                              : "expanded end-height "
                          }`}
                        >
                          <div className="card-body">
                            <h5 className="card-title">Invoice Details</h5>
                            <p className="card-text">
                              Rental Id: {invoice[0]?.rentalId}
                            </p>
                            <p className="card-text">
                              Created Date: {invoice[0]?.createDate}
                            </p>
                          </div>
                        </div>
                      )}
                    {!invoice && isDropped && (
                      <div className="text-danger">Fatura Bulunamadı</div>
                    )}
                    {/* Invoce End */}
                    <div className="d-flex flex-row justify-content-center mt-3 ">
                      <button
                        onClick={() => handleDetailbutton(rental.id)}
                        className={`btn btn-primary mx-2 w-100 d-flex flex-column  align-items-center `}
                      >
                        <div className="row">
                          {isDropped
                            ? "Faturayı gizle... "
                            : "Faturayı görüntüle..."}
                        </div>
                        <div
                          className={` row mx-2 w-100  rotate ${
                            isDropped ? "start-rotation rotate-180" : ""
                          }`}
                        >
                          <GoTriangleDown />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Siparişler-End */}
          {/* HesapDetayları-Start */}
          <div
            className={`${isClicked === 2 ? "d-flex" : "d-none"} flex-column`}
          >
            <div>Halil</div>
            <div>Koçoğlu</div>
            <div>aaa@test.com</div>
            <div>15.25.1990</div>
          </div>
          {/* HesapDetayları-End */}
        </div>
        {/* Main-End */}
      </div>
    </div>
  );
};

export default Profile;
