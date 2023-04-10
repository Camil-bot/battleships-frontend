import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

const VerticalNavbar = () => {
  return (
    <>
      <Nav vertical expand="xl" fixed="top" className="mt-2">
        <NavItem>
          <NavLink className="navlink-custom-elem" href="/user/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navlink-custom-elem" href="/user/games">Games</NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default VerticalNavbar;
