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

type Props = {};

const UserPanel = (props: Props) => {
  const { t } = useTranslation();
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [pageable, setPageable] = useState<any>({ page: 0, size: 1 });
  const [editable, setEditable] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState<UserModel>();
  const [searchedUserList, setSearchedUserList] = useState<UserModel[]>([]);
  const [searchedUserListPage, setSearchedUserListPage] = useState<number>(1);
  const [searchable, setSearchable] = useState<boolean>(false)

  const handlePageChange = (selectedPage: any) => {
    
    const newPage = selectedPage.selected;
    setPageable({ ...pageable, page: newPage });
  };
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/users/via-page?page=${pageable?.page}&size=${pageable?.size}`
      );
      console.log(response);
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
    try {
      const response = await axiosInstance.delete(`/v1/users/${user.id}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  
  
  useEffect(() => {
    
    fetchUsers();
  }, [ editable,pageable]);


  
 

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="d-flex flex-column  justify-content-between align-items center"
    >
      {!editable && (
      <div>
  <SearchKey
    setSearchedList={setSearchedUserList}
    setSearchedListPage={setSearchedUserListPage}
    pageable={pageable}
    setPageable={setPageable}
    setSearchable={setSearchable}
    type={"user"}
  />
  <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">{t("user")} ID</th>
        <th scope="col">{t("picture")}</th>
        <th scope="col">{t("name")}</th>
        <th scope="col">{t("surname")}</th>
        <th scope="col">{t("email")}</th>
        <th scope="col">{t("date")}</th>
        <th></th> {/* Edit and Delete buttons column */}
      </tr>
    </thead>
    <tbody>
      {searchable ? searchedUserList.map((user) => (
          <tr className="w-100 " key={user.id}>
          <th scope="row">{user.id}</th>
          <td>
            <Image source={user.image} model={"user"} />
          </td>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.email}</td>
          <td>{user.birthDate}</td>
          <td>
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
      )):userList.map((user) => (
        <tr className="w-100 " key={user.id}>
        <th scope="row">{user.id}</th>
        <td>
          <Image source={user.image} model={"user"} />
        </td>
        <td>{user.name}</td>
        <td>{user.surname}</td>
        <td>{user.email}</td>
        <td>{user.birthDate}</td>
        <td>
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
</div>

      )}
      {!editable && (searchable?(
        <div>
          <Pagination
            totalPages={searchedUserListPage}
            handlePageChange={handlePageChange}
          />
        </div>
      ):(
        <div>
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      ))}
      {editable && (
        <div>
          <UserUpdate user={user} editable={setEditable} />
        </div>
      )}
    </div>
  );
};

export default UserPanel;
