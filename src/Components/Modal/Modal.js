import "./Modal.css";
import { useState } from "react";
import { useUserData } from "../../context/userContext";
export const Modal = ({ user, toggle_modal, reset_modal }) => {
  const { setUserData } = useUserData();
  const [currUser, setCurrUser] = useState(user ? user : {});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCurrUser((pre_user) => ({ ...pre_user, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      type: "EDIT",
      payload: {
        ...currUser,
      },
    });
    toggle_modal();
    reset_modal();
  };
  return (
    <div className="pop_up">
      <div
        onClick={() => {
          toggle_modal();
          reset_modal();
        }}
        className="pop_up_background"
      ></div>
      <div className="pop_up_input ">
        <div
          onClick={() => {
            toggle_modal();
            reset_modal();
          }}
          className="cross "
        >
          &times;
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <p className="form-title">Name</p>
            <input
              name="name"
              className="input"
              placeholder="Add name"
              value={currUser.name || ""}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <p className="form-title">Email</p>
            <input
              name="email"
              className="input"
              placeholder="Add email"
              value={currUser.email || ""}
              onChange={handleChange}
              type="email"
              required
            ></input>
          </div>
          <div>
            <p className="form-title">Role</p>
            <input
              name="role"
              className="input "
              placeholder="Add role"
              value={currUser.role || ""}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="pop_up_buttons ">
            <button type="submit" className="btn btn-primary ">
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle_modal();
                reset_modal();
              }}
              className="btn btn-secondary "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
