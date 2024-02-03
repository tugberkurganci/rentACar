import React, { useState } from "react";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import Input from "../Input/Input";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Props = {setSearchedList:any,setSearchedListPage:any,pageable:any,setSearchable:any,setPageable:any,type:string};

const SearchKey = ({setSearchedList,setSearchedListPage,pageable,setPageable,setSearchable,type}: Props) => {
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
      const response = await axiosInstance.get(`/v1/${type}s/search-${type}?page=${pageable?.page}&size=${pageable?.size}`, {
    params: {
        searchKey: searchKey
    }});
    console.log(searchKey)
      console.log("Başarıyla Oluşturuldu:", response.data);
      
      setSearchedList(response.data.content)
      setSearchedListPage(response.data.totalPages)
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
        defaultValue={searchKey}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : " Search"}
      </button>
    </div>
  </form>
  <button  type="submit" disabled={loading} onClick={()=>{setSearchable(false),setPageable({ ...pageable,page:0}), setSearchKey("")} }>
    {loading ? "Sıfırlanıyor..." : " Sıfırla"}
  </button>
</div>

  );
};

export default SearchKey;
