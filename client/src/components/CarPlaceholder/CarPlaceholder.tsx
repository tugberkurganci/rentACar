import React from "react";
import "./carPlaceholder.css";
type Props = {};

const CarPlaceholder = (props: Props) => {
  return (
    <div className="d-flex justify-content-center w-100 align-items-center mb-3">
      <div className="card col-12 d-flex flex-column flex-md-row justify-content-between">
        <div className="card-car-image"></div>
        <div className="card-body d-flex flex-column justify-content-between w-100">
          <div className="d-flex mb-4 flex-column">
            <div className="d-flex flex-row justify-content-between">
              <div
                className="placeholder-box"
                style={{ width: "100px", height: "20px" }}
              ></div>
              <div
                className="placeholder-box"
                style={{ width: "100px", height: "20px" }}
              ></div>
            </div>
            <div
              className="placeholder-box"
              style={{ width: "150px", height: "20px" }}
            ></div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div
              className="btn btn-primary mx-2 placeholder-box"
              style={{ width: "100px", height: "40px" }}
            ></div>
            <div
              className="btn btn-warning placeholder-box"
              style={{ width: "100px", height: "40px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPlaceholder;
