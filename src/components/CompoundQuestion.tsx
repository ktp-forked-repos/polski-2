/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
import Word from '../models/Word'
import React, { Component } from 'react'
import '../styles/CompoundQuestion.css'
import Question from '../models/Question';
import Option from '../models/Option';

interface IProps {
  onChange: Function;
  options: Option[];
  question: string;
}

interface IState {
  availableWords: Option[];
  question: string;
  selectedWords: Option[];
}

class CompoundQuestion extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      availableWords: [],
      question: '',
      selectedWords: [],
    }

    this.selectWord = this.selectWord.bind(this)
    this.deselectWord = this.deselectWord.bind(this)
    this.getAnswer = this.getAnswer.bind(this)
  }

  public componentDidMount () {
    this.setState({
      availableWords: this.props.options,
      question: this.props.question,
    })
  }

  public selectWord (option: Option) {
    const selectedWords = [...this.state.selectedWords, option]
    this.setState({
      availableWords: this.state.availableWords.filter(el => el.id !== option.id),
      selectedWords,
    })
    this.getAnswer(selectedWords)
  }

  public deselectWord (option: Option) {
    this.setState({
      availableWords: [...this.state.availableWords, option],
      selectedWords: this.state.selectedWords.filter(el => el.id !== option.id)
    })
  }

  public getAnswer (selectedWords: Option[]) {
    this.props.onChange(selectedWords)
  }

  public render () {
    const { question, selectedWords, availableWords } = this.state
    return (
      <div>
        <div className="row">
          <h4>{question}</h4>
        </div>
        <div className="row">
          <div className="answer">
            {selectedWords.map(option =>
              <div key={option.id} className="word"
                onClick={() => this.deselectWord(option)}>{option.text}</div>
            )}
          </div>
        </div>
        <div className="row">
          {availableWords.map(option =>
            <div key={option.id} className="word"
              onClick={() => this.selectWord(option)}>{option.text}</div>
          )}
        </div>
      </div>
    )
  }
}

export default CompoundQuestion
