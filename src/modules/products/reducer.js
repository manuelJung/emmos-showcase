// @flow
import * as at from './const'
import type {Action} from './actions'
import type {Article, Number, ProductNumber, Identifier, FilterValues} from './entities'

export type State = {|
  +fetching: {+[number:Number]: boolean},
  +fetchErrors: {+[number:Number]: string },
  +articles: {+[productNumber:ProductNumber]: Article[] },
  +numberToProductNumber: {+[number:Number]: ProductNumber},
  +filters: {+[identifier:Identifier]: FilterValues},
  +identifiersToNumber: {+[identifier:Identifier]: Number}
|}

export const defaultState = {
  fetching: {},
  fetchErrors: {},
  articles: {},
  numberToProductNumber: {},
  filters: {},
  identifiersToNumber: {}
}

const defaultFilterValues:FilterValues = {
  color: null,
  style: null,
  size: null,
  variant: null
}

export default function reducer(state:State=defaultState, action:Action):State {
  switch(action.type){
    case at.CREATE_PRODUCT: {
      const {number, identifier, fetching, translateFilters} = action.meta
      let newState = {
        ...state,
        identifiersToNumber: {
          ...state.identifiersToNumber,
          [identifier]: number
        },
        filters: {
          ...state.filters,
          [identifier]: defaultFilterValues
        }
      }
      if(fetching){
        newState.fetching = {
          ...state.fetching,
          [number]: true
        }
      }
      if(translateFilters){
        // $FlowFixMe
        newState.filters[identifier] = getFiltersFromArticle(state, number)
      }
      return newState
    }

    case at.FETCH_FAILURE: {
      return {
        ...state, 
        fetching: {
          ...state.fetching,
          [action.meta.number]: false
        },
        fetchErrors: {
          ...state.fetchErrors,
          [action.meta.number]: action.payload
        }
      }
    }

    case at.FETCH_SUCCESS: {
      const productNumber = action.payload[0] ? action.payload[0].productNumber : 'not-found'
      const ordernumbers = action.payload.map(art => art.ordernumber)
      const {number, identifier, translateFilters} = action.meta
      const newState = {
        ...state, 
        fetching: {
          ...state.fetching,
          [action.meta.number]: false
        },
        numberToProductNumber: {
          ...state.numberToProductNumber,
          [number]: productNumber, // number can be not active and therefore does not exist in result
          ...[productNumber, ...ordernumbers].reduce((p,n) => Object.assign(p, {[n]:productNumber}), {})
        },
        articles: {
          ...state.articles,
          [productNumber]: action.payload
        }
      }
      if(translateFilters){
        newState.filters = {
          ...newState.filters,
          [identifier]: getFiltersFromArticle(newState, number)
        }
      }
      return newState
    }

    case at.SET_FILTER_VALUE: {
      const {filter} = action.meta
      const newState = {...state}

      if(action.payload && !action.payload.selectable){
        newState.filters = {
          ...newState.filters,
          [filter.identifier]: Object.keys(newState.filters[filter.identifier])
            .reduce((p,key) => Object.assign(p, {[key]:null}), {})
        }
      }
      
      newState.filters = {
        ...newState.filters,
        [filter.identifier]: {
          ...newState.filters[filter.identifier],
          [filter.key]: action.payload
        }
      }
      return newState
    }

    case at.SET_ACTIVE_ARTICLE: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.meta.identifier]: getFiltersFromArticle(state, action.payload)
        }
      }
    }

    default: return state
  }
}

// helpers
function getFiltersFromArticle (state:State, number:Number) {
  const pNumber = state.numberToProductNumber[number]
  if(!pNumber) return defaultFilterValues
  const article = state.articles[pNumber].find(art => art.ordernumber === number)
  if(!article) return defaultFilterValues
  else return Object.assign(defaultFilterValues, article.filterValues)
}