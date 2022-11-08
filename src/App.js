import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Catalog from "./components/Catalog";
import Contacts from "./components/Contacts";
import ErrorPage from "./components/ErrorPage";
import FormSearch from "./components/FormSearch";
import HeaderAndFooter from "./components/HeaderAndFooter";
import Main from "./components/Main";
import Order from "./components/Order";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HeaderAndFooter/>}>
        <Route index element={<Main/>}/>
        <Route path="/catalog" element={
          <Catalog>
            <FormSearch/>
          </Catalog>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/catalog/:id" element={<Order/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Route>
    </Routes>
  );
}
