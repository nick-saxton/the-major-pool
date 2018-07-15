import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" className="mb-5">
          <Container>
            <NavbarBrand href="/">The Major Pool</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">
                    Overall
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Masters">
                    Masters
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/USOpen">
                    US Open
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/OpenChampionship">
                    Open Championship
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/PGAChampionship">
                    PGA Championship
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
