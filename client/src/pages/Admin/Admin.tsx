import React, { useState } from "react";
import UserPanel from "../../components/Dashboard/UserPanel/UserPanel";
import CarPanel from "../../components/Dashboard/CarPanel/CarPanel";
import RentalPanel from "../../components/Dashboard/RentalPanel/RentalPanel";
import ModelPanel from "../../components/Dashboard/ModelPanel/ModelPanel";
import { useTranslation } from "react-i18next";

type Props = {};

const Admin = (props: Props) => {
  const [section, setSection] = useState<string>("user");
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column flex-md-row w-100 mx-md-5">
      <div className=" col-12 col-md-3 col-xl-2 pe-md-5 d-flex flex-row flex-md-column gap-2 overflow-x-scroll ">
        <div
          className={`btn  ${
            section === "user" ? "btn-warning" : "btn-primary"
          } d-flex w-100   mb-2`}
          onClick={() => setSection("user")}
        >
          {t("users")}
        </div>
        <div
          className={`btn ${
            section === "car" ? "btn-warning" : "btn-primary"
          } d-flex flex-md-row mb-2`}
          onClick={() => setSection("car")}
        >
          {t("cars")}
        </div>
        <div
          className={`btn  ${
            section === "models" ? "btn-warning" : "btn-primary"
          } d-flex flex-md-row mb-2`}
          onClick={() => setSection("models")}
        >
          {t("models")}
        </div>

        <div
          className={`btn  ${
            section === "rental" ? "btn-warning" : "btn-primary"
          } d-flex flex-md-row mb-2`}
          onClick={() => setSection("rental")}
        >
          {t("rentalss")}
        </div>
      </div>
      <div className="col-12  col-md-9 col-xl-10  p-0 ">
        {section == "user" && <UserPanel />}
        {section == "car" && <CarPanel />}
        {section == "rental" && <RentalPanel />}
        {section == "models" && <ModelPanel />}
      </div>
    </div>
  );
};

export default Admin;
