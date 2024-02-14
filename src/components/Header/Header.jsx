import React from 'react'
import { useNavigate } from 'react-router-dom';
import headerStyles from './Header.module.css'
import { useDispatch } from 'react-redux';
import { openLoginModal } from '../../actions/actions';
import { MAIN_PAGE, SIGNUP_PAGE } from '../../constants/Components_constants';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openLoginModal());
  };

  const handleSignUpPage = () => {
    navigate(SIGNUP_PAGE)
  }

  const handleHomeClick = () => {
    navigate(MAIN_PAGE)
  }

  return (
   <header>
    <ul className={headerStyles.logoWrap}>
      <li onClick={handleHomeClick}>
        <h1 className={headerStyles.logo}>발랑</h1>
      </li>
      <li>
        <nav>BRANDS</nav>
      </li>
    </ul>

    <ul className={headerStyles.signWrap}>
      <li onClick={handleSignUpPage}>
        <p>회원가입</p>
      </li>
      <li onClick={handleClick}>
        <p>로그인</p>
      </li>
    </ul>
   </header>
  )
}

export default Header