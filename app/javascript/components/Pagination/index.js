import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const CustomPagination = ({ totalPages, currentPage, url }) => {
  return (
    <Pagination aria-label="Page navigation" size="sm">
      <PaginationItem disabled={currentPage == 1}>
        <PaginationLink first to={`${url}?page=1`} tag={Link} />
      </PaginationItem>
      <PaginationItem disabled={currentPage == 1}>
        <PaginationLink
          to={`${url}?page=${currentPage - 1}`}
          previous
          tag={Link}
        />
      </PaginationItem>
      {Array(totalPages)
        .fill()
        .map((_, index) => (
          <PaginationItem key={index} active={currentPage == index + 1}>
            <PaginationLink to={`${url}?page=${index + 1}`} tag={Link}>
              {`${index + 1}`}
            </PaginationLink>
          </PaginationItem>
        ))}
      <PaginationItem disabled={currentPage == totalPages}>
        <PaginationLink to={`${url}?page=${currentPage + 1}`} next tag={Link} />
      </PaginationItem>
      <PaginationItem disabled={currentPage == totalPages}>
        <PaginationLink to={`${url}?page=${totalPages}`} last tag={Link} />
      </PaginationItem>
    </Pagination>
  );
};

export default CSSModules(CustomPagination, styles, { allowMultiple: true });
