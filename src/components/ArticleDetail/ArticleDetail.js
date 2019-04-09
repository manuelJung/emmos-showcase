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

  if(!$article.data) return null

  return (
    <Wrapper className='ArticleDetail'>
      <PoseGroup>
        {show && [
          <Overlay key='overlay' className='overlay' onClick={() => $ui.setActiveProduct()}/>,
          <Modal key='modal' className='modal'>
            <Detail className='ArticleConfig'>
              <h3>{$article.data.title}</h3>
              <Box className='image-wrapper'>
                <img src={resize(200,200,$article.data.images[0])}/>
              </Box>
              <div className='filter-list'>
                <ColorFilter as={Box} identifier={identifier}/>
                <DropdownFilter as={Box} identifier={identifier} filterKey='size' label='Größe' />
                <DropdownFilter as={Box} identifier={identifier} filterKey='variant' label='Variante' />
                <DropdownFilter as={Box} identifier={identifier} filterKey='style' label='Stil' />
              </div>
              <Box className='button-list'>
                <button className='abort' onClick={() => $ui.setActiveProduct()}>Abbrechen</button>
                <button className='add' onClick={() => $ui.setActiveProduct()}>Hinzufügen</button>
              </Box>
            </Detail>
          </Modal>
        ]}
      </PoseGroup>
    </Wrapper>
  )
})

const Modal = posed.div({
  enter: { y: 0, opacity: 1, staggerChildren: 50, transition: { type: 'spring', mass: .1 } },
  exit: { y: '100%', opacity: 0, delay: 300, staggerChildren: 50, staggerDirection: -1 }
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
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
    z-index: 9999999;
  }

  > .modal {
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