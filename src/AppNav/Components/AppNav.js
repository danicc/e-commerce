import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { categories } from "../../api/categories.json";
import SublevelMenu from "./SublevelMenu";

const AppNav = props => {
  const { handleMenuClick } = props;
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <p>El Baratón</p>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullLeft>
          {categories.map(category => {
            return (
              <NavDropdown
                id={category.id}
                title={category.name}
                key={category.id}
              >
                {category.sublevels && (
                  <SublevelMenu
                    handleMenuClick={handleMenuClick}
                    menuItem={category.sublevels}
                  />
                )}
              </NavDropdown>
            );
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNav;
