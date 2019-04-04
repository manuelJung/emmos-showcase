// @flow
import * as t from '../entities'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = {|
  identifier: t.Identifier,
  filterKey: t.FilterKey
|}

export type InjectedProps = {
  data: t.Filter,
  setValue: (opt:t.FilterOption) => mixed,
  toggleValue: (opt:t.FilterOption) => mixed,
  clear: () => mixed
}

const mapState = (state, props) => ({
  data: s.getFilter(state.products, props.identifier, props.filterKey),
})

const mapDispatch = { 
  setFilterValue: a.setFilterValue, 
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, {
  setValue: (opt:t.FilterOption) => dp.setFilterValue(sp.data, opt),
  toggleValue: (opt:t.FilterOption) => sp.data.value && sp.data.value.label === opt.value.label
    ? dp.setFilterValue(sp.data, null)
    : dp.setFilterValue(sp.data, opt),
  clear: () => dp.setFilterValue(sp.data, null)
})

const options = { areStatesEqual: (a,b) => a.products === b.products }

export default function useFilter(props:Props):InjectedProps{
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)
  return hook
}