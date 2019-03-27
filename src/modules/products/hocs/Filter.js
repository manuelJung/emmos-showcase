// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State, Dispatch} from 'store/reducers' // eslint-disable-line no-unused-vars
import type {Identifier, Filter, FilterOption, FilterKey} from '../entities'
import {getFilter} from '../selectors'
import {setFilterValue} from '../actions'

type InjectedProps = {
  filter: {
    data: Filter,
    setValue: (opt:FilterOption) => mixed,
    toggleValue: (opt:FilterOption) => mixed,
    clear: () => mixed
  }
}


type OwnProps = {
  identifier: Identifier,
  filterKey: FilterKey
}

export type PageProps = OwnProps & InjectedProps

const mapState = (state, props) => ({
  data: getFilter(state.products, props.identifier, props.filterKey),
})

const mapDispatch = { setFilterValue }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  filter: Object.assign({}, sp, {
    setValue: (opt:FilterOption) => dp.setFilterValue(sp.data, opt),
    toggleValue: (opt:FilterOption) => sp.data.value && sp.data.value.label === opt.value.label
      ? dp.setFilterValue(sp.data, null)
      : dp.setFilterValue(sp.data, opt),
    clear: () => dp.setFilterValue(sp.data, null)
  })
})

const options = {
  areStatesEqual: (a,b) => a.products === b.products,
  areOwnPropsEqual: (a,b) => {
    if(!b.pure){ if(a.children !== b.children) return false }
    for(let key in b){
      if(key === 'children') continue
      if(b[key] !== a[key]) return false
    }
    return true
  }
}

export const hoc = /*:: <Config:InjectedProps>*/(Comp/*:: :React.AbstractComponent<Config> */) /*:: : React.AbstractComponent<$Diff<Config, $Shape<InjectedProps>>>*/ => // $FlowFixMe
connect/*:: <Config&InjectedProps, OwnProps, _, _, State, Dispatch>*/(mapState,mapDispatch,mergeProps,options)(Comp)

export default hoc(class DisplayArticleRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"filter">)=>React.Node
}> {
  render(){
    const {children, filter} = this.props
    return children ? children(filter) : null
  }
})