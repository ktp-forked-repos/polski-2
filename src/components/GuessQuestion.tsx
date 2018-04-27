import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../styles/GuessQuestion.css'

class GuessQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: {},
      options: [],
      question: [],
    }

    this.getAnswer = this.getAnswer.bind(this)
  }

  public componentWillMount () {
    const { question, options } = this.props
    this.setState({question, options})
  }
  
  public componentWillReceiveProps (props) {
    const { question, options } = props
    this.setState({question, options})
  }

  public getAnswer (option) {
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
              <div className={'well well-sm' + (option.selected ? ' selected' : '')} onClick={this.getAnswer(option)}>
                {option.text}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

GuessQuestion.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  question: PropTypes.string,
}

export default GuessQuestion
