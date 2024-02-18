import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import headerStyles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../actions/actions";
import { MAIN_PAGE, SIGNUP_PAGE } from "../../constants/Components_constants";
import instance from "../../api/instance";
import { LOG_OUT_API } from "../../api/api_constants";
import { closeBrandModal, openBrandModal } from "../../actions/BrandModalActions";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userStatus = localStorage.getItem("userStatus");
    setIsLoggedIn(!!userStatus); 
  }, []);

  const handleClick = () => {
    dispatch(openLoginModal());

  };

  const handleBrandModalClick = () => {
    dispatch(openBrandModal())
  }
  

  const handleSignUpPage = () => {
    navigate(SIGNUP_PAGE);
  };

  const handleHomeClick = () => {
    navigate(MAIN_PAGE);
    dispatch(closeBrandModal())
  };
  
  

  const handleLogOut = async() => {
    localStorage.clear()
    try {
       await instance.delete(LOG_OUT_API)
       setIsLoggedIn(false)
      alert('로그아웃 성공')
    } catch (error) {
      console.error('로그아웃 에러',error)
    }
  }

  return (
    <header>
      <ul className={headerStyles.logoWrap}>
        <li onClick={handleHomeClick}>
          <h1 className={headerStyles.logo}>발랑</h1>
        </li>
        <li onClick={handleBrandModalClick}>
          <nav className={headerStyles.nav}>BRANDS</nav>
        </li>
      </ul>

      <ul className={headerStyles.signWrap}>
        {isLoggedIn ? (
          <>
            <li>
              <p>장바구니</p>
            </li>
            <li onClick={handleLogOut}>
              <p>로그아웃</p>
            </li>
          </>
        ) : (
          <>
            <li onClick={handleSignUpPage}>
              <p>회원가입</p>
            </li>
            <li onClick={handleClick}>
              <p>로그인</p>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
