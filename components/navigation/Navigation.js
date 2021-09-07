import {Nav, Navbar, Container} from "react-bootstrap";
import Link from "next/link";

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand className={'star-wars-font'}>
                        <i className="fas fa-jedi fa-2x"></i>
                        Yoda Agency
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/agencies" passHref>
                            <Nav.Link>
                                <i className="fas fa-space-shuttle"></i>
                                Agencies
                            </Nav.Link>
                        </Link>
                        <Link href="/agencies/add" passHref>
                            <Nav.Link>
                                <i className="fas fa-plus-circle"></i>
                                Add agency
                            </Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;

