// @flow
import * as at from './const'
import type {Identifier} from 'modules/products/entities'

export type SetActiveProduct = {
  type: typeof at.SET_ACTIVE_PRODUCT,
  payload: Identifier | null
}

export type Action = SetActiveProduct

export const setActiveProduct = (identifier?:Identifier|null):SetActiveProduct => ({
  type: at.SET_ACTIVE_PRODUCT,
  payload: identifier || null
})