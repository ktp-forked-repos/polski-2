import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/Header.css'

interface IProps {
  goal: string
}

interface IState {
  goal: string
}

class Header extends Component<IProps, IState> {
  public render () {
    return (
      <Navbar collapseOnSelect={true}>
        <NavbarBrand>
          <LinkContainer to={'/'}>
            <a>Polski</a>
          </LinkContainer>
        </NavbarBrand>
        <NavbarToggle/>
        <NavbarCollapse>
          <Nav>
            {/*
            <LinkContainer to={'/skill'}>
              <NavItem eventKey={1}>Skill</NavItem>
            </LinkContainer>
            <LinkContainer to={'/lesson'}>
              <NavItem eventKey={2}>Lesson</NavItem>
            </LinkContainer>
            */}
            <NavItem>Goal: {this.props.goal}</NavItem>
          </Nav>
        </NavbarCollapse>
      </Navbar>
    )
  }
}

function mapStateToProps (state: IState) {
  const { goal } = state
  return {
    goal
  }
}

export default connect(mapStateToProps, null)(Header)
