// @flow
import React from 'react'

import DisplayArticle from 'modules/products/hocs/DisplayArticle'
import Filter from 'modules/products/hocs/Filter'
import Attributes from 'modules/products/hocs/Attributes'

export default function () {
  return (
    <div>
      <DisplayArticle pure identifier='article' number='30000006' children={product => {
        if(product.shouldCreate || product.isFetching){
          return <div>loading...</div>
        }
        if(product.fetchError){
          return <div>error</div>
        }
        if(!product.data){
          return <div>product not found</div>
        }
        return <div>{product.data.productNumber}</div>
      }}/>
      <Filter identifier='article' filterKey='size' children={filter => {
        console.log('filter', filter)
        return null
      }}/>
      <Attributes identifier='article' displayPrice children={attributes => {
        console.log('attrs', attributes)
        return null
      }}/>
    </div>
  )
}