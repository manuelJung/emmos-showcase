// @flow
import * as t from './entities'
import type {State} from './reducer'
import {createSelector} from 'reselect'

export const getActiveStep = (state:State):t.Step => state.byId[state.allIds[state.step]]

export const getOrderedSteps: (state:State) => t.Step[] = createSelector(
  state => state.byId,
  state => state.allIds,
  (byId, allIds) => allIds.map(id => byId[id])
)

export const getStep = (state:State):number => state.step