import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import Input from "../Input/Input";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./searchKey.css";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

type Props = {
  setSearchedList: any;
  setSearchedListPage: any;
  pageable: any;
  setSearchable: any;
  setPageable: any;
  type: string;
};

const SearchKey = ({
  setSearchedList,
  setSearchedListPage,
  pageable,
  setPageable,
  setSearchable,
  type,
}: Props) => {
  const [searchKey, setSearchKey] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  function handleChange(e: any) {
    setSearchKey(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    fetchData();
  }
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    //setPageable({ ...pageable,page:0})
    if (searchKey) {
      try {
        const response = await axiosInstance.get(
          `/v1/${type}s/search-${type}?page=${pageable?.page}&size=${pageable?.size}`,
          {
            params: {
              searchKey: searchKey,
            },
          }
        );

        setSearchedList(response.data.content);
        setSearchedListPage(response.data.totalPages);
        setSearchable(true);
      } catch (error: any) {
        console.error("Oluşturma Hatası:", error);

        setError(error.message);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageable]);

  return (
    <div className="d-flex my-3  ">
      <div className="d-flex flex-row border  border-secondary rounded-pill">
        <div id="search-input" className="d-flex rounded-start-pill ">
          <input
            id="search"
            className={"border-0 ps-3 rounded-start-pill w-full"}
            onChange={handleChange}
            value={searchKey}
          />
          {searchKey && (
            <div
              id="clear-search-input"
              className="border-0 px-2 "
              onClick={() => {
                setSearchable(false),
                  setPageable({ ...pageable, page: 0 }),
                  setSearchKey("");
              }}
            >
              <IoClose opacity={0.8} />
            </div>
          )}
        </div>

        <button
          className="border-0  pb-1 px-3 search-btn rounded-end-pill"
          onClick={handleSubmit}
          type="submit"
          disabled={loading}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchKey;
