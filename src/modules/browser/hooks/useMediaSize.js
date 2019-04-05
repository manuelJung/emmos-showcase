// @flow
import type {State} from './reducer'
import useConnect from 'utils/useConnect'

export type Props = {||}

export type InjectedProps = State

const mapState = state => state.media

const mapDispatch = {}

const mergeProps = (sp,dp,props) => sp

const options = { areStatesEqual: (a,b) => a.media === b.media }

export default function useAttributes():InjectedProps{
  const hook = useConnect<Props, InjectedProps,*,*>({}, mapState, mapDispatch, mergeProps, options)
  return hook
}