/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
import React, { Component } from 'react'
import Loading from '../components/Loading'
import '../styles/Skill.css'
import http from '../utils/http'
import { RouteComponentProps } from 'react-router';
import Lesson from '../models/Lesson';

interface IProps extends RouteComponentProps<any> {
}

interface IState {
  lessons: Lesson[]
  loading: boolean
}

class Skill extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      lessons: [],
      loading: true
    }

    this.goToLesson = this.goToLesson.bind(this)
  }

  public goToLesson (lesson: Lesson) {
    this.props.history.push({
      pathname: `/lesson/${lesson.id}`,
      state: {
        questions: lesson.questions
      }
    })
  }

  public componentWillMount () {
    const {id} = this.props.match.params
    http
      .get(`${process.env.REACT_APP_API}/skills/${id}/lessons`)
      .then(response => this.setState({lessons: response.data, loading: false}))
      .catch(console.error)
  }

  public render () {
    const content = this.state.loading
      ? <Loading />
      : this.state.lessons.map((lesson, index, array) =>
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={lesson.id}>
          <div className="well">
            <p>
              <b>Lesson { ++index } of {array.length}</b>
            </p>
            <p>
              <span>{lesson.words.split('*').join(', ')}</span>
            </p>
            <p>
              { lesson.completed
                ? <button className="btn btn-primary" onClick={() => this.goToLesson(lesson)}>REDO</button>
                : <button className="btn btn-success" onClick={() => this.goToLesson(lesson)}>Start</button>
              }
            </p>
          </div>
        </div>
      )
    return (
      <div>
        <div className="row">
          <h2>Skill page</h2>
        </div>
        <div className="row">
          { content }
        </div>
      </div>
    )
  }
}

export default Skill