// @flow
import * as a from '../actions'
import useConnect from 'utils/useConnect'
import type {Identifier} from 'modules/products/entities'

export type Props = {|
  activeProduct: boolean
|}

export type InjectedProps = {
  activeProduct: *,
  setActiveProduct: (identifier:Identifier) => mixed
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

const options = { areStatesEqual: (s1,s2, p1,p2) => {
  if(
    p1.activeProduct !== p2.activeProduct
  ) return false
  if(
    (p2.activeProduct && s1.ui.activeProduct !== s2.ui.activeProduct)
  ) return false
  return true
} }

export default function useAttributes(props:Props):InjectedProps{
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)
  return hook
}