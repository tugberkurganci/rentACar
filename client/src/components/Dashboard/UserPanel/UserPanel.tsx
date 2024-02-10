import { useEffect, useState } from "react";
import { UserModel } from "../../../models/UserModel";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { toast } from "react-toastify";
import "./userPanel.css";
import Pagination from "../../Pagination/Pagination";
import { useTranslation } from "react-i18next";
import Image from "../../CarImage/CarImage";
import UserUpdate from "./UserUpdate";
import SearchKey from "../../SearchKey/SearchKey";
import "./userPanel.css";

type Props = {};

const UserPanel = (props: Props) => {
  const { t } = useTranslation();
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 10 });
  const [editable, setEditable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState<UserModel>();
  const [searchedUserList, setSearchedUserList] = useState<UserModel[]>([]);
  const [searchedUserListPage, setSearchedUserListPage] = useState<number>(1);
  const [searchable, setSearchable] = useState<boolean>(false);

  const handlePageChange = (selectedPage: any) => {
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
  };
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/users/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      setTotalPages(response.data.totalPages);
      setUserList(response.data.content);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const handleChangeUpdateBtn = (user: UserModel) => {
    setEditable(!editable);
    setUser(user);
  };
  const handleDeleteUser = async (user: UserModel) => {
    const confirmation = confirm("Are you sure you want to delete?");
    if (confirmation) {
      try {
        const response = await axiosInstance.delete(`/v1/users/${user.id}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error: any) {
        toast.error(error?.response.data.message);
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [editable, pageable]);

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex  flex-column   justify-content-between align-items-center"
    >
      {!editable && (
        <div className=" w-100  d-flex flex-column justify-content-center align-itemse-center">
          <div className="center-text mb-2">
            <SearchKey
              setSearchedList={setSearchedUserList}
              setSearchedListPage={setSearchedUserListPage}
              pageable={pageable}
              setPageable={setPageable}
              setSearchable={setSearchable}
              type={"user"}
            />
          </div>
          {/* Data-section-Mobile-Start */}
          <div className="d-md-none justify-content-between align-items-center d-flex  flex-column ">
            {searchable
              ? searchedUserList.map((user) => (
                  <div className="card w-100 mb-3">
                    {user.image && (
                      <img
                        src={`/assets/${"user"}/${user.image}`}
                        className={`card-img-top`}
                        alt={`${user.email}'s profile picture `}
                      />
                    )}
                    <div className="card-body ">
                      <div className="border rounded mb-3 p-3">
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">User ID: </span>
                          <span>{user.id}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Name: </span>
                          <span>{user.name}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Surname: </span>
                          <span>{user.surname}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">E-mail: </span>
                          <span>{user.email}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Birth Date: </span>
                          <span>{user.birthDate}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between px-3 t-3">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => handleChangeUpdateBtn(user)}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className=" btn btn-danger"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : userList.map((user) => (
                  <div className="card w-100 mb-3">
                    {user.image && (
                      <img
                        src={`/assets/${"user"}/${user.image}`}
                        className={`card-img-top `}
                        alt={`${user.email}'s profile picture `}
                      />
                    )}
                    <div className="card-body ">
                      <div className="border rounded mb-3 p-3">
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">User ID: </span>
                          <span>{user.id}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Name: </span>
                          <span>{user.name}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Surname: </span>
                          <span>{user.surname}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">E-mail: </span>
                          <span>{user.email}</span>
                        </div>
                        <div className="fs-2 b-bottom">
                          <span className=" fw-semibold">Birth Date: </span>
                          <span>{user.birthDate}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between px-3 t-3">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => handleChangeUpdateBtn(user)}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
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
          <table className="table table-striped-columns d-none d-md-table ">
            <thead>
              <tr>
                <th className="center-text" scope="col">
                  {t("user")} ID
                </th>
                <th className="center-text" scope="col">
                  {t("picture")}
                </th>
                <th className="center-text" scope="col">
                  {t("name")}
                </th>
                <th className="center-text" scope="col">
                  {t("surname")}
                </th>
                <th className="center-text" scope="col">
                  {t("email")}
                </th>
                <th className="center-text" scope="col">
                  {t("date")}
                </th>
              </tr>
            </thead>
            <tbody>
              {searchable
                ? searchedUserList.map((user) => (
                    <tr className="w-100 center-text" key={user.id}>
                      <th className="center-text" scope="row">
                        {user.id}
                      </th>
                      <td className="td-img m-0 p-0" width={150}>
                        {user.image && (
                          <img
                            id="user-img"
                            src={`/assets/${"user"}/${user.image}`}
                            className={`card-img-top `}
                            alt={`${user.email}'s profile picture `}
                          />
                        )}
                      </td>
                      <td className="center-text">{user.name}</td>
                      <td className="center-text">{user.surname}</td>
                      <td className="center-text">{user.email}</td>
                      <td className="center-text"> {user.birthDate}</td>
                      <td className="center-text d-flex flex-wrap gap-1">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => handleChangeUpdateBtn(user)}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className=" btn btn-danger"
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </tr>
                  ))
                : userList.map((user) => (
                    <tr className="w-100 center-text " key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td className="td-img m-0 p-0" width={150}>
                        {user.image && (
                          <img
                            id="user-img"
                            src={`/assets/${"user"}/${user.image}`}
                            className={`card-img-top`}
                            alt={`${user.email}'s profile picture `}
                          />
                        )}
                      </td>
                      <td className="center-text">{user.name}</td>
                      <td className="center-text">{user.surname}</td>
                      <td className="center-text">{user.email}</td>
                      <td className="center-text">{user.birthDate}</td>
                      <td className="center-text d-flex flex-wrap gap-1">
                        <button
                          className="me-2 btn btn-primary"
                          onClick={() => handleChangeUpdateBtn(user)}
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
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
        (searchable ? (
          <div>
            <Pagination
              totalPages={searchedUserListPage}
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
        <div className="d-flex w-100  justify-content-center align-items-center   ">
          <UserUpdate user={user} editable={setEditable} />
        </div>
      )}
    </div>
  );
};

export default UserPanel;
