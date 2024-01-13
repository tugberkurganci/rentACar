import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

type Props = {};

const OrderComplete = (props: Props) => {
  const location = useLocation();
  const { rental } = location.state || {};
  useEffect(() => {
    console.log(rental);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h5 className="card-title">Sipariş Tamamlandı</h5>
            <p className="card-text">Kiralama Tarihi : {rental.startDate}</p>
            <p className="card-text">Teslim Tarihi : {rental.endDate}</p>
            <p className="card-text">Toplam Fiyat : {rental.totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
