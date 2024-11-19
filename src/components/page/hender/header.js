import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import {
    FaUserAlt,
    FaDownload,
    FaCog,
    FaSignOutAlt,
    FaFileDownload,
    FaKey,
    FaUserFriends
} from 'react-icons/fa'; // Import các icon từ react-icons
import { useSelector } from "react-redux";
import logoPage from './logoPage.jpg';
// import './header.scss';

function CollapsibleExample() {
    const { isInitialized, isAuthenticated, user } = useSelector((state) => state.auth);

    return (
        <Navbar collapseOnSelect expand="lg" className="navbar-custom px-4 py-2">
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/admins" className="d-flex align-items-center ">
                    <img
                        src={logoPage}
                        alt="Logo"
                        className="navbar-brand-img"
                        style={{ height: '45px', marginRight: '15px' }}
                    />
                </Navbar.Brand>

                {/* Toggle button */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {/* Menu chính */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/allProducts">
                            <FaUserFriends className="menu-icon" /> Sản phẩm
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admins/manage-apiKey">
                            <FaKey className="menu-icon" /> Quản lý API Key
                        </Nav.Link>
                        <NavDropdown
                            title={
                                <>
                                    <FaDownload className="menu-icon" /> Tải xuống
                                </>
                            }
                            id="collapsible-nav-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="/admins/downloadapp">
                                <FaDownload className="menu-icon" /> Ứng dụng
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/admins">
                                <FaFileDownload className="menu-icon" /> Tài liệu
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    {/* Avatar & Dropdown */}
                    <Nav>
                        {isAuthenticated ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle as="a" href="#" id="avatarDropdown" className="d-flex align-items-center">
                                    <p style={{ fontSize: "20px" }} >Hi! {user?.name}</p>
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                        alt="Avatar"
                                        className="rounded-circle"
                                        height="40"
                                        loading="lazy"
                                    />

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/admins/manage-account">
                                        <FaUserAlt className="menu-icon" /> Thông tin tài khoản
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <FaCog className="menu-icon" /> Cài đặt
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/logout">
                                        <FaSignOutAlt className="menu-icon" /> Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div className="d-flex align-items-center m-3">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    alt="Avatar"
                                    className="rounded-circle me-2"
                                    height="40"
                                    loading="lazy"
                                />
                                <div className="d-flex align-items-center">
                                    <Nav.Link as={Link} to="/login" className="text-decoration-none me-1">
                                        Đăng nhập
                                    </Nav.Link>
                                    <span className="text-muted mx-1">/</span>
                                    <Nav.Link as={Link} to="/register" className="text-decoration-none ms-1">
                                        Đăng ký
                                    </Nav.Link>
                                </div>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;