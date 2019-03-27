// @flow
import * as at from './const'
import {shouldFetch} from './selectors'
import type {RootState} from '../../store/rootReducer'
import * as api from './utils/api'

import type {Article, FilterKey, Filter, FilterOption, Identifier, Number} from './entities'

export type FetchProductRequestAction = {
  type: typeof at.FETCH_REQUEST,
  meta: { number: Number, identifier: Identifier}
}

export type FetchProductSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: { number: Number, identifier: Identifier},
  payload: Article[]
}

export type FetchProductFailureAction = {
  type: typeof at.FETCH_FAILURE,
  meta: { number: Number, identifier: Identifier},
  payload: string
}

export type SetFilterValueAction = {
  type: typeof at.SET_FILTER_VALUE,
  meta: {filter:Filter, filterKey:FilterKey},
  payload: FilterOption | null
}

export type CreateProductAction = {
  type: typeof at.CREATE_PRODUCT,
  meta: {number:Number, override:boolean, createFilters:boolean},
  payload: string
}

export type Action = 
  FetchProductRequestAction
  | FetchProductSuccessAction
  | FetchProductFailureAction
  | SetFilterValueAction
  | CreateProductAction


export const setFilterValue = (filter:Filter, filterKey:FilterKey, filterOption:FilterOption|null):SetFilterValueAction => ({
  type: at.SET_FILTER_VALUE,
  meta: {filter, filterKey},
  payload: filterOption
})

const fetchProduct = (number:Number, identifier:Identifier) => dispatch => {
  const meta = {number, identifier}
  dispatch(({ 
    type: at.FETCH_REQUEST, 
    meta 
  }:FetchProductRequestAction))
  
  return api.fetchProduct(number).then(
    payload => dispatch(({ type: at.FETCH_SUCCESS, meta, payload }:FetchProductSuccessAction)),
    error => dispatch(({ type: at.FETCH_FAILURE, meta, payload: error.toString() }:FetchProductFailureAction))
  )
}

export const createProduct = (number:Number, identifier:Identifier, override:boolean=true) => 
  (dispatch:Function, getState:Function) => {
    const state:RootState = getState()
    const articlesExist = shouldFetch(state.products, identifier)

    dispatch(({
      type: at.CREATE_PRODUCT,
      meta: {number, override, createFilters: articlesExist},
      payload: identifier
    }:CreateProductAction))

    if(!articlesExist){
      dispatch(fetchProduct(number, identifier))
    }
  }