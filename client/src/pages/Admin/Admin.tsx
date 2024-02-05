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
    <div className="d-flex flex-column flex-md-row w-100 mx-md-5 ">
      <div className="col-2 pe-5  d-flex flex-row flex-md-column gap-2 ">
        <div
          className="btn btn-primary d-flex flex-md-row   mb-2"
          onClick={() => setSection("user")}
        >
          {t("users")}
        </div>
        <div
          className="btn  btn-primary d-flex flex-md-row mb-2"
          onClick={() => setSection("car")}
        >
          {t("cars")}
        </div>
        <div
          className="btn  btn-primary d-flex flex-md-row mb-2"
          onClick={() => setSection("models")}
        >
          {t("models")}
        </div>

        <div
          className="btn btn-primary d-flex flex-md-row mb-2"
          onClick={() => setSection("rental")}
        >
          {t("rentalss")}
        </div>
      </div>
      <div className="col-10  p-0 ">
        {section == "user" && <UserPanel />} {section == "car" && <CarPanel />}
        {section == "rental" && <RentalPanel />}
        {section == "models" && <ModelPanel />}
      </div>
    </div>
  );
};

export default Admin;
