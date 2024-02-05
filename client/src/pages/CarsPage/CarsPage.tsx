import axios from "axios";
import React, { useEffect, useState } from "react";
import { CarModel } from "../../models/CarModel";
import { Link, useLocation } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";

import CarPlaceholder from "../../components/CarPlaceholder/CarPlaceholder";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik, FormikHelpers, setIn } from "formik";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { useTranslation } from "react-i18next";
import { ModelType } from "../../models/ModelType";
import { BrandType } from "../../models/BrandType";

type CarFilterKeys = {
  firstPrice: number;
  secondPrice: number;
  firstModelYear: number;
  secondModelYear: number;
  modelName: string;
  brandName: string;
  carList?: CarModel[];
};

type Props = {};

const CarsPage = (props: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const { cars } = location.state || [];
  const [carList, setCarList] = useState<CarModel[]>(cars);
  const [filteredCarList, setFilteredCarList] = useState<CarModel[]>(carList);
  const [sortedCarList, setSortedCarList] =
    useState<CarModel[]>(filteredCarList);
  const [sortType, setSortType] = useState<string>("");

  const [initialValues, setInitialValues] = useState<CarFilterKeys>({
    firstPrice: 0,
    secondPrice: 0,
    firstModelYear: 0,
    secondModelYear: 0,
    modelName: "",
    brandName: "",
  });
  const validationSchema = Yup.object({
    firstPrice: Yup.number().min(-1, "Price must be greater than -1"),
    secondPrice: Yup.number().min(-1, "Price must be greater than -1"),
    firstModelYear: Yup.number().min(-1, "Year must be greater than -1"),
    secondModelYear: Yup.number().min(-1, "Year must be greater than -1"),
    modelName: Yup.string().nullable(),
    brandName: Yup.string().nullable(),
  });

  const handleFilterCarList = async (
    values: CarFilterKeys,
    { setErrors }: FormikHelpers<CarFilterKeys>
  ) => {
    console.log(values);

    try {
      let response;

      response = await axiosInstance.post(`/v1/cars/filter`, {
        ...values,
        carList: carList,
      });

      setFilteredCarList(response.data);
      console.log(response);
    } catch (error: any) {
      if (error.response.data.validationErrors) {
        const validationErrors: Record<string, string> =
          error.response.data.validationErrors;
        const formikErrors: Record<string, string> = {};
        Object.entries(validationErrors).forEach(([field, message]) => {
          formikErrors[field] = message;
        });
        setErrors(formikErrors);
        console.log(error);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (sortType !== "") {
      sortFilter({ carList: filteredCarList, sortType });
    } else {
      setSortedCarList(filteredCarList);
    }
  }, [filteredCarList, sortType]);

  const sortFilter = async (value: {
    carList: CarModel[];
    sortType: string;
  }) => {
    try {
      const response = await axiosInstance.post("/v1/cars/sort", value);
      console.log(response);
      setSortedCarList(response.data);
    } catch (error: any) {
      console.error("Sıralama hatası:", error.message);
      // Hata durumunda kullanıcıya bilgi verilebilir
    }
  };

  const handleSortTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Seçenek değiştiğinde sıralama tipini güncelle
    setSortType(event.target.value);
  };

  return (
    <div className="container row   w-100  ">
      {/* Loading-start */}

      {isLoading && (
        <div className="col-md-4col-12col-sm-6 d-flex flex-wrap    ">
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
          <CarPlaceholder />
        </div>
      )}
      {/* Loading-end */}

      {!isLoading && (
        <div className="d-flex flex row">
          <div className="col-3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFilterCarList}
            >
              {({ isSubmitting, values, handleChange }) => (
                <Form className="  w-50">
                  <div className="col">
                    <FormikInput
                      value={initialValues.firstPrice}
                      label="firstPrice"
                      name="firstPrice"
                    />
                  </div>

                  <div className="col">
                    <FormikInput
                      value={initialValues.secondPrice}
                      label="secondPrice"
                      name="secondPrice"
                    />
                  </div>

                  <div className="col">
                    <FormikInput
                      value={initialValues.firstModelYear}
                      label="firstModelYear"
                      name="firstModelYear"
                    />
                  </div>

                  <div className="col">
                    <FormikInput
                      value={initialValues.secondModelYear}
                      label="secondModelYear"
                      name="secondModelYear"
                    />
                  </div>
                  <div>
                    <FormikSelect
                      label="Models"
                      list={carList}
                      name="modelName"
                    />
                  </div>
                  <div>
                    <FormikSelect
                      label="Brands"
                      list={carList}
                      name="brandName"
                    />
                  </div>

                  <div className="col  d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-danger "
                      onClick={() => {
                        setFilteredCarList(cars),
                          setInitialValues({
                            firstPrice: 0,
                            secondPrice: 0,
                            firstModelYear: 0,
                            secondModelYear: 0,
                            modelName: "",
                            brandName: "",
                          });
                      }}
                    >
                      {t("giveup")}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary "
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "filtrele..." : "filtrele"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-7">
            {sortedCarList?.map((car) => (
              <div key={car.id} className="col-md-4 col-12 col-sm-6   ">
                <CarCard car={car} />
              </div>
            ))}
          </div>
          <div className="col-2">
            <div>
              <label htmlFor="sortType" className="form-label">
                Sırala:
              </label>
              <select
                id="sortType"
                name="sortType"
                className="form-select"
                value={sortType}
                onChange={handleSortTypeChange}
              >
                <option value="" className="text-muted">
                  Seçiniz
                </option>
                <option value="price-asc">Artan Fiyat</option>
                <option value="price-desc">Azalan Fiyat</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsPage;
