/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import getArrayFromStorage from '../arrayFromStorage';
import headerLogo from '../img/header-logo.png';
import { updateCart } from '../store/cartSlice';
import { clearSearch } from '../store/searchSlice';
import FormSearch from './FormSearch';
import HeaderCart from './HeaderCart';

export default function Header() {
  const { search } = useSelector((state) => state.searchSlice);
  const [inputForm, setInputForm] = useState('invisible');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    const local =  getArrayFromStorage();
    dispatch(updateCart(local));
    if (location.pathname !== '/catalog' && search !== '') {
      dispatch(clearSearch());
    } else if (location.pathname === '/catalog') {
      setInputForm('invisible');
    };
  }, [dispatch, location.pathname]);

  function toggleSearch() {
    if (inputForm === 'invisible' && location.pathname !== '/catalog') {
      setInputForm('');
    } else if (inputForm === '' && search !== '' && location.pathname !== '/catalog') {
      setInputForm('invisible');
      navigate('/catalog');
    } else if (inputForm === '' && search === '' && location.pathname !== '/catalog') {
      setInputForm('invisible');
    };
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">

          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to={"/"}>
              <img src={headerLogo} alt="Bosa Noga"/>
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/"}>Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/catalog"}>Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/about"}>О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/contacts"}>Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" onClick={toggleSearch} className="header-controls-pic header-controls-search"></div>
                  <HeaderCart/>
                </div>
                <FormSearch classStyle={`header-controls-search-form ${inputForm}`}/>
              </div>
            </div>
          </nav>

        </div>
      </div>
    </header>
  );
};
