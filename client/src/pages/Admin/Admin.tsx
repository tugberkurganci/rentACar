import React, { useState } from "react";
import UserPanel from "../../components/Dashboard/UserPanel/UserPanel";
import CarPanel from "../../components/Dashboard/CarPanel/CarPanel";
import RentalPanel from "../../components/Dashboard/RentalPanel/RentalPanel";
import ModelPanel from "../../components/Dashboard/ModelPanel/ModelPanel";
import { useTranslation } from "react-i18next";

type Props = {};

const Admin = (props: Props) => {
  const [section, setSection] = useState<string>("user");
  const {t}=useTranslation();

  return (
    <div className="row container ">
      <div className="col-2 pe-5  d-flex flex-column  ">
        <div
          className="btn btn-primary row  mb-2"
          onClick={() => setSection("user")}
        >
          {t("users")}
        </div>
        <div
          className="btn  btn-primary row mb-2"
          onClick={() => setSection("car")}
        >
          {t("cars")}
        </div>
        <div
          className="btn  btn-primary row mb-2"
          onClick={() => setSection("models")}
        >
          {t("models")}
        </div>

        <div
          className="btn btn-primary row mb-2"
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
