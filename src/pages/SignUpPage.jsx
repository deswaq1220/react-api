import React, { useEffect, useState } from "react";
import SignUpStyles from "../styles/SignUp.module.css";
import { SIGN_UP_API } from "../api/api_constants";
import axios from "axios";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        `https://port-0-express-server-17xco2nlsidlckv.sel5.cloudtype.app${SIGN_UP_API}`,
        { email, password },
      );
      console.log('회원가입 성공',response.data)
    } catch (error) {
      console.error("회원가입에러", error.response.data);
    }
  };

  return (
    <div className={SignUpStyles.signUpWrap}>
      <form className={SignUpStyles.signUpForm} onSubmit={handleSubmit}>
        <h1 className={SignUpStyles.signUpText}>회원가입</h1>
        <label htmlFor="email" className={SignUpStyles.emailText}>
          이메일
        </label>
        <input
          type="email"
          id="email"
          className={SignUpStyles.email}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password" className={SignUpStyles.pwText}>
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          className={SignUpStyles.pw}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label htmlFor="confirmPw" className={SignUpStyles.confirmPwText}>
          비밀번호 확인
        </label>
        <input
          type="password"
          id="confirmPw"
          className={SignUpStyles.confirmPw}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <button type="submit" className={SignUpStyles.signUpButton}>
          회원가입하기
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
