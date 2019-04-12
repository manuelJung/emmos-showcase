// @flow
import * as at from './const'
import * as t from './entities'

export type SetStep = {
  type: typeof at.SET_STEP,
  payload: number
}

export type AddArticle = {
  type: typeof at.ADD_ARTICLE,
  payload: t.Identifier
}

export type RemoveArticle = {
  type: typeof at.REMOVE_ARTICLE,
  payload: t.Identifier
}

export type Action = SetStep | AddArticle | RemoveArticle

export const setStep = (step:number):SetStep => ({
  type: at.SET_STEP,
  payload: step
})

export const addArticle = (identifier:t.Identifier):AddArticle => ({
  type: at.ADD_ARTICLE,
  payload: identifier
})

export const removeArticle = (identifier:t.Identifier):RemoveArticle => ({
  type: at.REMOVE_ARTICLE,
  payload: identifier
})
