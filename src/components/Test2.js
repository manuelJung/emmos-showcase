// @flow
import * as React from 'react'
import useDisplayArticle from 'modules/products/hooks/useDisplayArticle'

type Props = {}

export default React.memo<Props>(function Test2 (props:Props){
  const identifier = 'article'
  const number = '30000006'
  const $article = useDisplayArticle({identifier, number})
  const {isFetching, shouldCreate, fetchError, data} = $article
  
  if(isFetching || shouldCreate) return <div>loading...</div>
  if(fetchError) return <div>error</div> 
  if(!data) return <div>not found</div>

  return <div>{data.ordernumber}</div>
})