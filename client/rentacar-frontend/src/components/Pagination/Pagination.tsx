import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
type Props = { totalPages: number; handlePageChange: any };

const Pagination = ({ totalPages, handlePageChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={7}
      marginPagesDisplayed={2}
      onPageChange={handlePageChange}
      containerClassName={"pagination-container"}
      pageClassName={"pagination-page"}
      activeClassName={"active"}
      previousLabel={"Prev"} // Önceki sayfa etiketi
      nextLabel={"Next"} // Sonraki sayfa etiketi
      previousClassName={"prev-button"} // Önceki sayfa düğmesine eklenen sınıf
      nextClassName={"next-button"} // Sonraki sayfa düğmesine eklenen sınıf
      disabledClassName={"disabled"}
      previousLinkClassName={"prev-link"}
      nextLinkClassName={"next-link"}
    />
  );
};

export default Pagination;
