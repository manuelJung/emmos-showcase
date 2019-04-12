// @flow
import * as t from '../entities'
import * as s from '../selectors'
import * as a from '../actions'
import useConnect from 'utils/useConnect'

export type Props = {}

export type InjectedProps = {
  data: t.Step[],
  step: number,
  setStep: *
}

const mapState = (state, props) => ({
  data: s.getOrderedSteps(state.configurator),
  step: s.getStep(state.configurator)
})

const mapDispatch = {
  setStep: a.setStep
}

const mergeProps = (sp,dp,props) => Object.assign({}, sp, dp)

const options = { areStatesEqual: (a,b) => a.configurator === b.configurator }

export default function useStepper(props:Props):$Diff<InjectedProps,{}>{
  const hook = useConnect<Props, InjectedProps,*,*>(props, mapState, mapDispatch, mergeProps, options)
  return hook
}