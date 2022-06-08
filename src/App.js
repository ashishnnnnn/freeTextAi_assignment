import "./App.css";
import { Pagenate, Modal } from "./Components";
import React, { useState, useEffect } from "react";
import { useUserData } from "./context/userContext";
import { getData } from "./ApiCalls/getData";
import { dataAfterSearch } from "./Utils/dataAfterSearch";
import { dataAfterSort } from "./Utils/dataAfterSort";

function App() {
  const { userData, setUserData } = useUserData();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currUser, setCurrModalUser] = useState({});
  const [sortBy, setSortBy] = useState("NONE");
  const [isDark, setIsDark] = useState(true);
  const toggle_modal = () => {
    setShowModal((pre_val) => !pre_val);
  };
  const reset_modal = () => {
    setCurrModalUser({});
    setSelectedRow([]);
  };

  // For Pagenation Logic

  const dataPerPage = 10;
  const [currPage, setCuurentPage] = useState(1);
  const dataLastIndex = currPage * dataPerPage;
  const dataFirstIndex = dataLastIndex - dataPerPage;
  let dataToShow = dataAfterSort(userData, sortBy);
  const seacrhResult = dataAfterSearch(dataToShow, searchValue);
  dataToShow = seacrhResult.slice(dataFirstIndex, dataLastIndex);
  const pagenate = (pageNumber) => {
    setCuurentPage(pageNumber);
    setSelectedRow([]);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUserData({ type: "INITIAL_ADD", payload: data });
    };
    fetchData();
  }, []);
  return (
    <div className={"App " + (isDark ? "dark" : "light")}>
      <div className="container">
        <div className="header">
          <p>freeTextAI</p>
          {isDark ? (
            <i
              onClick={() => {
                setIsDark(!isDark);
              }}
              class="fas fa-sun"
            ></i>
          ) : (
            <i
              onClick={() => {
                setIsDark(!isDark);
              }}
              class="fas fa-moon"
            ></i>
          )}
        </div>
        <div className="top-options">
          <div className="search_bar">
            <i class="fas fa-search"></i>
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCuurentPage(1);
              }}
              placeholder="search"
            />
            {searchValue.length > 0 && (
              <i
                onClick={() => {
                  setSearchValue("");
                }}
                class="fas fa-times"
              ></i>
            )}
          </div>
          {selectedRow.length > 0 && (
            <div
              onClick={() => {
                setUserData({ type: "DELETE_MULTIPLE", payload: selectedRow });
                setSelectedRow([]);
              }}
              disabled={selectedRow.length === 0}
              className="delete-header"
            >
              <i class="far fa-trash-alt"></i>
              <p>delete</p>
            </div>
          )}
        </div>
        <div className="tableContainer">
          <table>
            <tr>
              <th className="checkbox-container">
                {selectedRow.length === dataToShow.length ? (
                  <label className="checkbox-container">
                    <input
                      onClick={() => {
                        setSelectedRow([]);
                      }}
                      type="checkbox"
                      checked={true}
                      className="checkbox"
                    />
                    <span class="checkmark"></span>
                  </label>
                ) : (
                  <label className="checkbox-container">
                    <input
                      onClick={() => {
                        setSelectedRow(() => {
                          let newSelectedRow = [];
                          dataToShow.forEach((ele) => {
                            newSelectedRow.push(ele.id);
                          });
                          return newSelectedRow;
                        });
                      }}
                      type="checkbox"
                      checked={false}
                      className="checkbox"
                    />
                    <span class="checkmark"></span>
                  </label>
                )}
              </th>
              <th
                onClick={() => {
                  setSortBy("NAME");
                }}
                className="actionable"
              >
                name
              </th>
              <th
                onClick={() => {
                  setSortBy("EMAIL");
                }}
                className="actionable"
              >
                email
              </th>
              <th
                onClick={() => {
                  setSortBy("ROLE");
                }}
                className="actionable"
              >
                role
              </th>
              <th></th>
            </tr>
            {dataToShow.length > 0 &&
              dataToShow.map((ele) => (
                <tr
                  className={
                    selectedRow.includes(ele.id) ? "active datarow" : "datarow"
                  }
                  key={ele.id}
                >
                  <td>
                    {selectedRow.includes(ele.id) ? (
                      <label className="checkbox-container">
                        <input
                          onClick={() => {
                            setSelectedRow((pre_value) =>
                              pre_value.filter((selected) => selected != ele.id)
                            );
                          }}
                          checked={true}
                          type="checkbox"
                          className="checkbox"
                        />
                        <span class="checkmark"></span>
                      </label>
                    ) : (
                      <label className="checkbox-container">
                        <input
                          onClick={() => {
                            setSelectedRow((pre_value) => [
                              ...pre_value,
                              ele.id,
                            ]);
                          }}
                          checked={false}
                          type="checkbox"
                          className="checkbox"
                        />
                        <span class="checkmark"></span>
                      </label>
                    )}
                  </td>
                  <td className=" name">{ele.name}</td>
                  <td className=" email">{ele.email}</td>
                  <td className="">{ele.role}</td>
                  <td className="edit-delete">
                    <i
                      onClick={() => {
                        toggle_modal();
                        setCurrModalUser(ele);
                      }}
                      class="fas fa-edit"
                    ></i>
                    <i
                      onClick={() => {
                        setUserData({
                          type: "DELETE",
                          payload: ele.id,
                        });
                      }}
                      class="far fa-trash-alt"
                    ></i>
                  </td>
                </tr>
              ))}
          </table>
        </div>
        <div className="pagenation-container">
          <Pagenate
            currPage={currPage}
            dataPerPage={dataPerPage}
            dataLength={seacrhResult.length}
            pagenate={pagenate}
          />
        </div>
      </div>
      {showModal && (
        <Modal
          user={currUser}
          toggle_modal={toggle_modal}
          reset_modal={reset_modal}
        />
      )}
    </div>
  );
}

export default App;
