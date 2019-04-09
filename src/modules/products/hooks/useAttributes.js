// @flow
import * as t from '../entities'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = {|
  identifier: t.Identifier,
  displayPrice?: boolean,
  attr1?:boolean,
  attr2?:boolean
|}

export type InjectedProps = {
  displayPrice: number,
  attr1:mixed,
  attr2:mixed
}

const mapState = (state, props) => {
  let result = {}
  if(props.displayPrice) result.displayPrice = s.getDisplayPrice(state.products, props.identifier)
  return result
}

const mapDispatch = {}

const mergeProps = (sp,dp,props) => sp

const options = { areStatesEqual: (a,b) => a.products === b.products }

export default function useAttributes(props:Props):InjectedProps{
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)
  return hook
}