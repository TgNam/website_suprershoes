import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaSignOutAlt, FaCartPlus, FaMicroblog } from 'react-icons/fa';
import logoPage from './logoPage.jpg';
import { getAccountLogin } from '../../../Service/ApiAccountService';
import { useDispatch } from 'react-redux';
import './header.scss';
import { initialize } from '../../../redux/action/authAction';
function Header() {
    const dispatch = useDispatch();
    const [account, setAccount] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            dispatch(initialize({ isAuthenticated: false, user: null }))
        } else {
            fetchAccount();
        }
    }, [dispatch]);

    const fetchAccount = async () => {
        try {
            const response = await getAccountLogin();
            if (response.status === 200) {
                const data = response.data;
                setAccount(data);
                dispatch(initialize({ isAuthenticated: true, data }))
            }
        } catch (error) {
            dispatch(initialize({ isAuthenticated: false, user: null }))
            console.error('Failed to fetch account data:', error);
            setAccount(null);
        }
    };
    return (
        <Navbar collapseOnSelect expand="lg" className="header-navbar" fixed="top">
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="navbar-brand">
                    <img src={logoPage} alt="Logo" className="navbar-brand-img" style={{ maxWidth: '100%' }} />
                </Navbar.Brand>

                {/* Toggle Button */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {/* Navigation */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto justify-content-center w-100">
                        <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
                        <Nav.Link as={Link} to="/about">Giới thiệu</Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle as={Nav.Link} className="text-dark" id="dropdown-products">
                                Sản phẩm
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/allProducts?gender=male">Giày Nam</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/allProducts?gender=female">Giày Nữ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link as={Link} to="/contact">Liên hệ</Nav.Link>
                        <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                    </Nav>

                    {/* User Avatar & Dropdown */}
                    <Nav>
                        {account ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle as="a" href="#" className="d-flex text-dark align-items-center">
                                    <p style={{ fontSize: '16px' }} className="m-0">Hi, {account.name}</p>
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                        alt="Avatar"
                                        className="rounded-circle ms-2"
                                        height="40"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/profile">
                                        <FaUserAlt className="menu-icon" /> Tài khoản
                                    </Dropdown.Item>
                                    {account.role && (account.role === 'ADMIN' || account.role === 'EMPLOYEE') && (
                                        <Dropdown.Item as={Link} to="/admins">
                                            <FaMicroblog className="menu-icon" /> Quản lý
                                        </Dropdown.Item>
                                    )}
                                    <Dropdown.Item as={Link} to="/cart">
                                        <FaCartPlus className="menu-icon" /> Giỏ hàng
                                    </Dropdown.Item>
                                    <hr />
                                    <Dropdown.Item as={Link} to="/logout">
                                        <FaSignOutAlt className="menu-icon" /> Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Dropdown align="end">
                                <div className="d-flex align-items-center">
                                    <Link to="/cart" className="text-dark me-3">
                                        <FaCartPlus style={{ fontSize: '24px' }} />
                                    </Link>
                                    <Dropdown.Toggle as="div" className="d-flex align-items-center">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            alt="Avatar"
                                            className="rounded-circle"
                                            height="30"
                                        />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/login">Đăng nhập</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/register">Đăng ký</Dropdown.Item>
                                    </Dropdown.Menu>
                                </div>
                            </Dropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
