import { Link } from "react-router-dom";
import UserStatus from "../components/UserStatus";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../logo.png";

const NavBar = ({ user }) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt="logo"
            src={logo}
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          Blog List
        </Navbar.Brand>
        <Navbar.Toggle
          className="navbar-light"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100 d-flex justify-content-end">
            <Nav.Link href="#" className="" as="span">
              <Link
                className="link text-secondary text-decoration-none mx-3"
                to="/"
              >
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span" className="me-5">
              <Link
                className="link text-secondary text-decoration-none mx-3"
                to="/users"
              >
                users
              </Link>
            </Nav.Link>

            <UserStatus user={user} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
