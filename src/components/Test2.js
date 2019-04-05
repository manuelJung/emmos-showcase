// @flow
import * as React from 'react'
import useDisplayArticle from 'modules/products/hooks/useDisplayArticle'
import useFilter from 'modules/products/hooks/useFilter'

type Props = {}

type FilterProps = {
  identifier: string,
  filterKey: string
}

export default React.memo<Props>(function Test2 (props:Props){
  const identifier = 'article'
  const number = '30000006'
  const $article = useDisplayArticle({identifier, number})
  const {isFetching, shouldCreate, fetchError, data} = $article
  
  if(isFetching || shouldCreate) return <div>loading...</div>
  if(fetchError) return <div>error</div> 
  if(!data) return <div>not found</div>

  return (
    <div>
      <h2>{data.title} <small>{data.ordernumber}</small></h2>
      <Filter identifier={identifier} filterKey='size'/>
    </div>
  )
})

const Filter = React.memo<FilterProps>(function Filter ({identifier, filterKey}:FilterProps) {
  const $filter = useFilter({identifier, filterKey})

  return (
    <ul>
      {$filter.data.options.map(opt => (
        <li key={opt.value.label} onClick={() =>$filter.setValue(opt)}>
          {opt.value.label}
        </li>
      ))}
    </ul>
  )
})