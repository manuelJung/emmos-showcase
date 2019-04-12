// @flow
import * as React from 'react'
import styled from 'styled-components'
import useDisplayArticle from 'modules/products/hooks/useDisplayArticle'
import useUI from 'modules/ui/hooks/useUI'
import posed, { PoseGroup } from 'react-pose'
import ColorFilter from './ColorFilter'
import DropdownFilter from './DropdownFilter'
import resize from 'utils/resizeSwImage'

type Props = {}

export default React.memo<Props>(function ArticleDetail(){
  const $ui = useUI({activeProduct:true})
  const identifier = $ui.activeProduct || ''
  const $article = useDisplayArticle({ identifier })
  const show = Boolean($ui.activeProduct)

  return (
    <Wrapper className='ArticleDetail'>
      <PoseGroup>
        {show && $article.data && [
          <Overlay key='overlay' className='overlay' onClick={() => $ui.setActiveProduct()}>
          <Modal key='modal' className='modal' onClick={e => e.stopPropagation()}>
            <Detail className='ArticleConfig'>
              <h3>{$article.data.title}</h3>
              <Box className='image-wrapper'>
                <img alt={$article.data.title} src={resize(200,200,$article.data.images[0])}/>
              </Box>
              <div className='filter-list'>
                <ColorFilter key={identifier+'color'} as={Box} identifier={identifier}/>
                <DropdownFilter key={identifier+'size'} as={Box} identifier={identifier} filterKey='size' label='Größe' />
                <DropdownFilter key={identifier+'variant'} as={Box} identifier={identifier} filterKey='variant' label='Variante' />
                <DropdownFilter key={identifier+'style'} as={Box} identifier={identifier} filterKey='style' label='Stil' />
              </div>
              <Box className='button-list'>
                <button className='abort' onClick={() => $ui.setActiveProduct()}>Abbrechen</button>
                <button className='add' onClick={() => $ui.setActiveProduct()}>Hinzufügen</button>
              </Box>
            </Detail>
          </Modal>
          </Overlay>
        ]}
      </PoseGroup>
    </Wrapper>
  )
})

const Modal = posed.div({
  enter: { y: 0, opacity: 1, staggerChildren: 50, transition: { type: 'spring', mass: .1 } },
  exit: { y: 500, opacity: 0, delay: 250, staggerChildren: 50, staggerDirection: -1 }
});

const Overlay = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0, delay: 300 }
})

const Box = posed.div({
  enter: { x: 0, opacity: 1, transition: { type: 'spring', mass: .1 }},
  exit: {x: 300, opacity: 0}
})

const Wrapper = styled.div`
  > .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
    z-index: 9999999;
    
    > .modal {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 85%;
      background: white;
      overflow-y: scroll;
    }
  }

  @media (min-width: 1000px){
    > .overlay { 
      position: relative;
      background: none;
      > .modal {
        height: 100%;
        position: relative;
        overflow-y: unset;
      }
    }
  }
`

const Detail = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    > .image-wrapper, .filter-list {
      flex-basis: 45%;
    }
    > h3, .button-list {
      flex-basis: 100%;
    }
  }

  > h3 {margin-top: 0;}

  > .image-wrapper {
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }

  > .filter-list {
    > * {margin-bottom: 10px;}
  }

  > .button-list {
    display: flex;
    height: 45px;
    > button {
      flex: 1;
      padding: 10px;
      margin: 5px;
      color: white;
      border: none;
      outline: none !important;
    }
    > .abort {
      background: #cd483e;
    }
    > .add {
      background: #2a4c85;
    }
  }
`