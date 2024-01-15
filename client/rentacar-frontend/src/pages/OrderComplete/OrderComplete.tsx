import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
type Props = {};

const OrderComplete = (props: Props) => {
  const location = useLocation();
  const { rental } = location.state || {};
  useEffect(() => {
    console.log(rental);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row w-75">
        <div className="card align-items-center  d-flex flex-row">
          <div className="card-body ">
            <h3 className="card-title fw-bolder">Sipariş Tamamlandı</h3>
            <p className="card-text">
              <span className="fs-5 text-success"> Fatura No :</span>
              <span className="fs-5"> {rental.id}</span>
            </p>
            <p className="card-text">
              <span className="fs-5 text-success"> Kiralama Tarihi : </span>
              <span className="fs-5"> {rental.startDate}</span>
            </p>
            <p className="card-text">
              <span className="fs-5 text-success"> Teslim Tarihi : </span>
              <span className="fs-5"> {rental.endDate}</span>
            </p>
            <p className="card-text">
              <span className="fs-5 text-success"> Toplam Fiyat : </span>
              <span className="fs-5"> {rental.totalPrice}</span>
            </p>
          </div>
          <div>
            <div
              style={{ width: "100px", height: "100px" }}
              className="bg-warning d-flex rounded-circle ps-1 justify-content-center align-items-center"
            >
              <FaCheck size={"3em"} color="green" />
            </div>
          </div>
        </div>
        <div className="btn btn-success mt-3 ">
          <Link to={"/cars"} className="text-light text-decoration-none">
            Göz atmaya devam et
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
