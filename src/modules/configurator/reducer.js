// @flow
import * as t from './entities'
import * as at from './const'

export type State = {
  selectedArticles: string[]
}

export const defaultState = {
  selectedArticles: []
}

export default function reducer (state:State=defaultState, action:t.Action):State {
  switch(action.type){
    case at.ADD_ARTICLE: {
      return {
        ...state,
        selectedArticles: [...state.selectedArticles, action.payload]
      }
    }
    default: return state
  }
}