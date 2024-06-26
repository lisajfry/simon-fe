import React, { useState } from "react";
import { Button, Nav, NavItem, NavLink, Collapse } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs"; 

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Rekapitulasi",
    href: "/rekapitulasi",
    icon: "bi bi-bell",
  },
  {
    title: "Capaian IKU",
    icon: "bi bi-patch-check",
    submenu: [
      { title: "IKU 1", href: "/iku1" },
      { title: "IKU 2", href: "/iku2" },
      { title: "IKU 3", href: "/iku3" },
      { title: "IKU 4", href: "/iku4" },
      { title: "IKU 5", href: "/iku5" },
      { title: "IKU 6", href: "/iku6" },
      { title: "IKU 7", href: "/iku7" },
    ],
  },
  {
    title: "Tabel User",
    href: "/userlist",
    icon: "bi bi-link",
  },
  {
    title: "Mahasiswa",
    href: "/mahasiswalist",
    icon: "bi bi-people",
  },
  {
    title: "Dosen",
    href: "/dosenlist",
    icon: "bi bi-people",
  },
  {
    title: "Tahun",
    href: "/yearlist",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => document.getElementById("sidebarArea").classList.toggle("showSidebar")}
          ></Button>
        </span>
      </div>
      <Nav vertical className="sidebarNav">
        {navigation.map((navItem, index) => (
          <React.Fragment key={index}>
            {navItem.submenu ? (
              <NavItem className="sidenav-bg">
                <NavLink
                  className="text-secondary py-2 px-3 d-flex align-items-center"
                  onClick={() => toggleSubmenu(index)}
                  style={{ cursor: "pointer" }}
                >
                  <i className={navItem.icon}></i>
                  <span className="ms-2" style={{ fontSize: "14px" }}>{navItem.title}</span>
                  <span className="ms-auto">
                    {openSubmenu === index ? <BsChevronUp /> : <BsChevronDown />}
                  </span>
                </NavLink>
                <Collapse isOpen={openSubmenu === index}>
                  <Nav vertical>
                    {navItem.submenu.map((subItem, subIndex) => (
                      <NavItem key={subIndex}>
                        <Link
                          to={subItem.href}
                          className={
                            location.pathname === subItem.href
                              ? "text-primary nav-link py-2 px-4"
                              : "nav-link text-secondary py-2 px-4"
                          }
                          style={{ fontSize: "13px" }}
                        >
                          <span className="ms-2">{subItem.title}</span>
                        </Link>
                      </NavItem>
                    ))}
                  </Nav>
                </Collapse>
              </NavItem>
            ) : (
              <NavItem className="sidenav-bg">
                <Link
                  to={navItem.href}
                  className={
                    location.pathname === navItem.href
                      ? "text-primary nav-link py-2 px-3"
                      : "nav-link text-secondary py-2 px-3"
                  }
                  style={{ fontSize: "14px" }}
                >
                  <i className={navItem.icon}></i>
                  <span className="ms-2">{navItem.title}</span>
                </Link>
              </NavItem>
            )}
          </React.Fragment>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
