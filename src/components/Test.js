// @flow
import React from 'react'

import DisplayArticle from 'modules/products/hocs/DisplayArticle'
import Filter from 'modules/products/hocs/Filter'

export default function () {
  return (
    <div>
      <DisplayArticle identifier='article' number='30000006' children={product => {
        console.log(product)
        return null
      }}/>
      <Filter identifier='article' filterKey='variant' children={filter => {
        console.log(filter)
        return null
      }}/>
    </div>
  )
}