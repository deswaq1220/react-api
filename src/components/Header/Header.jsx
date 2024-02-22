import React from "react";
import { useNavigate } from "react-router-dom";
import headerStyles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../actions/actions";
import { CART_PAGE, MAIN_PAGE, SIGNUP_PAGE } from "../../constants/Components_constants";
import instance from "../../api/instance";
import { LOG_OUT_API } from "../../api/api_constants";
import { closeBrandModal, openBrandModal } from "../../actions/BrandModalActions";
import { logout } from "../../actions/loginActions";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth);


 

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

  const handleCartClick = () => {
    navigate(CART_PAGE)
  }
  
  

  const handleLogOut = async() => {
    try {
      await instance.delete(LOG_OUT_API)
      alert('로그아웃 성공')
      
      dispatch(logout());
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
            <li onClick={handleCartClick}>
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
