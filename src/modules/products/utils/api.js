// @flow
import preprocessSwArticleResponse from './preprocessSwArticleResponse'
import { getVariantsUrl, getContainerUrl } from 'utils/config'
import type {Number} from '../entities'

export function fetchProduct(number:Number){
  return fetch(getContainerUrl(number))
    .then(res => res.json())
    .then(productNumber => fetch(getVariantsUrl(productNumber)))
    .then(res => res.json())
    .then(preprocessSwArticleResponse)
}