import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export const Header = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#">Monitoreo de Temperaturas</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;