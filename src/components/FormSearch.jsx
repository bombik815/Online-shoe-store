import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearch } from '../store/middleware';
import { changeSearch, clearSearch } from '../store/searchSlice';

export default function FormSearch({classStyle}) {
  const { search } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  function submit(ev) {
    ev.preventDefault()
    if (location.pathname !== '/catalog' && search !== '') {
      navigate('/catalog');
      dispatch(getSearch(search));
      dispatch(clearSearch());
    } else {
      dispatch(getSearch(search));
      dispatch(clearSearch());
    };
  };

  function inputSearch(ev) {
    dispatch(changeSearch(ev.target.value));
  };

  return (
    <form className={`${classStyle ? classStyle : 'catalog-search-form'} form-inline`}
      onSubmit={submit}>
      <input className="form-control" placeholder="Поиск"
      value={search}
      onChange={inputSearch}/>
    </form>
  );
};
