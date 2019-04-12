// @flow
import {applyMiddleware, compose, createStore} from 'redux'
import makeRootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

import type {RootState, Action, Dispatch} from './reducers'

export type Store = {
  getState: () => RootState,
  dispatch: Dispatch,
  subscribe: (() => mixed) => () => mixed
}

export default (initialState:any = {}):Store => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  let middleware = [thunkMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  let __DEV__ = process.env.NODE_ENV === 'development'

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }


  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore<RootState, Action, Dispatch>(
    makeRootReducer(),
    initialState,
    // $FlowFixMe
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  const _module:any = module
  if (_module.hot) {
    _module.hot.accept('./reducers', () => {
      const rootReducer = require('./reducers').default
      store.replaceReducer(rootReducer())
    })
  }
  // $FlowFixMe
  return store
}
