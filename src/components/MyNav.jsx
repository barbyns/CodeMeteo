import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MyNav = ({ tema }) => {
  const location = useLocation();

  return (
    <Navbar bg={tema} variant={tema} expand="lg" className="px-4">
      <Navbar.Brand as={Link} to="/" className="text-white">
        MeteoCode<span className="text-warning">.it</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown
            title="Previsioni"
            id="previsioni-nav-dropdown"
            className="text-white"
          >
            <NavDropdown.Item
              as={Link}
              to="/Previsioni/OggiDomani"
              className={location.pathname === '/Previsioni/OggiDomani' ? 'active' : ''}
            >
              Previsioni oggi e domani
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/Previsioni/Italia"
              className={location.pathname === '/Previsioni/Italia' ? 'active' : ''}
            >
              Previsioni meteo Italia
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Regioni"
            id="regioni-nav-dropdown"
            className="text-white"
          >
            <NavDropdown.Item
              as={Link}
              to="/Regioni/Nord"
              className={location.pathname === '/Regioni/Nord' ? 'active' : ''}
            >
              Nord
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/Regioni/Centro"
              className={location.pathname === '/Regioni/Centro' ? 'active' : ''}
            >
              Centro
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/Regioni/Sud"
              className={location.pathname === '/Regioni/Sud' ? 'active' : ''}
            >
              Sud
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
