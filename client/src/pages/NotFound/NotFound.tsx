import React from "react";
import "./notFound.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
type Props = {};

const NotFound = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className="bg- bg-opacity-25 col-12 col-md-8 d-flex text-center flex-column justify-content-start align-items-center gap-5">
      <div className="ops">Oops!</div>
      <div className="fs-1 fw-bold">404 - {t("pagenotfound")}</div>
      <div className="  fs-3 bg-secondary-subtle py-5 px-2  rounded-md-pill rounded">
        {t("notfoundmessage")}
      </div>
      <Link to={"/"}>
        <div className="btn btn-primary py-3 px-4 fs-4 rounded-pill fw-semibold">
          {t("gotohome")}
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
