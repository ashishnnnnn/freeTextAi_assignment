import "./App.css";
import { Header, Pagenate, Modal } from "./Components";
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
    <div className="App">
      <Header />
      <div className="container">
        <div className="top-options">
          <div className="search_bar">
            <i class="fas fa-search"></i>
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCuurentPage(1);
              }}
              placeholder="search by name email or role"
            />
          </div>
          <button
            onClick={() => {
              setUserData({ type: "DELETE_MULTIPLE", payload: selectedRow });
              setSelectedRow([]);
            }}
            disabled={selectedRow.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <div className="tableContainer">
          <table>
            <tr>
              <th className="checkbox-container">
                {selectedRow.length === dataToShow.length ? (
                  <input
                    onClick={() => {
                      setSelectedRow([]);
                    }}
                    type="checkbox"
                    checked={true}
                  />
                ) : (
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
                  />
                )}
              </th>
              <th
                onClick={() => {
                  setSortBy("NAME");
                }}
                className="actionable"
              >
                Name
              </th>
              <th
                onClick={() => {
                  setSortBy("EMAIL");
                }}
                className="actionable"
              >
                Email
              </th>
              <th
                onClick={() => {
                  setSortBy("ROLE");
                }}
                className="actionable"
              >
                Role
              </th>
              <th>Action</th>
            </tr>
            {dataToShow.length > 0 &&
              dataToShow.map((ele) => (
                <tr
                  className={
                    selectedRow.includes(ele.id) ? "active datarow" : "datarow"
                  }
                  key={ele.id}
                >
                  <td className="checkbox-container">
                    {selectedRow.includes(ele.id) ? (
                      <input
                        onClick={() => {
                          setSelectedRow((pre_value) =>
                            pre_value.filter((selected) => selected != ele.id)
                          );
                        }}
                        checked={true}
                        type="checkbox"
                      />
                    ) : (
                      <input
                        onClick={() => {
                          setSelectedRow((pre_value) => [...pre_value, ele.id]);
                        }}
                        checked={false}
                        type="checkbox"
                      />
                    )}
                  </td>
                  <td>{ele.name}</td>
                  <td className="email">{ele.email}</td>
                  <td>{ele.role}</td>
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
                      class="fas fa-trash"
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
