import React, { useState } from "react";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import Input from "../Input/Input";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Props = {setSearchedUserList:any,setSearchedUserListPage:any,pageable:any,setSearchable:any,setPageable:any};

const SearchKey = ({setSearchedUserList,setSearchedUserListPage,pageable,setPageable,setSearchable}: Props) => {
  const [searchKey, setSearchKey] = useState<string>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  function handleChange(e: any) {
    setSearchKey(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    
    setLoading(true);
    setError(null);
    //setPageable({ ...pageable,page:0})

    try {
      const response = await axiosInstance.get(`/v1/users/search-user?page=${pageable?.page}&size=${pageable?.size}`, {
    params: {
        searchKey: searchKey
    }});
    console.log(searchKey)
      console.log("Başarıyla Oluşturuldu:", response.data);
      
      setSearchedUserList(response.data.content)
      setSearchedUserListPage(response.data.totalPages)
      setSearchable(true)
      
    } catch (error: any) {
      console.error("Oluşturma Hatası:", error);
        
      setError(error.message);
     toast.error(error.response.data.message)
    } finally {
      setLoading(false);
     
    }
  }

  return (
   <div>
  <form onSubmit={handleSubmit}>
    <div>
      <Input
        id="email"
        label={t("search")}
        error={error}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : " Search"}
      </button>
    </div>
  </form>
  <button type="submit" disabled={loading} onClick={()=>{setSearchable(false),setPageable({ ...pageable,page:0})}}>
    {loading ? "Sıfırlanıyor..." : " Sıfırla"}
  </button>
</div>

  );
};

export default SearchKey;
