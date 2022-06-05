export const dataAfterSort = (userData, sortBy) => {
  if (sortBy === "NONE") {
    return userData;
  } else {
    if (sortBy === "NAME") {
      return userData.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "EMAIL") {
      return userData.sort(function (a, b) {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "ROLE") {
      return userData.sort(function (a, b) {
        if (a.role < b.role) {
          return -1;
        }
        if (a.role > b.role) {
          return 1;
        }
        return 0;
      });
    }
  }
};
