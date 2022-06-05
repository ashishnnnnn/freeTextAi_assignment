export const dataAfterSearch = (userData, searchValue) => {
  const userSearch = searchValue.toLowerCase();
  if (searchValue.length === 0) {
    return userData;
  } else {
    let retData = [];
    userData.forEach((user) => {
      if (
        user.name.toLowerCase().includes(userSearch) ||
        user.email.toLowerCase().includes(userSearch) ||
        user.role.toLowerCase().includes(userSearch)
      ) {
        retData.push(user);
      }
    });
    return retData;
  }
};
