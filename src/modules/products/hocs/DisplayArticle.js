// @flow
import * as React from 'react'
import {connect} from 'react-redux'

import type {RootState as State, Dispatch} from 'store/reducers' // eslint-disable-line no-unused-vars
import type {Identifier, Article, Number} from '../entities'
import {isFetching, getFetchError, shouldCreate, getDisplayArticle} from '../selectors'
import {createProduct as create, setActiveArticle} from '../actions'

type InjectedProps = {
  displayArticle: {
    data: Article | null,
    isFetching: boolean,
    fetchError: null | string,
    shouldCreate: boolean,
    setActiveArticle: (number:Number) => mixed,
    create: () => void // autocalled
  }
}


type OwnProps = {
  identifier: Identifier,
  number?: Number
}

export type PageProps = OwnProps & InjectedProps

const mapState = (state, props) => ({
  data: getDisplayArticle(state.products, props.identifier),
  isFetching: isFetching(state.products, props.identifier),
  fetchError: getFetchError(state.products, props.identifier),
  shouldCreate: shouldCreate(state.products, props.identifier, props.number)
})

const mapDispatch = { create, setActiveArticle }

const mergeProps = (sp, dp, props) => Object.assign({}, props, {
  displayArticle: Object.assign({}, sp, {
    create: () => {
      if(!props.number) return
      dp.create(props.number, props.identifier)
    },
    setActiveArticle: (number:Number) => dp.setActiveArticle(props.identifier, number)
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
  children?:(props:$PropertyType<InjectedProps,"displayArticle">)=>React.Node
}> {
  create = () => this.props.displayArticle.shouldCreate && this.props.displayArticle.create()
  componentDidMount = this.create
  componentDidUpdate = this.create
  render(){
    const {children, displayArticle} = this.props
    return children ? children(displayArticle) : null
  }
})