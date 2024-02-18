import axios from "axios";
import { REFRESH_TOKEN } from "./api_constants";

const instance = axios.create({
  baseURL:"https://port-0-express-server-17xco2nlsidlckv.sel5.cloudtype.app",
  withCredentials: true,
})

// const refreshToken = async() => {
//   const refreshToken = localStorage.getItem('refresh_token');

//   try {
//     const response = await instance.get(REFRESH_TOKEN, {
//       headers: {
//         'Authorization': `Bearer ${refreshToken}`
//       }
//     });

//     // response에서 새로운 accessToken을 받아와 로컬 스토리지에 저장
//     if (response.data && response.data.accessToken) {
//       localStorage.setItem('access_token', response.data.accessToken);
//     }
//   } catch (error) {
//     console.error("토큰 갱신 중 에러 발생", error);
//   }
// }

export default instance;