import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../assets/images/users/user1.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ email: "", role: "" });

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const handleToggle = () => setIsOpen(!isOpen);
  const showMobileMenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(() => {
    // Simulate fetching user data
    const loggedInUser = {
      email: "user@example.com",
      role: "admin", // can be 'admin', 'dosen', or 'mahasiswa'
    };
    if (loggedInUser.email !== "") {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ email: "", role: "" });
    // Redirect to login page or perform other logout actions
  };

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          Logo
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={showMobileMenu}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={handleToggle}
        >
          {isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-three-dots-vertical"></i>}
        </Button>
      </div>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle color="primary">
            <img src={user1} alt="profile" className="rounded-circle" width="30" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>User Info</DropdownItem>
            {isLoggedIn ? (
              <>
                <DropdownItem>{user.email}</DropdownItem>
                <DropdownItem>Role: {user.role}</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </>
            ) : (
              <DropdownItem href="/login">Login</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
