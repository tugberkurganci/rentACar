import axios from "axios";
import React, { useEffect, useState } from "react";
import { CarModel } from "../../models/CarModel";
import { Link, useLocation } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";

import CarPlaceholder from "../../components/CarPlaceholder/CarPlaceholder";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { useTranslation } from "react-i18next";
import { ModelType } from "../../models/ModelType";
import { BrandType } from "../../models/BrandType";
import { GetBrandNameRequest } from "../../models/GetBrandNameRequest";


type CarFilterKeys={

  firstPrice:number;
  secondPrice:number;
  firstModelYear:number;
  secondModelYear:number;
  
}

type Props = {};

const CarsPage = (props: Props) => {
  const {t}=useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const { cars } = location.state || [];
  const [carList, setCarList] = useState<CarModel[]>(cars);
  const [brands, setBrands] = useState<BrandType[]>([])
  const [initialValues, setInitialValues] = useState<CarFilterKeys>({
    firstPrice:0,
    secondPrice:0,
    firstModelYear:0,
  secondModelYear:0,
   }
  );
  const [modelNameList, setModelNameList] = useState<GetBrandNameRequest[]>([])

  const fetchBrandList= async()=>{

    
    carList.forEach((car)=> { setModelNameList([...modelNameList,{modelName:car.modelName}])})


    try {
      const response=await axiosInstance.post("/v1/models/getbrandnames",modelNameList)

      console.log(response)
      setBrands(response.data)


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchBrandList()
  }, [])
  

  const validationSchema = Yup.object({
    modelName: Yup.string().required("Model Name is required"),
    colorName: Yup.string().required("Color Name is required"),
    dailyPrice: Yup.number()
      .moreThan(0, "Daily Price must be greater than 0")
      .required("Daily Price is required"),
    kilometer: Yup.number().required("Kilometer is required"),
    plate: Yup.string().required("Plate is required"),
    year: Yup.number()
      .moreThan(0, "Year must be greater than 0")
      .required("Year is required"),
  });
  const handleFilterCarList = async (
    values: CarFilterKeys,
    { setErrors }: FormikHelpers<CarFilterKeys>
  ) => {
    console.log(values);

    try {
      let response;
     
        response = await axiosInstance.put(`/v1/cars`, values);
      
      toast.success("Car updated successfully");
      console.log(response);
      
      setInitialValues({
       firstPrice:0,
       secondPrice:0,
       firstModelYear:0,
       secondModelYear:0,
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

  return (
    <div className="container row   w-100  ">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFilterCarList}
        >
          {({ isSubmitting, values, handleChange }) => (
            <Form className="  w-50">
             

              <div className="col">
                <FormikInput
                  label="firstPrice"
                  value={initialValues.firstPrice}
                  name="firstPrice"
                />
              </div>
              
              <div className="col">
                <FormikInput
                  label="secondPrice"
                  value={initialValues.secondPrice}
                  name="secondPrice"
                />
              </div>
              
              <div className="col">
                <FormikInput
                  label="firstModelYear"
                  value={initialValues.firstModelYear}
                  name="firstModelYear"
                />
              </div>
              
              <div className="col">
                <FormikInput
                  label="secondModelYear"
                  value={initialValues.secondModelYear}
                  name="secondModelYear"
                />
              </div>
              <div>
                <FormikSelect
                  label="Color"
                  list={carList}
                  name="modelName"
                  val={"id"}
                />
              </div>
              <div>
                <FormikSelect
                  label="Brands"
                  list={brands}
                  name="brandName"
                  val={"id"}
                />
              </div>

         
           
             

              <div className="col  d-flex justify-content-between">
                <button
                  type="button"
                 
                  className="btn btn-danger "
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

      {!isLoading &&
        carList?.map((car) => (
          <div key={car.id} className="col-md-4 col-12 col-sm-6   ">
            <CarCard car={car} />
          </div>
        ))}
    </div>
  );
};

export default CarsPage;
