// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State, Dispatch} from 'store/reducers' // eslint-disable-line no-unused-vars
import type {Identifier} from '../entities'
import {getDisplayPrice} from '../selectors'

type InjectedProps = {
  attributes: {
    displayPrice: number,
    attr1:mixed,
    attr2:mixed
  }
}


type OwnProps = {
  identifier: Identifier,
  displayPrice?: boolean,
  attr1?:boolean,
  attr2?:boolean
}

export type PageProps = OwnProps & InjectedProps

const mapState = (state, props) => {
  let result = {}
  if(props.displayPrice) result.displayPrice = getDisplayPrice(state.products, props.identifier)
  return result
}

const mapDispatch = {}

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  attributes: sp
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

export default hoc(class AttributesRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"attributes">)=>React.Node
}> {
  render(){
    const {children, attributes} = this.props
    return children ? children(attributes) : null
  }
})