import React from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
// import mainLogo from '../assets/images/BOSS_PIUVN.png';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { push } from 'react-router-redux'
import store from '../configureStore'

class NavigationBar extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.signOut = this.signOut.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  signOut () {
    // this.props.signOut();
    store.dispatch(push('/logout'))
  }

  render () {
    const { userInfo } = this.props
    console.log(userInfo)
    return (
      <div>
        <Navbar fixed="top" color="light" light expand="md">
          <NavbarBrand href="javascript:void(0)"><img className='img-fluid main-logo' src={`http://localhost:3000/images/BOSS_PIUVN.png`} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/song" activeClassName="active" tag={RRNavLink}><FontAwesomeIcon className='nav-item-logo' icon="music" /> Song</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/request" activeClassName="active" tag={RRNavLink}><FontAwesomeIcon className='nav-item-logo' icon="address-book" /> Request</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <img className='img-fluid avatar' src={userInfo ? userInfo.avatarImg : null} /> Hi, {userInfo ? userInfo.displayName : null}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                              Option 1
                  </DropdownItem>
                  <DropdownItem>
                              Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.signOut}>
                              Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.user
})

export default connect(mapStateToProps, null)(NavigationBar)
