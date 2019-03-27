// @flow
import React from 'react'

import DisplayArticle from 'modules/products/hocs/DisplayArticle'
import Filter from 'modules/products/hocs/Filter'
import Attributes from 'modules/products/hocs/Attributes'

export default function () {
  return (
    <div>
      <DisplayArticle identifier='article' number='30000006' children={product => {
        console.log('product', product)
        return null
      }}/>
      <Filter identifier='article' filterKey='variant' children={filter => {
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