import React from "react";
import { NavDropdown, NavItem } from "react-bootstrap";

const SublevelMenu = props => {
  const { menuItem, handleMenuClick } = props;
  return (
    <React.Fragment>
      {menuItem.map(sublevel => {
        if (sublevel.sublevels) {
          return (
            <NavDropdown
              onClick={() => handleMenuClick(sublevel.id, sublevel.name, false)}
              id={sublevel.id}
              title={sublevel.name}
              key={sublevel.id}
            >
              {sublevel.sublevels && (
                <SublevelMenu
                  menuItem={sublevel.sublevels}
                  handleMenuClick={handleMenuClick}
                />
              )}
            </NavDropdown>
          );
        }
        return (
          <NavItem
            id={sublevel.id}
            onClick={() => handleMenuClick(sublevel.id, sublevel.name, true)}
            key={sublevel.id}
          >
            {sublevel.name}
          </NavItem>
        );
      })}
    </React.Fragment>
  );
};

export default SublevelMenu;
