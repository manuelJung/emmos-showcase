// @flow
import * as at from './const'
import {shouldFetch, shouldCreate} from './selectors'
import type {RootState} from 'store/reducers'
import * as api from './utils/api'

import type {Article, FilterKey, Filter, FilterOption, Identifier, Number} from './entities'

export type FetchProductSuccessAction = {
  type: typeof at.FETCH_SUCCESS,
  meta: { number: Number, identifier: Identifier, translateFilters: boolean },
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
  meta: { number:Number, identifier:Identifier, fetching:boolean, translateFilters: boolean },
  payload: string
}

export type Action = 
  FetchProductSuccessAction
  | FetchProductFailureAction
  | SetFilterValueAction
  | CreateProductAction


export const setFilterValue = (filter:Filter, filterKey:FilterKey, filterOption:FilterOption|null):SetFilterValueAction => ({
  type: at.SET_FILTER_VALUE,
  meta: {filter, filterKey},
  payload: filterOption
})

const fetchSuccess = (number:Number, identifier:Identifier, result:Article[], translateFilters:boolean):FetchProductSuccessAction => ({
  type: at.FETCH_SUCCESS,
  meta: { number, identifier, translateFilters },
  payload: result
})

const fetchFailure = (number:Number, identifier:Identifier, error:string):FetchProductFailureAction => ({
  type: at.FETCH_FAILURE,
  meta: { number, identifier },
  payload: error
})

export const createProduct = (number:Number, identifier:Identifier, translateFilters?:boolean) => 
  (dispatch:Function, getState:Function) => {
    const state:RootState = getState()
    if(!shouldCreate(state.products, identifier, number)) return Promise.resolve()
    
    const fetching = shouldFetch(state.products, identifier)

    dispatch(({
      type: at.CREATE_PRODUCT,
      meta: { number, identifier, fetching, translateFilters: !fetching && !!translateFilters },
      payload: identifier
    }:CreateProductAction))

    if(fetching){
      return api.fetchProduct(number).then(
        payload => dispatch(fetchSuccess(number, identifier, payload, !!translateFilters)),
        error => dispatch(fetchFailure(number, identifier, error.toString()))
      )
    }
    else return Promise.resolve()
  }