import { combineReducers } from 'redux'
import { REACH_GOAL } from '../constants'

interface IAction {
  payload: any;
  type: string;
}

const goal = (state = 'not finished', action: IAction) => {
  switch (action.type) {
    case REACH_GOAL:
      return 'you have reached your daily goal!'
    default:
      return state
  }
}

export default combineReducers({
  goal
})
