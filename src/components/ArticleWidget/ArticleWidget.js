// @flow
import * as React from 'react'
import styled from 'styled-components'
import useDisplayArticle from 'modules/products/hooks/useDisplayArticle'
import resize from 'utils/resizeSwImage'
import useUI from 'modules/ui/hooks/useUI'

type Props = {
  number: string
}

export default React.memo<Props>(function ArticleWidget({number}:Props){
  const $ui = useUI({})
  const $article = useDisplayArticle({number, identifier: number})
  const {isFetching, shouldCreate, fetchError, data} = $article
  
  if(isFetching || shouldCreate) return (
    <Wrapper blur className='ArticleWidget'>
      <h5>lorem ipsum dolor sit amet</h5>
      <div className='image-wrapper'/>
      <button className='btn-config'>Konfigurieren</button>
    </Wrapper>
  )

  if(fetchError || !data) return null

  return (
    <Wrapper className='ArticleWidget'>
      <h5>{data.title}</h5>
      <div className='image-wrapper'>
        <img alt={data.title} src={resize(300,300,data.images[0])}/>
      </div>
      <button className='btn-config' onClick={() => $ui.setActiveProduct(number)}>
        Konfigurieren
      </button>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.blur && `
    filter: blur(4px);
  `}

  > h5 {
    font-size: 17px;
    margin: 0;
    overflow: hidden;
    height: 43px;
  }

  > .image-wrapper {
    width: 100%;
    position: relative
    padding-bottom: 100%;
    > img {
      position: absolute;
      width: 100%;
    }
  }

  > .btn-config {
    background: #2a4c85;
    color: white;
    padding: 10px;
    border: none;
    outline: none !important;
  }

`