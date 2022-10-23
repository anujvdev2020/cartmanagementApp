import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../providers/CartProvider";


function NavbarComponent(args) {
  const [isOpen, setIsOpen] = useState(false);
  const { getNumberOfTodoItems, totalItems } = useCartContext();
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositon);
    }
    //  else {
    //   x.innerHTML = "Geolocation is not supported by this browser.";
    // }
  };

  const showPositon = (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  };

  return (
    <div>
      <Navbar {...args} position="sticky" light>
        <NavbarBrand href="/" style={webStyle.linkStyle}>
          Pizzeria
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink style={webStyle.linkStyle} to="/">
                Menu
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={webStyle.linkStyle} to="/cart">
                Cart ({getNumberOfTodoItems()})
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink style={webStyle.linkStyle} to="/cart">
                Delivering To ....
              </NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const webStyle = {
  linkStyle: {
    color: "white",
    textDecoration: "none",
    marginLeft: 10,
  },
};
export default NavbarComponent;
