import React from "react";
import "./carPlaceholder.css";
type Props = {};

const CarPlaceholder = (props: Props) => {
  return (
    <div className="d-flex justify-content-center align-items-center m-2 mb-3  placeholder gradient-animation ">
      <div className="card ">
        <div id="img" className="placeholder-box "></div>
        <div className="card-body d-flex flex-column  justify-content-between">
          <div className="d-flex mb-4 flex-column gap-3">
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
              style={{ width: "200px", height: "20px" }}
            ></div>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <div
              className="btn btn-primary mx-2 w-100 placeholder-box"
              style={{ height: "40px" }}
            ></div>
            <div
              className="btn btn-warning w-100 placeholder-box"
              style={{ height: "40px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPlaceholder;
