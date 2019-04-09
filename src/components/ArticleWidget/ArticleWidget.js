// @flow
import * as React from 'react'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
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
        <img src={resize(300,300,data.images[0])}/>
      </div>
      <button className='btn-config' onClick={() => setShowConfig(true)}>
        Konfigurieren
      </button>
      <PoseGroup>
        {showConfig && [
          <Overlay key='overlay' className='overlay' onClick={() => setShowConfig(false)}/>,
          <Content key='content' className='content'>
            <ArticleConfig identifier={number} article={data} close={() => setShowConfig(false)}/>
          </Content>
        ]}
      </PoseGroup>
    </Wrapper>
  )
})

const Content = posed.div({
  enter: { y: 0, opacity: 1, staggerChildren: 50, transition: { type: 'spring', mass: .1 } },
  exit: { y: '100%', opacity: 0, delay: 300, staggerChildren: 50, staggerDirection: -1 }
});

const Overlay = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0, delay: 300 }
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

  > .overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
    z-index: 9999999;
  }

  > .content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 85%;
    z-index: 9999999;
    background: white;
    overflow-y: scroll;
  }

`