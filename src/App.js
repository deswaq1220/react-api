import { Route,Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import { MAIN_PAGE, SIGNUP_PAGE } from './constants/Components_constants';
import MainPage from './pages/MainPage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage';
import Login from './components/Login/Login';


function App() {
  const isLoginOpen = useSelector(state => state.modal.isLoginOpen);
  return (
    <>
      {isLoginOpen && <Login />}
    <Header/>
    <Routes>
      <Route path={MAIN_PAGE} element={<MainPage/>}/>
      <Route path={SIGNUP_PAGE} element={<SignUpPage/>}/>
    </Routes>
    </>
  );
}

export default App;
