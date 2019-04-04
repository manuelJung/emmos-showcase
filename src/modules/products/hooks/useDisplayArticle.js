// @flow
import * as React from 'react'
import * as t from '../entities'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = {|
  identifier: t.Identifier,
  number?: t.Number,
  preselect?:boolean, // true if number should be preselected
|}

export type InjectedProps = {
  data: t.Article | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldCreate: boolean,
  setActiveArticle: (number:t.Number) => mixed,
  create: () => void // autocalled
}

const mapState = (state, props) => ({
  data: s.getDisplayArticle(state.products, props.identifier),
  isFetching: s.isFetching(state.products, props.identifier),
  fetchError: s.getFetchError(state.products, props.identifier),
  shouldCreate: s.shouldCreate(state.products, props.identifier, props.number)
})

const mapDispatch = { 
  create: a.createProduct, 
  setActiveArticle: a.setActiveArticle
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, {
  create: () => {
    if(!props.number) return
    dp.create(props.number, props.identifier, !!props.preselect)
  },
  setActiveArticle: (number:t.Number) => dp.setActiveArticle(props.identifier, number)
})

const options = { areStatesEqual: (a,b) => a.products === b.products }

export default function useDisplayArticle(props:Props):InjectedProps{
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)

  React.useEffect(() => {
    hook.shouldCreate && hook.create()
  })

  return hook
}