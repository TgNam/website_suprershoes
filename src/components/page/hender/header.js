import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                {/* <Navbar.Brand href="/">Nguyễn Trường Nam</Navbar.Brand> */}
                {/* <NavLink to={"/"} className='navbar-brand'>Nguyễn Trường Nam</NavLink> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={"/"} className='nav-link'>Home</NavLink>
                        <NavLink to={"/admins"} className='nav-link'>Admin</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;