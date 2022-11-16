import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import * as React from "react"
function Header() {
  return (
    <Navbar style={{ background: "#f55666" }}>
      <Container>
        <Navbar.Brand marginY="1vh">Litchies Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbarApni">
            <Nav.Link>
              <NavLink
                to="home"
                style={({ isActive }) =>
                  isActive
                    ? {
                      color: "black",
                    }
                    : {
                      textDecoration: "none",
                      fontFamily: "Lato",
                      lineHeight: "0.8em",
                      color: "inherit",
                      fontSize: "calc(1.2 * 1rem)",
                    }
                }
              >
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="newRequests"
                style={({ isActive }) =>
                  isActive
                    ? {
                      color: "black",
                    }
                    : {
                      textDecoration: "none",
                      fontFamily: "Lato",
                      lineHeight: "0.8em",
                      color: "inherit",
                      fontSize: "calc(1.2 * 1rem)",
                    }
                }
              >
                New Requests
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="blockedShops"
                style={({ isActive }) =>
                  isActive
                    ? {
                      color: "black",
                    }
                    : {
                      textDecoration: "none",
                      fontFamily: "Lato",
                      lineHeight: "0.8em",
                      color: "inherit",
                      fontSize: "calc(1.2 * 1rem)",
                    }
                }
              >
                Blocked Shops
              </NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink
                to="createShop"
                style={({ isActive }) =>
                  isActive
                    ? {
                      color: "black",
                    }
                    : {
                      textDecoration: "none",
                      fontFamily: "Lato",
                      lineHeight: "0.8em",
                      color: "inherit",
                      fontSize: "calc(1.2 * 1rem)",
                    }
                }
              >
                Create Shop
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="categories"
                style={({ isActive }) =>
                  isActive
                    ? {
                      color: "black",
                    }
                    : {
                      textDecoration: "none",
                      fontFamily: "Lato",
                      lineHeight: "0.8em",
                      color: "inherit",
                      fontSize: "calc(1.2 * 1rem)",
                    }
                }
              >
                Categories
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="reports"
                style={({ isActive }) =>
                  isActive
                    ? {
                      color: "black",
                    }
                    : {
                      textDecoration: "none",
                      fontFamily: "Lato",
                      lineHeight: "0.8em",
                      color: "inherit",
                      fontSize: "calc(1.2 * 1rem)",
                    }
                }
              >
                Reports
              </NavLink>
            </Nav.Link>
          </Nav>
          <Button variant="contained" href="/" backgroundColor="black">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
