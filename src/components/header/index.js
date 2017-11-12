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
import { NavLink as Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'

import './styles.css'

const Header = () => (
  <div className='cir__header mb-3'>
    <Paper>
    <Navbar color="faded" light expand="md">
      <Container>
        <NavbarBrand className='text-primary' href="/">
          <strong>Open Research Corpus Viz</strong>
        </NavbarBrand>
        <Collapse isOpen={true} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink activeClassName='cir__header_active-nav' tag={Link} to="/rank/authors">Top Authors</NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName='cir__header_active-nav' tag={Link} to="/rank/publications">Top Publications</NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName='cir__header_active-nav' tag={Link} to="/trend/publications">Publication Trends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName='cir__header_active-nav' tag={Link} to="/trend/citations">Citation Trends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName='cir__header_active-nav' tag={Link} to="/web">Citation Web</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    </Paper>
  </div>
)

export default Header
