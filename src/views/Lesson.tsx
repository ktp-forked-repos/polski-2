/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { RouteComponentProps } from 'react-router'
import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { reachGoal } from '../redux/actions'
import CompoundQuestion from '../components/CompoundQuestion'
import GuessQuestion from '../components/GuessQuestion'
import Loading from '../components/Loading'
import ProgressBar from '../components/ProgressBar'
import '../styles/Lesson.css'
import http from '../utils/http'
import Question from '../models/Question';
import Option from '../models/Option';

interface IProps extends RouteComponentProps<any> {
  dispatchReachGoal: Function
}

interface IState {
  answers: Array<Option[]>
  correct: boolean
  currentQuestionIndex: number
  disabledCheckButton: boolean
  progress: number
  questions: Question[]
  visibleAnswerBox: boolean
}

class Lesson extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      answers: [],
      correct: false,
      currentQuestionIndex: 0,
      disabledCheckButton: false,
      progress: 0,
      questions: [],
      visibleAnswerBox: false,
    }

    this.nextQuestion = this.nextQuestion.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.getAnswer = this.getAnswer.bind(this)
  }

  public componentDidMount () {
    const { id } = this.props.match.params
    http
      .get(`${process.env.REACT_APP_API}/lessons/${id}/questions`)
      .then(response => {
        this.setState({questions: response.data})
      })
  }

  public getAnswer (answer: Option[]) {
    const { currentQuestionIndex, answers } = this.state
    answers[currentQuestionIndex] = answer
    this.setState({answers})
  }

  public render () {
    if (this.state.questions.length) {
      let question

      switch (this.state.questions[this.state.currentQuestionIndex].category) {
        case 'guess':
          question = <GuessQuestion
            question={this.state.questions[this.state.currentQuestionIndex].expression}
            options={this.state.questions[this.state.currentQuestionIndex].options}
            onChange={this.getAnswer}
          />
          break
        case 'compound':
          question = <CompoundQuestion
            question={this.state.questions[this.state.currentQuestionIndex].expression}
            options={this.state.questions[this.state.currentQuestionIndex].options}
            onChange={this.getAnswer}
          />
          break
        default:
          break
      }

      const btnNextQuestion = this.state.visibleAnswerBox
        ? <div className="row">
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 success-box">
            <span className="pull-left">Correct!</span>
            <button
              className="btn btn-primary pull-right"
              onClick={this.nextQuestion}>
              Next
            </button>
          </div>
        </div>
        : null

      return (
        <div>
          <ProgressBar progress={this.state.progress} />
          <h2>Lesson</h2>
          {question}
          <button
            disabled={this.state.disabledCheckButton}
            className="btn btn-default"
            onClick={this.checkAnswer}>
            Check
          </button>
          {btnNextQuestion}
        </div>
      )
    } else {
      // this.props.history.goBack()
      return (
        <div>
          <Loading />
        </div>
      )
    }
  }

  public checkAnswer () {
    const { currentQuestionIndex, questions, answers } = this.state
    const currentQuestion = questions[currentQuestionIndex]
    const currentAnswer = answers[currentQuestionIndex]
    let progress
    if (currentQuestion.category === 'guess') {
      this.setState({
        correct: true,
        disabledCheckButton: true,
        visibleAnswerBox: true,
      })
      progress = (currentAnswer && !!currentAnswer.filter(x => x.correct).length)
        ? questions[currentQuestionIndex].weight
        : -(questions[currentQuestionIndex].weight)
      questions[currentQuestionIndex].correct = !!currentAnswer.filter(x => x.correct).length
    } else {
      // Check if there is any incorrect word
      const hasWrongWord = currentAnswer.map(x => x.correct).includes(false)
      if (hasWrongWord) {
        this.setState({
          correct: false,
          disabledCheckButton: true,
          visibleAnswerBox: true,
        })
        progress = 0
      } else {
        // Check if the words are in the correct order
        if (this.orderedAnswers(currentAnswer.map(x => x.order))) {
          this.setState({
            correct: true,
            disabledCheckButton: true,
            visibleAnswerBox: true,
          })
          progress = currentQuestion.weight
          questions[currentQuestionIndex].correct = true
        } else {
          this.setState({
            correct: false,
            disabledCheckButton: true,
            visibleAnswerBox: true,
          })
          progress = 0
          questions[currentQuestionIndex].correct = false
        }
      }
    }
    this.setState({
      progress: this.state.progress + progress
    })
  }

  public nextQuestion () {
    const { currentQuestionIndex, questions } = this.state
    const nextStep = currentQuestionIndex + 1
    if (nextStep < questions.length) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        disabledCheckButton: false,
        visibleAnswerBox: false,
      })
    } else {
      this.props.dispatchReachGoal()
      this.props.history.push({
        pathname: '/lesson/finished',
        state: {
          lessonId: this.props.match.params.id,
          questions: this.state.questions,
        }
      })
    }
  }

  public orderedAnswers (a: any, b = 0) {
    let m = 0
    let currentNum
    let nextNum
    let result = a
    let test
    if (a !== undefined) {
      if (a.constructor === Array) {
        result = true
        while (m < a.length) {
          currentNum = a[m]
          nextNum = a[m + 1]
          if (typeof currentNum === 'number' && typeof nextNum === 'number') {
            if (b === 1) {
              test = currentNum <= nextNum
            } else {
              test = currentNum >= nextNum
            }
            if (test) {
              result = false
              break
            }
          }
          m += 1
        }
      }
    }
    return result
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  dispatchReachGoal: () => {
    dispatch(reachGoal())
  }
})

export default connect(null, mapDispatchToProps)(Lesson)
