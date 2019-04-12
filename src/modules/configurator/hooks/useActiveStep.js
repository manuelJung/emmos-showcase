// @flow
import * as t from '../entities'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = {}

export type InjectedProps = {
  data: t.Step,
  addArticle: *,
  removeArticle: *
}

const mapState = (state, props) => ({
  data: s.getActiveStep(state.configurator)
})

const mapDispatch = {
  addArticle: a.addArticle,
  removeArticle: a.removeArticle
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, dp)

const options = { areStatesEqual: (a,b) => a.configurator === b.configurator }

export default function useActiveStep(props:Props):$Diff<InjectedProps,{}>{
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)
  return hook
}