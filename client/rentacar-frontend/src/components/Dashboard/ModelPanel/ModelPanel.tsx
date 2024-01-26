import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import { Form, Formik, FormikHelpers } from "formik";
import FormikSelect from "../../FormikSelect/FormikSelect";
import FormikInput from "../../FormikInput/FormikInput";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { ModelType } from "../../../models/ModelType";
import * as Yup from "yup";

type Props = {};

const ModelPanel = (props: Props) => {
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [modelList, setModelList] = useState<ModelType[]>([]);
  const [brandList, setBrandList] = useState<any[]>([]);

  const handlePageChange = (selectedPage: any) => {
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
  };
  const [initialValues, setInitialValues] = useState<ModelType>({
    id: 1,
    name: "",
    brandId: 0,
  });

  const handleChangeUpdateBtn = (model: ModelType) => {
    setEditable(!editable);
    setInitialValues(model);
  };
  const handleUpdateModel = async (
    values: ModelType,
    { setErrors }: FormikHelpers<ModelType>
  ) => {
    console.log(values);

    try {
      const response = await axiosInstance.put(`/v1/models`, values);
      toast.success("Model updated successfully");
      console.log(response);
      setEditable(!editable);
      fetchModels();
      setInitialValues({
        id: 1,
        name: "",
        brandId: 0,
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
  const handleDeleteModel = async (model: ModelType) => {
    try {
      const response = await axiosInstance.delete(`/v1/models/${model.id}`);
      toast.success("Model deleted successfully");
      console.log(response.data);

      fetchModels();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const fetchModels = async () => {
    try {
      const response = await axiosInstance.get(
        `v1/models/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      setTotalPages(response.data.totalPages);
      setModelList(response.data.content);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get(`v1/brands`);
      setBrandList(response.data);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };

  const validationSchema = Yup.object({
    modelName: Yup.string().required("Model Name is required"),
    brandName: Yup.string().required("Kilometer is required"),
  });
  useEffect(() => {
    fetchModels();
    fetchBrands();
  }, [pageable]);

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex flex-column  justify-content-between align-items center"
    >
      {!editable && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Model ID</th>
              <th scope="col">Model Name</th>
              <th scope="col">Brand ID</th>
            </tr>
          </thead>

          <tbody>
            {modelList.map((model) => (
              <tr className="w-100 " key={model.id}>
                <th scope="row">{model.id}</th>
                <td>{model.name}</td>
                <td>{model.brandId}</td>

                <td>
                  <button
                    className="me-2 btn btn-primary"
                    onClick={() => handleChangeUpdateBtn(model)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteModel(model)}
                    className=" btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!editable && (
        <div>
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
      {editable && (
        <div
          style={{ minHeight: "80vh" }}
          className="d-flex flex-row justify-content-center align-items-center   "
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdateModel}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form className="  w-50">
                <div className="col">
                  <FormikInput
                    label="Model Name"
                    onChange={(e: any) => {
                      onChangeInput(handleChange, e, values);
                    }}
                    value={initialValues.name}
                    name="name"
                  />
                </div>
                <div>
                  <FormikSelect
                    label="Brand Name"
                    list={brandList}
                    name="brandName"
                    val={"id"}
                  />
                </div>

                <div className="col  d-flex justify-content-between">
                  <button
                    onClick={() => setEditable(!editable)}
                    className="btn btn-danger "
                  >
                    Vazgeç
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
        </div>
      )}
    </div>
  );
};

export default ModelPanel;
