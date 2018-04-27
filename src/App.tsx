/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import FinishedLesson from './views/FinishedLesson'
import Home from './views/Home'
import Lesson from './views/Lesson'
import Skill from './views/Skill'

class App extends Component {
  public render (): JSX.Element {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact="true" path='/' component={Home} />
              <Route path='/skill/:id' component={Skill} />
              <Route path='/lesson/finished' component={FinishedLesson} />
              <Route path='/lesson/:id' component={Lesson} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
