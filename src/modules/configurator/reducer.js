// @flow
import * as t from './entities'
import * as at from './const'
import type {Action} from './actions'
import defaultConfigurator from './defaultConfigurator.json'

export type State = {
  articles: {[title:string]: string[]},
  shown: {[title:string]: number},
  byId: {[title:string]: t.Step},
  allIds: string[],
  step: number
}

export const defaultState = {
  articles: defaultConfigurator.reduce((p,n) => (p[n.title]=[]) && p,{}),
  shown: defaultConfigurator.reduce((p,n) => (p[n.title]=24) && p,{}),
  byId: defaultConfigurator.reduce((p,n) => (p[n.title]=n) && p,{}),
  allIds: defaultConfigurator.map(s => s.title),
  step: 0
}

export default function reducer (state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.ADD_ARTICLE: {
      const title = state.byId[state.allIds[state.step]].title
      return {
        ...state, 
        articles: {
          ...state.articles,
          [title]: [...state.articles[title], action.payload]
        }
      }
    }
    case at.REMOVE_ARTICLE: {
      const title = state.byId[state.allIds[state.step]].title
      return {
        ...state, 
        articles: {
          ...state.articles,
          [title]: state.articles[title].filter(s => s !== action.payload)
        }
      }
    }
    case at.SET_STEP: {
      return { ...state, step: action.payload }
    }
    case at.SHOW_MORE: {
      const title = state.byId[state.allIds[state.step]].title
      return {
        ...state,
        shown: {
          ...state.shown,
          [title]: state.shown[title] + 24
        }
      }
    }
    default: return state
  }
}