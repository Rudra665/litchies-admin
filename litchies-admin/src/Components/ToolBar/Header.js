import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../Images/logo/Logo.png"
import * as React from "react"
import { Box } from "@mui/system";
function Header() {
  return (
    <Navbar style={{ background: "#D4F1F4" }}>
      <Container>
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
  );
}

export default Header;
