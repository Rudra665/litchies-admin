import * as React from "react";
import './SideBar.css';
import 'boxicons';
import { useLocation } from 'react-router-dom'
import Home from "../../Views/Home/Home";
import BlockedShops from "../../Views/BlockedShops";
import ShopDetails from "../../Views/ShopDetails";
import NewRequestList from "../../Views/NewRequestsList";
import { Routes, Route } from "react-router-dom";
import ShopTemplate from "../../Views/ShopTemplate";
import Product from "../../Views/Product";
import ProductList from "../../Views/ProductList";
import VerifiedShopTemplate from "../../Views/VerifiedShopTemplate";
import ProductImages from "../../Views/ProductImages";
import UnVerifiedProduct from "../../Views/UnVerifiedProduct"
import CreateShop from "../../Views/AddNewShop";
import AddProduct from "../../Views/AddProduct";
import Categories from "../../Views/Category/Categories.js";
import AddHighlight from "../../Views/AddHighlight";
import ShopBanner from "../../Views/ShopBanner";
import Reports from "../../Views/Reports";
import { Link } from "react-router-dom";
import { Login } from "@mui/icons-material";
const { useState, useEffect } = React

const Sidebar = () => {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };
  let menuItems = [
    {
      name: "Litchies",
      iconName: "sidebar",
    },
    {
      index:0,
      name: "Home",
      iconName: "home",
      type: "solid",
      link: '*'
    },
    {
      index:1,
      name: "New Requests",
      iconName: "store",
      type: "solid",
      link: 'newRequests'
    },
    {
      index:2,
      name: "Blocked Shops",
      iconName: "no-entry",
      type: "solid",
      link: 'blockedShops'
    },
    {
      index:3,
      name: "Create Shop",
      iconName: "add-to-queue",
      type: "solid",
      link: 'createShop'
    },
    {
      index:4,
      name: "Categories",
      iconName: "category",
      type: "solid",
      link: 'categories'
    },
    // {
    //   index:5,
    //   name: "Un-Verified Products",
    //   iconName: "radiation",
    //   type: "solid",
    //   link: 'verifiedShopsList/UnVerifiedProducts'
    // },
    {
      index:5,
        name: "Reports",
        iconName: "receipt",
        type: "solid",
        link: 'reports'
      },

    {
      name: "Log Out",
      iconName: "log-out",
      link:"/",
      color: "red",
      rotate: "180",
    },
  ];
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const changeSmall = useMediaQuery("(max-height: 550px)");
  let delay = 1;
  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delay]);
  const currentLink = useLocation().pathname;
  return (
    <>
    <div className={`sidebar ${expanded && "expanded"}`}>
      {menuItems.map((item, index) => {
        let middle = false;
        if (!(index === 0 || index === menuItems.length - 1)) {
          middle = true;
        }

        return (
          <div
            className={`boxicon-container ${
              expanded && "expanded-boxicon-container"
            }`}
            onMouseEnter={() => {
              if (middle) {
                setHovered(index);
              }
            }}
            onMouseLeave={() => {
              if (middle) {
                setHovered(null);
              }
            }}
            onClick={() => {
              if (middle) {
                setActive(index);
              }
              if (index === 0) {
                setExpanded(!expanded);
                console.log(currentLink)
              }
            }}
            key={index}
          >
          <Link to={item.link} className={currentLink===item.link?'active-Link active':''}>
          
            <box-icon
              class={`${middle && "boxicon"} 
                      ${!middle && "first-and-last-trash-fix"}
                      `}
              size={changeSmall ? "sm" : "md"}
              name={item.iconName}
              type={item.type}
              color={
                hovered === index || currentLink === item.link ? "#f9003b" : 'white'
              }
              animation={currentLink === item.link && animate ? "tada" : ""}
              rotate={item.rotate}
            ></box-icon>
            <p
              className={`description 
            ${expanded && "show-description"}
            ${currentLink === item.link && "active-description"}`}
            >
              {item.name}
            </p>
          </Link>

          </div>
        );
      })}
    </div>
    <Routes>

    <Route path="newRequests" element={<NewRequestList />}></Route>
    <Route path="newRequests/:id" element={<ShopTemplate />}></Route>
    <Route path="verifiedShopsList/:id" element={<VerifiedShopTemplate />}></Route>
    <Route path="verifiedShopsList/showProducts/:shopId" element={<ProductList />}></Route>
    <Route path="verifiedShopsList/showProducts/:shopId/:id" element={<Product />}></Route>
    <Route path="verifiedShopsList/UnVerifiedProducts" element={<UnVerifiedProduct />}></Route>
    <Route path="verifiedShopsList/shopDetails/:shopId" element={<ShopDetails />}></Route>
    <Route path="verifiedShopsList/addProduct/:shopId" element={<AddProduct />}></Route>
    <Route path="verifiedShopsList/addHighlight/:shopId" element={<AddHighlight />}></Route>
    <Route path="verifiedShopsList/addShopBanner/:shopId" element={<ShopBanner />}></Route>
    <Route path="categories" element={<Categories />}></Route>
    <Route path="showProductsImages/:shopId/:id" element={<ProductImages />}></Route>
    <Route path="blockedShops" element={<BlockedShops />}></Route>
    <Route path="createShop" element={<CreateShop />}></Route>
    <Route path="reports" element={<Reports />}></Route>
    <Route path="*" element={<Home />}></Route>
    <Route path="/" element={<Login/>}></Route>
  </Routes>
  </>
  );
};
export default Sidebar;