// @flow
import type {Article, FilterKey, FilterValues, FilterOption} from '../entities'

export default function calcFilterOptions (articles:Article[], filterKey:FilterKey, filterValues:FilterValues):FilterOption[] {
  if(!filterValues) return []
  const isSelectable = (key, sFilterValues) => {
    // should always be selectable if filterType is current key
    // to allow cross sibling selection
    return filterKey === key
    // should be selectable if filter is not set in state
    || !filterValues[key]
    // should be selectable if artice does not have this filter
    || !sFilterValues[key] || !sFilterValues[key].label
    // should be selectable if all other types of article match set filters in state
    || sFilterValues[key].label === filterValues[key].label
  }

  const result = articles
    // .filter(simple => simple.filterValues[filterKey].label)
    .map(({filterValues}) => ({
      selectable: !Object.keys(filterValues).find(filterKey => !isSelectable(filterKey, filterValues)),
      sale: false,
      value: filterValues[filterKey]
    }))
    .reduce((result, next) => {
      if(!next.value) return result
      const {label} = next.value

      // create new row if no row exist
      if (!result[label]) {
        result[label] = {
          selectable: next.selectable,
          value: next.value,
          sale: false,
          hits: 0
        }
      }

      // calculate selectable flag
      if (next.selectable && !result[label].selectable) {
        result[label].selectable = true
      }

      // calculate sale flag
      if (next.sale && next.selectable && !result[label].sale) {
        result[label].sale = true
      }

      // update hits
      if (next.selectable) {
        result[label].hits++
      }

      return result
    }, {})

  return Object.keys(result).map(key => result[key])
}