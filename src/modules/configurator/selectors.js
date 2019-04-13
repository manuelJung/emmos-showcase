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

export const getShown = (state:State):number => state.shown[state.allIds[state.step]]

export const hasMore = (state:State):boolean => {
  const shown = getShown(state)
  const step = getActiveStep(state)
  return step.articles.length > shown
}

export const getStep = (state:State):number => state.step

export const getFilteredActiveStep:(state:State) => t.Step = createSelector(
  getActiveStep,
  getShown,
  (step, nShown) => ({
    ...step,
    articles: step.articles.slice(0, nShown)
  })
)