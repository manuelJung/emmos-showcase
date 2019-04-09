// @flow
import * as a from '../actions'
import useConnect from 'utils/useConnect'
import type {Identifier} from 'modules/products/entities'

export type Props = {|
  activeProduct?: boolean
|}

export type InjectedProps = {
  activeProduct: *,
  setActiveProduct: *
}

const mapState = (state, props) => {
  let result = {}
  if(props.activeProduct) result.activeProduct = state.ui.activeProduct
  return result
}

const mapDispatch = {
  setActiveProduct: a.setActiveProduct
}

const mergeProps = (sp,dp,props) => Object.assign({},sp,dp)

const options = { areStatesEqual: (s1,s2) => s1.ui === s2.ui }

export default function useAttributes(props:Props):InjectedProps{
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)
  return hook
}