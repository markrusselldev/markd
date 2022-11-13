import React, { Component } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"

class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#0">MARKD</Navbar.Brand>
          <Navbar.Text>A Markdown Previewer by&nbsp;</Navbar.Text>
          <Nav className="me-auto">
            <Nav.Link href="https://markrussell.dev">Mark Russell</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Powered by" id="collasible-nav-dropdown">
                <NavDropdown.Item href="https://getbootstrap.com">Bootstrap</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://reactjs.org">React</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://www.npmjs.com/package/react-markdown">react-markdown</NavDropdown.Item>
                <NavDropdown.Item href="https://www.npmjs.com/package/remark-gfm">remark-gfm</NavDropdown.Item>
                <NavDropdown.Item href="https://www.npmjs.com/package/rehype-highlight">rehype-highlight</NavDropdown.Item>
                <NavDropdown.Item href="https://www.npmjs.com/package/react-bootstrap">react-bootstrap</NavDropdown.Item>
                <NavDropdown.Item href="https://www.npmjs.com/package/react-tooltip">react-tooltip</NavDropdown.Item>
                <NavDropdown.Item href="https://www.npmjs.com/package/file-saver">file-saver</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Nav>
              <Nav.Link href="#deets">Hire me &rarr;</Nav.Link>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
export default Header
