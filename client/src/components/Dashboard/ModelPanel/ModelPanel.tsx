import { useEffect, useState } from "react";
import { RentalModel } from "../../../models/RentalModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import Pagination from "../../Pagination/Pagination";
import { ModelType } from "../../../models/ModelType";
import FormikSelect from "../../FormikSelect/FormikSelect";
import { useTranslation } from "react-i18next";
import ModelAddUpdate from "./ModelAddUpdate";

type Props = {};

const ModelPanel = (props: Props) => {
  

  const [modelList, setModelList] = useState<ModelType[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [addable, setAddable] = useState<boolean>(false)
  const {t}=useTranslation();
  const [model, setModel] = useState<ModelType>()
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (selectedPage: any) => {
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
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
  
 

  const handleDeleteModel = async (model: ModelType) => {
    try {
      const response = await axiosInstance.delete(`/v1/models/${model.id}`);
      toast.success("Model deleted successfully");
      fetchModels();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  
  useEffect(() => {
    fetchModels();
    
  }, [pageable,addable,editable]);

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex flex-column  justify-content-between align-items center"
    >
      {!editable && !addable &&(
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Model ID</th>
              <th scope="col">Model {t("name")}</th>
              <th scope="col">{t("brand")} ID</th>
              <th><button
                    onClick={() =>setAddable(!addable)}
                    className="btn btn- btn-primary "
                    >
                    {t("addmodel")}
                  </button></th> 
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
                    onClick={() => {setModel(model) ;setEditable(true)}}
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleDeleteModel(model)}
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
       <ModelAddUpdate model={model} setEditable={setEditable} urlType="put"/>
      )}
       {addable && (
       <ModelAddUpdate setEditable={setAddable} urlType="post"/>
      )}
    </div>
  );
};

export default ModelPanel;
