import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import '../Styles/Header.css';

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
            <Container>
                <Navbar.Brand to="/" className='navbar-brand'>EasyShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">About</Nav.Link>
                        <Nav.Link as={Link} to="/shopping-list">Shopping List</Nav.Link>
                        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
