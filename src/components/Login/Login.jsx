import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../../actions/actions";
import axios from "axios";
import { LOGIN_API } from "../../api/api_constants";
import { MAIN_PAGE } from "../../constants/Components_constants";
import { login } from "../../actions/loginActions";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const handleInputClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 중지
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://port-0-express-server-17xco2nlsidlckv.sel5.cloudtype.app${LOGIN_API}`,
        { email, password },
        {
          headers: {
            Authorization: `Basic ${btoa(email + ":" + password)}`,
          },
          withCredentials: true,  
        }
      );
      
      
      alert('로그인 성공')
      navigate(MAIN_PAGE)
      dispatch(login())
      handleClose()
      console.log("로그인 성공!", response);
    } catch (error) {
      console.error("로그인 에러", error.response.data);
    }
  };

  return (
    <div className={loginStyles.wrap} onClick={handleClose}>
      <form className={loginStyles.loginForm} onClick={handleInputClick}>
        <h1 className={loginStyles.loginText}>로그인</h1>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          className={loginStyles.email}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className={loginStyles.pw}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button
          type="submit"
          className={loginStyles.loginButton}
          onClick={handleLogin}
        >
          로그인하기
        </button>
      </form>
    </div>
  );
};

export default Login;
