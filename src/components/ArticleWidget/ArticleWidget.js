// @flow
import * as React from 'react'
import styled from 'styled-components'
import useDisplayArticle from 'modules/products/hooks/useDisplayArticle'
import resize from 'utils/resizeSwImage'
import ArticleConfig from './ArticleConfig'

type Props = {
  number: string
}

export default React.memo<Props>(function ArticleWidget({number}:Props){
  const [showConfig, setShowConfig] = React.useState(false)
  const $article = useDisplayArticle({number, identifier: number})
  const {isFetching, shouldCreate, fetchError, data} = $article
  
  if(isFetching || shouldCreate) return <div>loading...</div>
  if(fetchError) return <div>error</div> 
  if(!data) return <div>not found</div>

  return (
    <Wrapper className='ArticleWidget'>
      <h5>{data.title}</h5>
      <div className='image-wrapper'>
        <img src={resize(300,300,data.images[0])}/>
      </div>
      <button className='btn-config' onClick={() => setShowConfig(true)}>
        Konfigurieren
      </button>
      {showConfig && <ArticleConfig identifier={number} article={data} close={() => setShowConfig(false)}/>}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > h5 {
    font-size: 17px;
    margin: 0;
    overflow: hidden;
    height: 43px;
  }

  > .image-wrapper {
    width: 100%;
    padding: 0;
    margin: 0;
    > img {width: 100%;}
  }

  > .btn-config {
    background: #2a4c85;
    color: white;
    padding: 10px;
  }

`