// @flow
import {combineReducers} from 'redux'
import type {Dispatch as ReduxDispatch} from 'redux'

import productReducer from 'modules/products/reducer'
import type {Action as ProductAction} from 'modules/products/actions'


export type Action = ProductAction

const reducers = {
  products: productReducer
}

export type Reducers = typeof reducers
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type RootState = $ObjMap<Reducers, $ExtractFunctionReturn>
export type Dispatch = ReduxDispatch<Action>

export default () => combineReducers<Reducers,Action>(reducers)
