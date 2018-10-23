import React, { Component } from 'react-dom';
import { Router, Route, NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import mainLogo from '../assets/images/BOSS_PIUVN.png'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const self = this;
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="javascript:void(0)"><img className='img-fluid main-logo' src={mainLogo} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/song" activeClassName="active" tag={RRNavLink}>Song</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                  </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Sign Out
                  </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation