import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShopify } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand
          className="flex items-center gap-2 text-2xl font-bold text-green-600 hover:text-green-700 transition-all"
          href="#home"><FaShopify className="text-3xl text-green-600" />
          <span className='italics-heading'>VibeCommerce</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              to="/"
              className="text-black px-4 py-2 rounded-lg font-semibold italics-heading" style={{textDecoration:"none"}}>
              Products
            </Link>
            <Link
              to="/cart"
              className="text-black px-4 py-2 rounded-lg font-semibold italics-heading" style={{textDecoration:"none"}}>
              Cart
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation