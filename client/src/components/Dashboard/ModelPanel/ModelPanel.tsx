import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Pagination from "../../Pagination/Pagination";
import { ModelType } from "../../../models/ModelType";
import { useTranslation } from "react-i18next";
import ModelAddUpdate from "./ModelAddUpdate";
import "./modelPanel.css";
type Props = {};

const ModelPanel = (props: Props) => {
  const [modelList, setModelList] = useState<ModelType[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [addable, setAddable] = useState<boolean>(false);
  const { t } = useTranslation();
  const [model, setModel] = useState<ModelType>();
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
    const confirmation = confirm("Are you sure you want to delete?");
    if (confirmation) {
      try {
        const response = await axiosInstance.delete(`/v1/models/${model.id}`);
        toast.success("Model deleted successfully");
        fetchModels();
      } catch (error: any) {
        toast.error(error?.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchModels();
  }, [pageable, addable, editable]);

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex flex-column w-100  justify-content-between align-items center"
    >
      {!editable && !addable && (
        <div className="col-12 d-flex ">
          {/* Data-section-Mobile-Start */}
          <div className="col-12 d-md-none ">
            <div className="w-100 text-center py-3">
              <button
                onClick={() => setAddable(!addable)}
                className="btn w-50 btn-primary"
              >
                {t("addmodel")}
              </button>
            </div>
            {modelList.map((model) => (
              <div className="card w-100 mb-3">
                {model.image && (
                  <img
                    src={`/assets/model/${model.image}`}
                    className={`card-img-top model-img-mobile`}
                    alt={`${model.name} picture `}
                  />
                )}
                <div className="card-body ">
                  <div className="border rounded mb-3 p-3">
                    <div className="fs-2 b-bottom">
                      <span className=" fw-semibold">Model ID: </span>
                      <span>{model.id}</span>
                    </div>
                    <div className="fs-2 b-bottom">
                      <span className=" fw-semibold">Model name: </span>
                      <span>{model.name}</span>
                    </div>
                    <div className="fs-2 b-bottom">
                      <span className=" fw-semibold">Brand ID: </span>
                      <span>{model.brandId}</span>
                    </div>
                    <div className="fs-2 b-bottom">
                      <span className=" fw-semibold">Brand name: </span>
                      <span>{model.brandName}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between px-3 t-3">
                    <button
                      className="me-2 btn btn-primary"
                      onClick={() => {
                        setModel(model);
                        setEditable(true);
                      }}
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => handleDeleteModel(model)}
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
                  Model ID
                </th>
                <th className="center-text" scope="col">
                  {t("picture")}
                </th>
                <th className="center-text" scope="col">
                  Model {t("name")}
                </th>
                <th className="center-text" scope="col">
                  {t("brand")} ID
                </th>
                <th className="center-text" scope="col">
                  {t("brand")} {t("name")}
                </th>

                <th>
                  <button
                    onClick={() => setAddable(!addable)}
                    className="btn btn- btn-primary "
                  >
                    {t("addmodel")}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {modelList.map((model) => (
                <tr className="w-100 " key={model.id}>
                  <th className="center-text" scope="row">
                    {model.id}
                  </th>
                  <td className="center-text" width={150}>
                    {model.image && (
                      <img
                        src={`/assets/${"model"}/${model.image}`}
                        className={`model-img`}
                        alt={`${model.name} picture `}
                      />
                    )}
                  </td>
                  <td className="center-text">{model.name}</td>
                  <td className="center-text">{model.brandId}</td>
                  <td className="center-text">{model.brandName}</td>

                  <td className="center-text d-flex flex-wrap gap-1">
                    <button
                      className="me-2 btn btn-primary"
                      onClick={() => {
                        setModel(model);
                        setEditable(true);
                      }}
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
          {/* Data-section-MD-End */}
        </div>
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
        <ModelAddUpdate model={model} setEditable={setEditable} urlType="put" />
      )}
      {addable && <ModelAddUpdate setEditable={setAddable} urlType="post" />}
    </div>
  );
};

export default ModelPanel;
