
import * as React from "react"
// import Header from "../Components/ToolBar/header";
import Home from "./Views/Home";

import BlockedShops from "./Views/BlockedShops";
import NewRequestList from "./Views/NewRequestsList";
import { Routes, Route } from "react-router-dom";
import ShopTemplate from "./Views/ShopTemplate";
import Product from "./Views/Product";
import ProductList from "./Views/ProductList";
import VerifiedShopTemplate from "./Views/VerifiedShopTemplate";
import ProductImages from "./Views/ProductImages";
import CreateShop from "./Views/CreateShop";
import AddProduct from "./Views/AddProduct";
import Categories from "./Views/Category/Categories.js";
import AddHighlight from "./Views/AddHighlight";
import ShopBanner from "./Views/ShopBanner";
import Reports from "./Views/Reports";
import Header from "./ToolBar/Header";
function RoutesFunc() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="home" element={<Home />}></Route>
        {/* <Route path="home" element={<VerifiedShopsList />}></Route> */}
        <Route path="newRequests" element={<NewRequestList />}></Route>
        <Route path="newRequests/:id" element={<ShopTemplate />}></Route>

        <Route path="home/:id" element={<VerifiedShopTemplate />}></Route>


        <Route path="home/showProducts/:shopId" element={<ProductList />}></Route>
        <Route path="home/showProducts/:shopId/:id" element={<Product />}></Route>

        <Route path="home/addProduct/:shopId" element={<AddProduct />}></Route>
        <Route path="home/addHighlight/:shopId" element={<AddHighlight />}></Route>
        <Route path="home/addShopBanner/:shopId" element={<ShopBanner />}></Route>

        <Route path="categories" element={<Categories />}></Route>
        {/* <Route path="categories/:catId" element={<SubCategoryList />}></Route> */}
        {/* <Route path="categories/:catId/:subCatId" element={<ChildCategoryList />}></Route> */}

        <Route path="showProductsImages/:shopId/:id" element={<ProductImages />}></Route>
        <Route path="blockedShops" element={<BlockedShops />}></Route>
        <Route path="createShop" element={<CreateShop />}></Route>
        <Route path="reports" element={<Reports />}></Route>
        {/* <Route path="showCategories/:shopId/:catId/:subCatId/:childCatId" element={<ProductRefinedList />}></Route> */}
        {/* <Route path="addCategory/:id" element={<AddCategory />}></Route> */}
        <Route path="*" element={<Home />}></Route>
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

export default RoutesFunc;
