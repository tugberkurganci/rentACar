import { useEffect, useState } from "react";
import { CarModel } from "../../../models/CarModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import Pagination from "../../Pagination/Pagination";
import FormikSelect from "../../FormikSelect/FormikSelect";
import { ModelType } from "../../../models/ModelType";
import { ColorModel } from "../../../models/ColorModel";
import { useTranslation } from "react-i18next";
import CarAddUpdate from "./CarAddUpdate";
import CarImage from "../../CarImage/CarImage";
import Image from "../../CarImage/CarImage";
type Props = {};

const CarPanel = (props: Props) => {
  const { t } = useTranslation();
  const [carList, setCarList] = useState<CarModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [addable, setAddable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [car, setCar] = useState<CarModel>();

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
      className="d-flex flex-column  justify-content-between align-items center"
    >
      {!editable && !addable && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">{t("picture")}</th>
              <th scope="col">{t("user")} ID</th>
              <th scope="col">Model {t("name")}</th>
              <th scope="col">{t("kilometer")}</th>
              <th scope="col">{t("color")}</th>
              <th scope="col">
                {t("perday")} {t("price")}
              </th>
              <th scope="col">{t("plate")}</th>
              <th scope="col">{t("modelyear")}</th>
              <th>
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
            {carList.map((car) => (
              <tr className="w-100 " key={car.id}>
                <td>
                <Image  source={car.image} model={"car"}/>
                  {/* Araba fotoğrafı gösteriliyor */}
                </td>
                <th scope="row">{car.id}</th>
                <td>{car.modelName}</td>
                <td>{car.kilometer}</td>
                <td>{car.colorName}</td>
                <td>{car.dailyPrice}</td>
                <td>{car.plate}</td>
                <td>{car.year}</td>
                <td>
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
      )}
      {!editable && !addable && (
        <div>
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
      {editable && (
        <CarAddUpdate car={car} setEditable={setEditable} urlType="put" />
      )}
      {addable && <CarAddUpdate setEditable={setAddable} urlType="add" />}
    </div>
  );
};

export default CarPanel;
