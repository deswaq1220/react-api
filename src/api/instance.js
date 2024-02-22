import axios from "axios";
import { REFRESH_TOKEN } from "./api_constants";

const instance = axios.create({
  baseURL: "https://port-0-express-server-17xco2nlsidlckv.sel5.cloudtype.app",
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const refreshToken = getCookie("refresh_token"); // 쿠키에서 리프레시 토큰을 가져옵니다.

    const response = await instance.get(REFRESH_TOKEN, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.data && response.data.accessToken) {
      const accessToken = response.data.accessToken;
      setCookie("access_token", accessToken, 1); // 새로운 엑세스 토큰을 쿠키에 저장합니다.
    }
  } catch (error) {
    console.error("토큰 갱신 중 에러 발생", error);
  }
};

export default instance;

// cookieUtils.js

// 쿠키를 설정합니다.
export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 쿠키를 가져옵니다.
export function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}
