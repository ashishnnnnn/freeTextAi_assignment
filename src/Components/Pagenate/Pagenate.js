import React from "react";
import "./Pagenate.css";

export const Pagenate = ({ currPage, dataPerPage, dataLength, pagenate }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(dataLength / dataPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagenate" style={{ display: "flex" }}>
      <button
        onClick={() => {
          pagenate(1);
        }}
        disabled={currPage === 1}
      >
        <i class="fas fa-angle-double-left"></i>
      </button>
      <button
        onClick={() => {
          pagenate(currPage - 1);
        }}
        disabled={currPage === 1}
      >
        <i class="fas fa-angle-left"></i>
      </button>
      {pages.map((ele, idx) => (
        <button
          className={ele === Number(currPage) ? "active" : ""}
          key={idx}
          style={{}}
          onClick={() => {
            pagenate(ele);
          }}
        >
          {ele}
        </button>
      ))}
      <button
        onClick={() => {
          pagenate(currPage + 1);
        }}
        disabled={currPage === pages.length}
      >
        <i class="fas fa-angle-right"></i>
      </button>
      <button
        onClick={() => {
          pagenate(pages.length);
        }}
        disabled={currPage === pages.length}
      >
        <i class="fas fa-angle-double-right"></i>
      </button>
    </div>
  );
};
