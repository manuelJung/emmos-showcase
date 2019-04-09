// @flow
import * as at from './const'
import type {Identifier} from 'modules/products/entities'
import type {Action} from './actions'

export type State = {|
  activeProduct: Identifier | null
|}

export const defaultState = {
  activeProduct: null
}


export default function reducer (state:State=defaultState, action:Action) {
  switch(action.type){
    case at.SET_ACTIVE_PRODUCT: return { ...state, activeProduct: action.payload || null }
    default: return state
  }
}