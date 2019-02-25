/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { RouteComponentProps } from 'react-router'
import Word from '../models/Word'
import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import http from '../utils/http'

interface IProps extends RouteComponentProps<any> {
}

interface IState {
  lessonId: number
  questions: Word[]
}

class FinishedLesson extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)

    const { questions, lessonId } = props.location.state
    this.state = { questions, lessonId }
    window.console.log(this.state)
  }
  
  public componentDidMount () {
    const data = { completed: true }
    http
      .put(`${process.env.REACT_APP_API}/lessons/${this.state.lessonId}/complete`, data)
      .then(console.log)
  }

  public render () {
    return (
      <div>
        <h2>Finished :)</h2>
        <div>{this.state.questions.filter(a => a.correct).length} correct questions</div>
        <div>{this.state.questions.filter(a => !a.correct).length} wrong questions</div>
        <LinkContainer to={'/'}>
          <a>Home</a>
        </LinkContainer>
      </div>
    )
  }
}


export default FinishedLesson