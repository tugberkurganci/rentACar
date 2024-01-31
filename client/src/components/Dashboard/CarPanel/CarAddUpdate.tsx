import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import Pagination from "../../Pagination/Pagination";
import FormikSelect from "../../FormikSelect/FormikSelect";
import { ModelType } from "../../../models/ModelType";
import { ColorModel } from "../../../models/ColorModel";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CarModel } from "../../../models/CarModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import { init } from "i18next";



type Props = {car?:CarModel ,setEditable:any,urlType:string}

const CarAddUpdate = ({car,setEditable,urlType}: Props) => {
    
    const {t}=useTranslation();
    const [modelList, setModelList] = useState<ModelType[]>([]);
  const [colorList, setColorList] = useState<ColorModel[]>([]);
  const [image, setImage] = useState<any>()

  const handleUpdateCar = async (
    values: CarModel,
    { setErrors }: FormikHelpers<CarModel>
  ) => {
    console.log(values);

    try {
      
      let response;
      if(urlType==="put"){
        response = await axiosInstance.put(`/v1/cars`, {...values,image:image});}
      else{response =await axiosInstance.post(`/v1/cars`, {...values,image:image});}
      
      toast.success("Car updated successfully");
      console.log(response);
      setEditable(false)
      setInitialValues({
        id: 1,
        modelName: 0,
        colorName: 0,
        dailyPrice: 0,
        kilometer: 0,
        plate: "",
        year: 0,
        image:""
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
  
  const fetchModels = async () => {
    try {
      const response = await axiosInstance.get("v1/models");
      setModelList(response.data);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const fetchColors = async () => {
    try {
      const response = await axiosInstance.get("v1/colors");
      setColorList(response.data);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const [initialValues, setInitialValues] = useState<CarModel>(car || {
    id: 1,
    modelName: 0,
    colorName: 0,
    dailyPrice: 0,
    kilometer: 0,
    plate: "",
    year: 0,
    image:""
  });

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
  const onChangeInput =  (handleChange: any, e: any, values: any) => {
  
    if(e.target.files == null){handleChange(e);
      setInitialValues({ ...values, [e.target.name]: e.target.value });}
    else
    {
      const file= e.target.files[0]
      const fileReader=new FileReader();
      
      fileReader.onloadend=()=>{
        

        const data=fileReader.result

        setImage(data)
      }
       fileReader.readAsDataURL(file)
      
     

      
    }

  };
  useEffect(() => {
    fetchModels();
    fetchColors();
  }, []);

  useEffect(() => {
    console.log(initialValues.image)
    
  }, [])
  
 
 
    return (
    <div><div
    style={{ minHeight: "80vh" }}
    className="d-flex flex-row justify-content-center align-items-center   "
  >
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdateCar}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form className="  w-50">
          <div>
            <FormikSelect
              label="Model Name"
              list={modelList}
              name="modelName"
              val={"id"}
            />
          </div>

          <div className="col">
            <FormikInput
              label="Kilometer"
              onChange={(e: any) => {
                onChangeInput(handleChange, e, values);
              }}
              value={initialValues.kilometer}
              name="kilometer"
            />
          </div>
          <div>
            <FormikSelect
              label="Color"
              list={colorList}
              name="colorName"
              val={"id"}
            />
          </div>

          <div className="col">
            <FormikInput
              label="Daily Price"
              onChange={(e: any) => {
                onChangeInput(handleChange, e, values);
              }}
              value={initialValues.dailyPrice}
              name="dailyPrice"
            />
          </div>
          <div className="col">
            <FormikInput
              label="Plate Number"
              onChange={(e: any) => {
                onChangeInput(handleChange, e, values);
              }}
              value={initialValues.plate}
              name="plate"
            />
          </div>
          <div className="col">
            <FormikInput
              label="Model Year"
              onChange={(e: any) => {
                onChangeInput(handleChange, e, values);
              }}
              value={initialValues.year}
              name="year"
            />
          </div>
          <div className="col">
            <FormikInput
              label="İmage"
              onChange={(e: any) => {
                onChangeInput(handleChange, e, values);
              }}
              
              name="image"
              type="file"
            />
          </div>

          <div className="col  d-flex justify-content-between">
            <button
            type="button"
              onClick={() =>{setEditable(false);console.log("calıstı")} }
              className="btn btn-danger "
            >
              {t("giveup")}
            </button>
            <button
              type="submit"
              className="btn btn-primary "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div></div>
  )
}

export default CarAddUpdate