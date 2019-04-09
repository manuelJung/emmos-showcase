// @flow
import {combineReducers} from 'redux'
import type {Dispatch as ReduxDispatch} from 'redux'

import productReducer from 'modules/products/reducer'
import type {Action as ProductAction} from 'modules/products/actions'

import uiReducer from 'modules/ui/reducer'
import type {Action as UIAction} from 'modules/ui/actions'


export type Action = ProductAction | UIAction

const reducers = {
  products: productReducer,
  ui: uiReducer
}

export type Reducers = typeof reducers
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type RootState = $ObjMap<Reducers, $ExtractFunctionReturn>
export type Dispatch = ReduxDispatch<Action>

export default () => combineReducers<Reducers,Action>(reducers)
