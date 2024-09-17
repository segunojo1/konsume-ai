import Cookies from "js-cookie";

interface CookieAttributes {
  expires?: number | Date | undefined;
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;
  [property: string]: any;
}

export const useStorage = () => {
  const setCookie = (token: string, value: any, options?: CookieAttributes) => {
    Cookies.set(token, value, options);
  };
  const setAccessToken = (value: any, options?: CookieAttributes) => {
    Cookies.set("access_token", value, options);
  };
  const setRefreshToken = (value: any, options?: CookieAttributes) => {
    Cookies.set("refresh_token", value, options);
  };
  const removeCookie = (token: string, options?: CookieAttributes) => {
    Cookies.remove(token, options);
  };
  const removeAccessToken = (options?: CookieAttributes) => {
    Cookies.remove("access_token", options);
  };
  const removeRefreshToken = (options?: CookieAttributes) => {
    Cookies.remove("refresh_token", options);
  };
  const getCookie = (token: string) => {
    Cookies.get(token);
  };
  const getAccessToken = (): string | undefined => {
    return Cookies.get("ktn");
  };
  const getRefreshToken = (): string | undefined => {
    return Cookies.get("refresh_token");
  };

  return {
    setCookie,
    removeCookie,
    getCookie,
    getAccessToken,
    getRefreshToken,
    setRefreshToken,
    setAccessToken,
    removeRefreshToken,
    removeAccessToken,
  };
};
