import { useEffect, useState } from "react";
import { CarModel } from "../../../models/CarModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import Pagination from "../../Pagination/Pagination";
import { useTranslation } from "react-i18next";
import CarAddUpdate from "./CarAddUpdate";
import SearchKey from "../../SearchKey/SearchKey";
import "./carPanel.css";
type Props = {};

const CarPanel = (props: Props) => {
  const { t } = useTranslation();
  const [carList, setCarList] = useState<CarModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [addable, setAddable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [car, setCar] = useState<CarModel>();
  const [searchedCarList, setSearchedCarList] = useState<CarModel[]>([]);
  const [searchedCarListPage, setSearchedCarListPage] = useState<number>(1);
  const [searchable, setSearchable] = useState<boolean>(false);

  const handlePageChange = (selectedPage: any) => {
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
  };
  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get(
        `v1/cars/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      setTotalPages(response.data.totalPages);
      setCarList(response.data.content);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  const handleDeleteCar = async (car: CarModel) => {
    try {
      const response = await axiosInstance.delete(`/v1/cars/${car.id}`);
      toast.success("Car deleted successfully");
      fetchCars();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [pageable, addable, editable]);

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex flex-column overflow-x-scroll justify-content-between align-items center"
    >
      {!editable && !addable && (
        <div className=" w-100  d-flex flex-column justify-content-center align-itemse-center">
          <div className="center-text mb-2">
            <SearchKey
              setSearchedList={setSearchedCarList}
              setSearchedListPage={setSearchedCarListPage}
              pageable={pageable}
              setPageable={setPageable}
              setSearchable={setSearchable}
              type={"car"}
            />
          </div>
          {/* Data-section-Mobile-Start */}
          <div className="d-md-none px-3 justify-content-between align-items-center d-flex  flex-column ">
            <div className="w-100 d-flex  justify-content-center my-2">
              <button
                onClick={() => setAddable(!addable)}
                className="btn btn w-50 btn-primary"
              >
                {t("add")}
              </button>
            </div>
            {searchable
              ? searchedCarList.map((car) => (
                  <div className="card w-100 mb-3">
                    {car.image && (
                      <img
                        src={`/assets/${"car"}/${car.image}`}
                        className="card-img-top"
                        alt={`${car.modelName} picture `}
                      />
                    )}
                    <div className="card-body ">
                      <div className="border rounded mb-3 p-3">
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Car ID: </span>
                          <span>{car.id}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Model name: </span>
                          <span>{car.modelName}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Kilometer: </span>
                          <span>{car.kilometer}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Color: </span>
                          <span>{car.colorName}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Daily price: </span>
                          <span>{car.dailyPrice}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Plate: </span>
                          <span>{car.plate}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Model year: </span>
                          <span>{car.year}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Location: </span>
                          <span>{car.location}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Status: </span>
                          <span>{car.status}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between  px-3 t-3">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => {
                            setEditable(!editable);
                            setCar(car);
                          }}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car)}
                          className=" btn btn-danger"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : carList.map((car) => (
                  <div className="card w-100 mb-3">
                    {car.image && (
                      <img
                        src={`/assets/${"car"}/${car.image}`}
                        className="card-img-top"
                        alt={`${car.modelName} picture `}
                      />
                    )}
                    <div className="card-body ">
                      <div className="border rounded mb-3 p-3">
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Car ID: </span>
                          <span>{car.id}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Model name: </span>
                          <span>{car.modelName}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Kilometer: </span>
                          <span>{car.kilometer}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Color: </span>
                          <span>{car.colorName}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Daily price: </span>
                          <span>{car.dailyPrice}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Plate: </span>
                          <span>{car.plate}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Model year: </span>
                          <span>{car.year}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Location: </span>
                          <span>{car.location}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Status: </span>
                          <span>{car.status}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between px-3 t-3">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => {
                            setEditable(!editable);
                            setCar(car);
                          }}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car)}
                          className=" btn btn-danger"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {/* Data-section-Mobile-End */}

          {/* Data-section-MD-Start */}
          <table className="table table-striped-columns d-none d-md-table">
            <thead>
              <tr>
                <th className="center-text" scope="col">
                  {t("user")} ID
                </th>
                <th className="center-text" scope="col">
                  {t("picture")}
                </th>
                <th className="center-text" scope="col">
                  Model {t("name")}
                </th>
                <th className="center-text" scope="col">
                  {t("kilometer")}
                </th>
                <th className="center-text" scope="col">
                  {t("color")}
                </th>
                <th className="center-text" scope="col">
                  {t("perday")} {t("price")}
                </th>
                <th className="center-text" scope="col">
                  {t("plate")}
                </th>
                <th className="center-text" scope="col">
                  {t("modelyear")}
                </th>
                <th className="center-text" scope="col">
                  {t("location")}
                </th>
                <th className="center-text" scope="col">
                  {t("status")}
                </th>
                <th className="center-text">
                  <button
                    onClick={() => setAddable(!addable)}
                    className="btn btn btn-primary"
                  >
                    {t("add")}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {searchable
                ? searchedCarList.map((car) => (
                    <tr className="w-100 " key={car.id}>
                      <th scope="row">{car.id}</th>
                      <td className="center-text" width={200}>
                        <img
                          id="car-img"
                          className="car-image"
                          src={`/assets/${"car"}/${car.image}`}
                        />
                      </td>
                      <td className="center-text">{car.modelName}</td>
                      <td className="center-text">{car.kilometer}</td>
                      <td className="center-text">{car.colorName}</td>
                      <td className="center-text">{car.dailyPrice}</td>
                      <td className="center-text">{car.plate}</td>
                      <td className="center-text">{car.year}</td>
                      <td className="center-text">{car.location}</td>
                      <td className="center-text">{car.status}</td>
                      <td className="center-text d-flex flex-wrap gap-1">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => {
                            setEditable(!editable);
                            setCar(car);
                          }}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car)}
                          className=" btn btn-danger"
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </tr>
                  ))
                : carList.map((car) => (
                    <tr className="w-100 " key={car.id}>
                      <th scope="row">{car.id}</th>
                      <td className="d-flex " width={150}>
                        <img
                          className="car-img"
                          src={`/assets/${"car"}/${car.image}`}
                        />
                      </td>
                      <td className="center-text">{car.modelName}</td>
                      <td className="center-text">{car.kilometer}</td>
                      <td className="center-text">{car.colorName}</td>
                      <td className="center-text">{car.dailyPrice}</td>
                      <td className="center-text">{car.plate}</td>
                      <td className="center-text">{car.year}</td>
                      <td className="center-text">{car.location}</td>
                      <td className="center-text">{car.status}</td>

                      <td className="center-text d-flex flex-wrap gap-1">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => {
                            setEditable(!editable);
                            setCar(car);
                          }}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car)}
                          className=" btn btn-danger"
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {/* Data-section-MD-End */}
        </div>
      )}
      {!editable &&
        !addable &&
        (searchable ? (
          <div>
            <Pagination
              totalPages={searchedCarListPage}
              handlePageChange={handlePageChange}
            />
          </div>
        ) : (
          <div>
            <Pagination
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        ))}
      {editable && (
        <CarAddUpdate car={car} setEditable={setEditable} urlType="put" />
      )}
      {addable && <CarAddUpdate setEditable={setAddable} urlType="add" />}
    </div>
  );
};

export default CarPanel;
