import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../Images/logo/Logo.png"
import * as React from "react"
import { Box } from "@mui/system";
import Home from "../Views/Home";
import BlockedShops from "../Views/BlockedShops";
import NewRequestList from "../Views/NewRequestsList";
import { Routes, Route } from "react-router-dom";
import ShopTemplate from "../Views/ShopTemplate";
import Product from "../Views/Product";
import ProductList from "../Views/ProductList";
import VerifiedShopTemplate from "../Views/VerifiedShopTemplate";
import ProductImages from "../Views/ProductImages";
import CreateShop from "../Views/CreateShop";
import AddProduct from "../Views/AddProduct";
import Categories from "../Views/Category/Categories.js";
import AddHighlight from "../Views/AddHighlight";
import ShopBanner from "../Views/ShopBanner";
import Reports from "../Views/Reports";

function Header() {
  return (
    <>
      <Navbar style={{ background: "#D4F1F4", width: "100%" }}>
        <Container >
          <Box marginX="10px"><img width="100vh" src={Logo} /></Box>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav >
              <Nav.Link>
                <NavLink
                  to="home"
                  style={{ textDecoration: "none" }}
                >
                  <Button

                    sx={({ isActive }) =>

                      isActive
                        ? {
                          color: "white",
                        }
                        : {
                          textDecoration: "none",
                          fontFamily: "Lato",
                          lineHeight: "0.8em",
                          color: "inherit",
                          fontSize: "calc(1.2 * 1rem)",
                        }
                    }>
                    Home
                  </Button>

                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to="newRequests"
                  style={{ textDecoration: "none" }}
                >
                  <Button

                    sx={({ isActive }) =>

                      isActive
                        ? {
                          color: "white",


                        }
                        : {
                          textDecoration: "none",
                          fontFamily: "Lato",
                          lineHeight: "0.8em",
                          color: "inherit",
                          fontSize: "calc(1.2 * 1rem)",
                        }
                    }>
                    New Requests
                  </Button>
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to="blockedShops"
                  style={{ textDecoration: "none" }}
                >
                  <Button

                    sx={({ isActive }) =>

                      isActive
                        ? {
                          color: "white",


                        }
                        : {
                          textDecoration: "none",
                          fontFamily: "Lato",
                          lineHeight: "0.8em",
                          color: "inherit",
                          fontSize: "calc(1.2 * 1rem)",
                        }
                    }>Blocked Shops</Button>

                </NavLink>
              </Nav.Link>

              <Nav.Link>
                <NavLink
                  to="createShop"
                  style={{ textDecoration: "none" }}
                >
                  <Button

                    sx={({ isActive }) =>

                      isActive
                        ? {
                          color: "white",


                        }
                        : {
                          textDecoration: "none",
                          fontFamily: "Lato",
                          lineHeight: "0.8em",
                          color: "inherit",
                          fontSize: "calc(1.2 * 1rem)",
                        }
                    }>Create Shop</Button>

                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to="categories"
                  style={{ textDecoration: "none" }}
                >
                  <Button

                    sx={({ isActive }) =>

                      isActive
                        ? {
                          color: "white",


                        }
                        : {
                          textDecoration: "none",
                          fontFamily: "Lato",
                          lineHeight: "0.8em",
                          color: "inherit",
                          fontSize: "calc(1.2 * 1rem)",
                        }
                    }>Categories</Button>

                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to="reports"
                  style={{ textDecoration: "none" }}

                >
                  <Button

                    sx={({ isActive }) =>

                      isActive
                        ? {
                          color: "white",


                        }
                        : {

                          fontFamily: "Lato",
                          lineHeight: "0.8em",
                          color: "inherit",
                          fontSize: "calc(1.2 * 1rem)",
                        }
                    }>Reports</Button>

                </NavLink>
              </Nav.Link>
            </Nav>
            <Button variant="contained" href="/" backgroundColor="black">
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar >

      <Routes>

        <Route path="newRequests" element={<NewRequestList />}></Route>
        <Route path="newRequests/:id" element={<ShopTemplate />}></Route>
        <Route path="verifiedShopsList/:id" element={<VerifiedShopTemplate />}></Route>
        <Route path="verifiedShopsList/showProducts/:shopId" element={<ProductList />}></Route>
        <Route path="verifiedShopsList/showProducts/:shopId/:id" element={<Product />}></Route>
        <Route path="verifiedShopsList/addProduct/:shopId" element={<AddProduct />}></Route>
        <Route path="verifiedShopsList/addHighlight/:shopId" element={<AddHighlight />}></Route>
        <Route path="verifiedShopsList/addShopBanner/:shopId" element={<ShopBanner />}></Route>
        <Route path="categories" element={<Categories />}></Route>
        <Route path="showProductsImages/:shopId/:id" element={<ProductImages />}></Route>
        <Route path="blockedShops" element={<BlockedShops />}></Route>
        <Route path="createShop" element={<CreateShop />}></Route>
        <Route path="reports" element={<Reports />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default Header;
