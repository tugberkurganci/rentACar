import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
type Props = {};

const OrderComplete = (props: Props) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { rental } = location.state || {};

  return (
    <div className="container d-flex justify-content-center align-items-start">
      <div className="row w-75">
        <div className="card align-items-center py-3 d-flex flex-column flex-md-row">
          <div className="card-body ">
            <h3 className="card-title text-center fw-bolder">{t("ok")}</h3>
            <p className="card-text">
              <span className="fs-5 text-success"> {t("invoice")} No :</span>
              <span className="fs-5"> {rental.id}</span>
            </p>
            <p className="card-text">
              <span className="fs-5 text-success"> {t("rentdate")} : </span>
              <span className="fs-5"> {rental.startDate}</span>
            </p>
            <p className="card-text">
              <span className="fs-5 text-success"> {t("dropdate")}: </span>
              <span className="fs-5"> {rental.endDate}</span>
            </p>
            <p className="card-text">
              <span className="fs-5 text-success">
                {" "}
                {t("total")} {t("price")} :{" "}
              </span>
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
          <Link to={"/"} className="text-light text-decoration-none">
            <div>{t("look")}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
