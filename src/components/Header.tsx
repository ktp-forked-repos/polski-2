import React, { Component } from 'react'
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
      <header>
        <div className="brand">
          <LinkContainer to={'/'}>
            <a>Polski</a>
          </LinkContainer>
        </div>
        <div>
          <div>
            <div>Goal: {this.props.goal}</div>
          </div>
        </div>
      </header>
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
