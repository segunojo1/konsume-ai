import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const clearCookie = () => {
  Cookies.remove("ktn");
};

function isAuthenticated(token: string) {
  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = (decodedToken as any).exp * 1000; // convert to milliseconds

    if (Date.now() >= expirationTime) {
      clearCookie();
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error verifying jwt token: ${error}`);
    clearCookie();
    return false;
  }
}

export default isAuthenticated;
