import React, { useEffect, useState } from "react";
import { CarModel } from "../../models/CarModel";
import { useLocation } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";

import CarPlaceholder from "../../components/CarPlaceholder/CarPlaceholder";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { useTranslation } from "react-i18next";
import { LuFilter } from "react-icons/lu";
import "./carsPage.css";

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
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
  const [modelList, setModelList] = useState<any>([]);
  const [brandList, setBrandList] = useState<any>([]);

  const [initialValues, setInitialValues] = useState({
    firstPrice: 0,
    secondPrice: 0,
    firstModelYear: 0,
    secondModelYear: 0,
    modelName: "",
    brandName: "",
  });
  const validationSchema = Yup.object({
    firstPrice: Yup.number().min(-1, `${t("priceyup")}`),
    secondPrice: Yup.number().min(-1, `${t("priceyup")}`),
    firstModelYear: Yup.number().min(-1, `${t("yearyup")}`),
    secondModelYear: Yup.number().min(-1, `${t("yearyup")}`),
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
      setMenuIsOpened(false);
      setInitialValues({
        firstPrice: 0,
        secondPrice: 0,
        firstModelYear: 0,
        secondModelYear: 0,
        modelName: "",
        brandName: "",
      });
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
  const handleHamburgerClick = () => {
    setMenuIsOpened(!menuIsOpened);
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
  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };
  const getModelList = () => {
    const uniqueModels = new Set();

    carList.forEach((item) => {
      uniqueModels.add(item.modelName);
    });

    const uniqueArray = [...uniqueModels].map((modelName) => ({ modelName }));

    setModelList(uniqueArray);
  };
  const getBrandList = () => {
    const uniqueBrands = new Set();

    carList.forEach((item) => {
      uniqueBrands.add(item.brandName);
    });

    const uniqueArray = [...uniqueBrands].map((brandName) => ({ brandName }));

    setBrandList(uniqueArray);
  };

  useEffect(() => {
    getModelList();
    getBrandList();
  }, [carList]);

  return (
    <div className="container-fluid  d-flex ">
      {/* Aside-MD-Start */}
      <div className="col-3 d-none d-md-flex  justify-content-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFilterCarList}
        >
          {({ isSubmitting, values, handleChange }) => (
            <Form className="  w-75">
              <div>
                <div className="col">
                  <FormikInput
                    value={initialValues.firstPrice}
                    label={t("firstPrice")}
                    name="firstPrice"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                  />
                </div>

                <div className="col">
                  <FormikInput
                    value={initialValues.secondPrice}
                    label={t("secondPrice")}
                    name="secondPrice"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                  />
                </div>

                <div className="col">
                  <FormikInput
                    value={initialValues.firstModelYear}
                    label={t("firstModelYear")}
                    name="firstModelYear"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                  />
                </div>

                <div className="col">
                  <FormikInput
                    value={initialValues.secondModelYear}
                    label={t("secondModelYear")}
                    name="secondModelYear"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                  />
                </div>
                <div>
                  <FormikSelect
                    label="Models"
                    list={modelList}
                    name="modelName"
                    value={initialValues.modelName}
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                  />
                </div>
                <div>
                  <FormikSelect
                    label="Brands"
                    list={brandList}
                    name="brandName"
                    value={initialValues.brandName}
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                  />
                </div>
              </div>
              <div className="col mt-3 d-flex justify-content-between">
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
                  {isSubmitting ? `${t("filtering")}` :`${t("filter")}` }
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* Aside-MD-End */}

      <div className=" container-fluid col ">
        <div className="row d-flex gap-3">
          <div className="d-flex flex-md-column justify-content-between  justify-content-md-end align-items-end ">
            {/* Aside-Mobile-Start */}
            <div className="d-md-none">
              <div
                className="text-end btn btn-primary me-2"
                onFocus={() => setMenuIsOpened(false)}
              >
                <LuFilter
                  className="text-light"
                  size={20}
                  onClick={handleHamburgerClick}
                />
                <span>Filter</span>
              </div>
            </div>
            {menuIsOpened && (
              <div className="p-2  d-flex w-100  text-light rounded  position-absolute start-0 pos-top justify-content-center  z-2 ">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleFilterCarList}
                >
                  {({ isSubmitting, values, handleChange }) => (
                    <Form className="  w-75">
                      <div>
                        <div className="col">
                          <FormikInput
                            value={initialValues.firstPrice}
                            label={t("firstPrice")}
                            name="firstPrice"
                            onChange={(e: any) => {
                              onChangeInput(handleChange, e, values);
                            }}
                          />
                        </div>

                        <div className="col">
                          <FormikInput
                            value={initialValues.secondPrice}
                            label={t("secondPrice")}
                            name="secondPrice"
                            onChange={(e: any) => {
                              onChangeInput(handleChange, e, values);
                            }}
                          />
                        </div>

                        <div className="col">
                          <FormikInput
                            value={initialValues.firstModelYear}
                            label={t("firstModelYear")}
                            name="firstModelYear"
                            onChange={(e: any) => {
                              onChangeInput(handleChange, e, values);
                            }}
                          />
                        </div>

                        <div className="col">
                          <FormikInput
                            value={initialValues.secondModelYear}
                            label={t("secondModelYear")}
                            name="secondModelYear"
                            onChange={(e: any) => {
                              onChangeInput(handleChange, e, values);
                            }}
                          />
                        </div>
                        <div>
                          <FormikSelect
                            label="Models"
                            list={modelList}
                            name="modelName"
                            onChange={(e: any) => {
                              onChangeInput(handleChange, e, values);
                            }}
                          />
                        </div>
                        <div>
                          <FormikSelect
                            label="Brands"
                            list={brandList}
                            name="brandName"
                            onChange={(e: any) => {
                              onChangeInput(handleChange, e, values);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col mt-3 d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-danger "
                          onClick={() => {
                            setFilteredCarList(cars),
                              setMenuIsOpened(false),
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
            )}
            {/* Aside-Mobile-End */}
            <div className="d-flex flex-column  justify-content-end align-items-end ">
              <label htmlFor="sortType" className="form-label">
                Sırala:
              </label>
              <select
                id="sortType"
                name="sortType"
                className="form-select w-md-25 w-100 "
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
          {/* Loading-start */}
          {isLoading && (
            <div className="  ">
              <CarPlaceholder />
            </div>
          )}
          {/* Loading-end */}
          {!isLoading && (
            <div className="w-100  d-flex flex-column">
              {sortedCarList?.map((car) => (
                <div key={car.id} className=" col-12 d-flex  z">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
