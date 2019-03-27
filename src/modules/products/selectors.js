// @flow
import createReSelector from 're-reselect'

import calcFilterOptions from './utils/calcFilterOptions'

import type {State} from './reducer'
import type {Article, Filter, FilterKey, Identifier, Number, FilterOption, FilterValues} from './entities'


export const isFetching = (state:State, pId:Identifier):boolean => state.fetching[state.identifiersToNumber[pId]] || false
export const getFetchError = (state:State, pId:Identifier):string|null => state.fetchErrors[state.identifiersToNumber[pId]] || null
export const shouldFetch = (state:State,pId:Identifier):boolean => {
  const number = state.identifiersToNumber[pId]
  const productNumber = state.numberToProductNumber[number]
  return !state.articles[productNumber]
}
export const shouldCreate = (state:State,pId:Identifier, number?:Number) => {
  if(!number) return false
  return state.identifiersToNumber[pId] !== number
}

const defaultFilterValues = {color:null, style:null, variant:null, size:null}
export const getFilterValues = (state:State,pId:Identifier):FilterValues => state.filters[pId]
? state.filters[pId]
: defaultFilterValues

const defaultUnfilteredArticles = []
export const getUnfilteredArticles = (state:State,pId:Identifier):Article[] => {
  const number = state.identifiersToNumber[pId]
  const productNumber = state.numberToProductNumber[number]
  return state.articles[productNumber] || defaultUnfilteredArticles
}

export const getFilteredArticles:(state:State,pId:Identifier)=>Article[] = createReSelector(
  getFilterValues,
  getUnfilteredArticles,
  (filterValues, articles) => {
    const matchFilters = article => {
      const match = key => (
        !article.filterValues[key]
        || !filterValues[key]
        || article.filterValues[key].label === filterValues[key].label
      )
      return match('size') && match('variant') && match('color') && match('style')
    }
    return articles.filter(matchFilters)
  }
)((_,pId) => pId)

export const getDisplayArticle = (state:State,pId:Identifier):Article|null => getFilteredArticles(state,pId)[0] || null

export const getFilter:(state:State,pId:Identifier,filterKey:FilterKey) => Filter = createReSelector(
  getUnfilteredArticles,
  getFilterValues,
  (_,pId:Identifier) => pId,
  (_,__,filterKey:FilterKey) => filterKey,
  (articles, filterValues, identifier, key):Filter => {
    const options = calcFilterOptions(articles, key, filterValues)
    const type = calcFilterType(options)
    let value = filterValues ? filterValues[key] : null
    if(type === 'TEXT') value = options[0].value
    return { options, value, key, type, identifier }
  }
)((_,pId,filterKey) => `${pId}:${filterKey}`)

// UTILS

const calcFilterType = (options:FilterOption[]) => {
  if (!options.length) return 'EMPTY'
  if (options.length === 1) return 'TEXT'
  if (options[0].value && options[0].value.image) return 'IMAGE'
  return 'SELECT'
}