/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
import dotenv from 'dotenv'
import React, { Component } from 'react'
import Loading from '../components/Loading'
import SkillBadge from '../components/SkillBadge'
import '../styles/Home.css'
import http from '../utils/http'

dotenv.config()

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
      loading: true,
      skills: [],
    }
  }

  public componentDidMount () {
    http
      .get(`${process.env.REACT_APP_API}/skills`)
      .then(response => this.setState({ skills: response.data, loading: false }))
      .catch(error => {
        window.console.log(error)
        this.setState({ errorMessage: 'An error occured. Refresh the page.', loading: false })
      })
  }

  public render () {
    const content = this.state.loading
      ? <Loading />
      : <div className="row">
        <p className="text-left">
          Home
        </p>
        <h2>{this.state.errorMessage}</h2>
        { this.state.skills.map((skill, id) =>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4" key={id}>
            <SkillBadge {...skill} />
          </div>
          // <SkillBadge key={skill.id} name={skill.name} id={skill.id} active={skill.active} />
        ) }
      </div>
    return content
  }
}
