export const userDataReducer = (state, action) => {
  const type = action.type;
  switch (type) {
    case "INITIAL_ADD":
      return [...action.payload];

    case "DELETE_MULTIPLE":
      const selectedRow = action.payload;
      return state.filter((ele) => !selectedRow.includes(ele.id));
    case "EDIT":
      const editedUser = action.payload;
      return state.map((ele) => (ele.id === editedUser.id ? editedUser : ele));
    case "DELETE":
      const toDeleteRow = action.payload;
      return state.filter((ele) => ele.id !== toDeleteRow);
    default:
      return state;
  }
};
