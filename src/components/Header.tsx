import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/Header.css'

class Header extends Component {
  public render () {
    return (
      <Navbar collapseOnSelect="true">
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to={'/'}>
              <a>Polski</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {/*
            <LinkContainer to={'/skill'}>
              <NavItem eventKey={1}>Skill</NavItem>
            </LinkContainer>
            <LinkContainer to={'/lesson'}>
              <NavItem eventKey={2}>Lesson</NavItem>
            </LinkContainer>
            */}
            <NavItem eventKey={2}>Goal: {this.props.goal}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Header.propTypes = {
  goal: PropTypes.string
}

function mapStateToProps (state) {
  const { goal } = state
  return {
    goal
  }
}

export default connect(mapStateToProps, null)(Header)
