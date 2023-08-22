import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from 'react-bootstrap/Image';
import { LinkContainer } from "react-router-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import petLogo from "../images/pet-logo.png";
import basket from "../images/basket-fill.svg"

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <BrowserRouter>
      <div className='app'>
        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
        <Navbar sticky="top" bg="info" variant="light" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  src={petLogo}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="mr-auto">
                <LinkContainer to="/products">
                  <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                {token ?
                  <>
                    <LinkContainer to="/favorites">
                      <Nav.Link>Favorites</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/order-history">
                      <Nav.Link>Orders</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/account">
                      <Nav.Link>Account</Nav.Link>
                    </LinkContainer>
                    {isAdmin ?
                      <>
                        <LinkContainer to="/dashboard">
                          <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                      </> : null
                    }
                  </> :
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                }
                <Nav.Link onClick={handleShow}>
                  <img
                    src={basket}
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                  />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main id='main'>
          <Route exact path="/">
            <h1>Products</h1>
          </Route>
          <Route path="/products">
            <h1>Products page</h1>
          </Route>
          <Route path="/cart">
            <h1>Cart page</h1>
          </Route>
          <Route path="/login">
            <h1>Login page</h1>
          </Route>
          <Route path="/favorites">
            <h1>Favorites page</h1>
          </Route>
          <Route path="/order-history">
            <h1>Orders page</h1>
          </Route>
          <Route path="/account">
            <h1>Account page</h1>
          </Route>
          <Route path="/dashboard">
            <h1>Dashboard page</h1>
          </Route>
        </main>
      </div>
    </BrowserRouter>
  )
};

export default App;
