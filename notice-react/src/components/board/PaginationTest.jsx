import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationTest = () => {
  const items = Array.from({ length: 60 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 5; //페이지 당 항목 수
  //현재 페이지에대한 상태를 관리하는 hook
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  //마지막 항목 인덱스 : 현재페이지와 페이지당 항목 수를 곱하여 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  //첫번째 항목 인덱스 : 마지막항목 인덱스에서 페이지당 항목 수를 뺀값
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //현재 페이지 항목 - 현재 페이지에 표시 할 데이터를 추출하기
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    pageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="container mt-4">
        <h2>Pagination</h2>
        <ul>
          {currentItems.map((item, index) => (
            <li className="list-group-item mb-3" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)}/>
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)}/>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Pagination.Item
                  active={currentPage === pageNumber}
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              )
            )}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)}/>
            <Pagination.Last onClick={() => handlePageChange(totalPages)}/>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default PaginationTest;
