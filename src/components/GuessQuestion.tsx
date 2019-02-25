import Word from '../models/Word'
import React, { Component } from 'react'
import '../styles/GuessQuestion.css'

interface IProps {
  onChange: Function;
  options: Word[];
  question: Word;
}

interface IState {
  answer: Word;
  options: Word[];
  question: Word;
}

class GuessQuestion extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      answer: new Word(),
      options: [],
      question: new Word(),
    }

    this.getAnswer = this.getAnswer.bind(this)
  }

  public componentWillMount () {
    const { question, options } = this.props
    this.setState({question, options})
  }
  
  public componentWillReceiveProps (props: IProps) {
    const { question, options } = props
    this.setState({question, options})
  }

  public getAnswer (option: Word) {
    this.cleanSelectedAnswers()
    option.selected = true
    this.props.onChange(option)
  }

  public cleanSelectedAnswers () {
    this.props.options.forEach(option => {
      option.selected = false
    })
  }

  public render () {
    const { question, options } = this.state
    return (
      <div>
        <div className="row">
          <h4>{question}</h4>
        </div>
        <div className="row">
          {options.map(option =>
            <div key={option.id} className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className={'well well-sm' + (option.selected ? ' selected' : '')} onClick={() => this.getAnswer(option)}>
                {option.text}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default GuessQuestion
