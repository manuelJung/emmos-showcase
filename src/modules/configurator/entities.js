// @flow
import * as productTypes from 'modules/products/entities'

export type Identifier = productTypes.Identifier

export type Step = {
  title: string,
  description: string,
  articles: productTypes.Number[]
}