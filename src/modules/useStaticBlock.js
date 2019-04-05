import * as React from 'react'
import useConnect from 'utils/useConnect'
import * as t from '../entities'
import * as s from '../selectors'
import * as a from '../actions'

export type InjectedProps = {
  data: t.StaticBlock | null,
  isFetching: boolean,
  fetchError: null | string,
  shouldFetch: boolean,
  fetch: () => void
}

export type Props = {
  identifier: t.Identifier
}

const mapState = (state, props) => s.getStaticBlockRequest(state.staticBlocks, props.identifier)

const mapDispatch = {
  fetch: a.fetchRequest
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, {
  fetch: () => {dp.fetch(props.identifier)}
})

const options = { areStatesEqual: (a,b, p1, p2) => {
  if(a.staticBlocks === b.staticBlocks) return true
  if(a.staticBlocks[p1.identifier] === b.staticBlocks[p2.identifier]) return true
  return false
} }

export default function useStaticBlock(identifier:t.Identifier):InjectedProps{
  const props:Props = {identifier}
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)

  React.useEffect(() => {
    hook.shouldFetch && hook.fetch()
  }, [identifier])

  return (hook:any)
}