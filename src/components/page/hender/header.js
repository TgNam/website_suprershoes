import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import logoPage from './logoPage.jpg';
import './header.scss';
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap';


const Header = () => {
    const [showSidebar, setShowSidebar] = React.useState(false);
    const { isInitialized, isAuthenticated, user } = useSelector((state) => state.auth);

    const handleSidebarToggle = () => setShowSidebar(!showSidebar);

    return (
        <>
            <Navbar bg="white" expand="lg" className="p-3 header-navbar">
                <Container className="d-flex justify-content-between align-items-center">
                    {/* Sidebar Toggle for small screens only */}
                    <Navbar.Toggle aria-controls="navbarNav" onClick={handleSidebarToggle} className="d-lg-none format-icon" />

                    {/* Logo */}
                    <Navbar.Brand className="mx-auto mx-lg-0">
                        <Link to="/" >
                            <img src={logoPage} alt="Logo" width="100" />
                        </Link>
                    </Navbar.Brand>

                    {/* Centered Navigation Links for large screens only */}
                    <Navbar.Collapse id="navbarNav" className="justify-content-center d-none d-lg-flex">
                        <Nav>
                            <Nav.Link>
                                <Link to="/all-products" >
                                    Sản phẩm
                                </Link>
                            </Nav.Link>
                            <Nav.Link href="/html/contact.html">Liên hệ</Nav.Link>
                            <Nav.Link href="#">Giới thiệu</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="icon-group d-flex align-items-center">
                        {isAuthenticated ?
                            (<>
                                <p2 style={{fontSize: "18px"}} >Hi! {user?.name}</p2>
                                <Nav.Link href="/logout" className="mx-2">
                                    <Button>Logout</Button>
                                </Nav.Link>
                             </>  
                             )
                            :
                            <Nav.Link href="/login" className="mx-2">  <i className="bi bi-person-circle mx-2"></i></Nav.Link>
                        }
                        <Nav.Link href="/cart" className="mx-2"><i className="bi bi-bag"></i></Nav.Link>
                        <i className="bi bi-search mx-2"></i>
                    </div>
                </Container>
            </Navbar>
            <Offcanvas show={showSidebar} onHide={handleSidebarToggle} placement="start" className="d-lg-none">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="#">Giá ưu đãi</Nav.Link>
                        <Nav.Link href="#">Giày nữ</Nav.Link>
                        <Nav.Link href="#">Giày nam</Nav.Link>
                        <Nav.Link href="#">Giày cặp</Nav.Link>
                        <Nav.Link href="#">Balo - Túi</Nav.Link>
                        <Nav.Link href="#">Sale 50%</Nav.Link>
                        <Nav.Link href="#">Sản phẩm bán chạy</Nav.Link>
                        <Nav.Link href="#">Phụ kiện</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Header;
