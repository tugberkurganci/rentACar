import React, { useEffect, useState } from "react";
import { RentalModel } from "../../models/RentalModel";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { InvoiceModel } from "../../models/InvoiceModel";
import axios from "axios";
type Props = {};

const Profile = (props: Props) => {
  const [isClicked, setIsClicked] = useState<number>(2);
  const [rentals, setRentals] = useState<RentalModel[]>();
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<InvoiceModel>();
  
  

  const fetchRentals = async () => {
    try {
      const response = await axiosInstance.get(`/v1/rentals/`);
      setRentals(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInvoice = async (rentalId: number) => {
    try {
      // Assuming you have an API endpoint to fetch invoice by rental ID
      const invoiceResponse = await axiosInstance.get(
        `/v1/invoices/${rentalId}`
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
                <div className="  row  justify-content-center align-items-center mb-3">
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
                    {invoice && isDropped && invoice.rentalId === rental.id && (
                      <div className="card mt-3">
                        <div className="card-body">
                          <h5 className="card-title">Invoice Details</h5>
                          <p className="card-text">
                            Rental Id: {invoice.rentalId}
                          </p>
                          <p className="card-text">
                            Created Date: {invoice.createDate}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Invoce End */}
                    <div className="d-flex flex-row justify-content-center mt-3 ">
                      <button
                        onClick={() => handleDetailbutton(rental.id)}
                        className={`btn btn-primary mx-2 w-100  `}
                      >
                        Faturayı görüntüle...
                        <div className={` mx-2 w-100`}>
                          {isDropped ? <GoTriangleUp /> : <GoTriangleDown />}
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
