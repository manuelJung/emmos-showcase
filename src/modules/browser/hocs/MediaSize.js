// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import type {RootState as State, Dispatch} from 'store/reducers' // eslint-disable-line no-unused-vars
import type {MediaSize} from '../entities'
import {greaterThan} from '../selectors'

type InjectedProps = {
  mediaSize: boolean
}

type OwnProps = { 
  minWidth?: MediaSize,
  maxWidth?: MediaSize 
}

export type MediaSizeProps = OwnProps & InjectedProps

const mapState = (state, props) => {
  const result = {}
  if(props.minWidth){
    result.match = greaterThan(state.browser, props.minWidth)
  }
  else if (props.maxWidth) {
    result.match = !greaterThan(state.browser, props.maxWidth)
  }
  else {
    result.match = true
  }
  return result
}

const mapDispatch = null

const mergeProps = (sp, dp, props) =>  Object.assign({}, props, {
  mediaSize: sp.match
})

const options = {
  areStatesEqual: (a,b) => a.browser === b.browser,
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

export default hoc(class MediaSizeRenderer extends React.Component<OwnProps&InjectedProps&{
  pure?:boolean,
  children?:(props:$PropertyType<InjectedProps,"mediaSize">)=>React.Node
}> {
  render(){
    const {children, mediaSize} = this.props
    return children ? children(mediaSize) : null
  }
})