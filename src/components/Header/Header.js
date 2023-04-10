import React from "react";
import { Nav, Navbar, NavbarBrand } from "reactstrap";

const Header = () => {
  function handlerLogout(e) {
    e.preventDefault();
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  return (
    <Navbar color="secondary" dark className="fixed-top content-header-custom">
      <a href="/" className="text-light m-0 h4">
        BattleShips
      </a>

      {localStorage.getItem("authToken")
        ? <Nav className="ml-auto" navbar>
            <NavbarBrand
              className="btn btn-info"
              href="#"
              onClick={e => handlerLogout(e)}
            >
              Logout
            </NavbarBrand>
          </Nav>
        : null}
    </Navbar>
  );
};

export default Header;
