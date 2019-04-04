// @flow
import * as React from 'react'
import {bindActionCreators} from 'redux'
import type {RootState as State, Dispatch, Action} from 'store/reducers'
import type {Store} from 'store/createStore'
import {store} from 'store/bootstrap'


const StoreContext = React.createContext<Store>(store)

function usePrevValue<V:mixed>(val:V):V{
  const ref = React.useRef()
  React.useEffect(() => {ref.current = val})
  return ref.current || val
}

function shallowEqual(a:Object, b:Object):boolean{
  for(let key in b) if(b[key] !== a[key]) return false
  return true
}

export default function useConnect<OP:Object, Result:Object, SP:Object, DP:Object>(
  props:OP, 
  mapState:(state:State,props:OP) => SP, 
  mapDispatch:DP, 
  mergeProps:(sp:SP,dp:DP,op:OP) => Result, 
  options:{
    areStatesEqual:(prev:State,next:State, prevProps:OP, nextProps:OP) => boolean,
    areOwnPropsEqual?:(prev:OP,next:OP) => boolean,
    areStatePropsEqual?:(prev:SP,next:SP) => boolean
  }
){
  const areOwnPropsEqual = options.areOwnPropsEqual || shallowEqual
  const areStatePropsEqual = options.areStatePropsEqual || shallowEqual
  const [,update] = React.useState(0)
  const result = React.useRef<Result>()
  const store = React.useContext(StoreContext)
  const state = store.getState()
  const prevState = usePrevValue(store.getState())
  const prevProps = usePrevValue(props)
  const propsAreEqual = areOwnPropsEqual(prevProps, props)
  const dp = React.useMemo(() => bindActionCreators<Action,*,Dispatch>(mapDispatch, store.dispatch), []) 
  const sp = React.useRef<SP>()
  const memoProps = React.useRef<OP>()
  memoProps.current = props


  const memoMapState = React.useMemo(() => {
    let prevProps = {}
    let prevState
    let prevResult
    return (state, props) => {
      if(state !== prevState || !shallowEqual(prevProps, props)){
        prevState = state
        prevProps = props
        prevResult = mapState(state, props)
      }
      return prevResult
    }
  }, [])

  React.useLayoutEffect(() => store.subscribe(() => {
    const next = store.getState()
    if(!options.areStatesEqual(state, next, prevProps, props)){
      const nextSp = memoMapState(next, memoProps.current || props)
      if(!sp.current || !areStatePropsEqual(sp.current, nextSp)){
        update(next)
      }
    }
  }), [])

  if(result.current && propsAreEqual && prevState === state){
    return result.current
  }
  sp.current = memoMapState(state, props)
  result.current = mergeProps(sp.current,dp,props)
  return result.current
}



export function Provider (props:{store:Store, children: React.Node}){
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  )
}
