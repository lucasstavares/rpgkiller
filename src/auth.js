export const isAuthenticated = () => {
  if (sessionStorage.token !== undefined) {
    return true;
  } else {
    return false;
  }
};
