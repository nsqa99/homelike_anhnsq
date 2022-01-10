import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { getAllReview } from "../../redux/review/review.action";

const CustomPagination = ({ totalPages, currentPage, fn, ...props }) => {
  const [options, setOptions] = useState({
    page: null,
    // pageSize: 10
  });
  const dispatch = useDispatch();

  const handleChangePage = (e, page) => {
    e.preventDefault();
    setOptions({ ...options, page });
  };

  useEffect(() => {
    if (options.page != null) {
      fn(options);
    }
  }, [options]);

  return (
    <div className="mb-2">
      <Pagination aria-label="Page navigation" size="sm">
      <PaginationItem disabled={currentPage == 1}>
        <PaginationLink first onClick={(e) => handleChangePage(e, 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage == 1}>
        <PaginationLink
          previous
          onClick={(e) => handleChangePage(e, currentPage - 1)}
        />
      </PaginationItem>
      {Array(totalPages)
        .fill()
        .map((_, index) => (
          <PaginationItem key={index} active={currentPage == index + 1}>
            <PaginationLink onClick={(e) => handleChangePage(e, index + 1)}>
              {`${index + 1}`}
            </PaginationLink>
          </PaginationItem>
        ))}
      <PaginationItem disabled={currentPage == totalPages}>
        <PaginationLink
          onClick={(e) => handleChangePage(e, currentPage + 1)}
          next
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage == totalPages}>
        <PaginationLink onClick={(e) => handleChangePage(e, totalPages)} last />
      </PaginationItem>
    </Pagination>
    </div>
  );
};

export default CSSModules(CustomPagination, styles, { allowMultiple: true });
