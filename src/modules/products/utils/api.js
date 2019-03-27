// @flow
import preprocessSwArticleResponse from './preprocessSwArticleResponse'
import { getVariantsUrl, getContainerUrl } from 'utils/config'
import type {Number} from '../entities'

export async function fetchProduct(number:Number){
  const productNumber = await fetch(getContainerUrl(number)).then(res => res.json())
  const rawData = await fetch(getVariantsUrl(productNumber)).then(res => res.json())
  return preprocessSwArticleResponse(rawData)
}