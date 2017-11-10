import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

const Header = () => (
  <div>
    <Navbar color="faded" light expand="md">
      <Container>
        <NavbarBrand className='text-primary' href="/">
          <strong>Open Research Corpus Viz</strong>
        </NavbarBrand>
        <Collapse isOpen={true} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/rank/authors">Top Authors</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/rank/publications">Top Publications</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/trend/publications">Publication Trends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/trend/citations">Citation Trends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/web">Citation Web</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/wordcloud">Word Cloud</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  </div>
)

export default Header
