// @flow
import * as React from 'react'
import styled from 'styled-components'
import resize from 'utils/resizeSwImage'
import type {Article} from 'modules/products/entities'
import posed from 'react-pose'
import ColorFilter from './ColorFilter'
import DropdownFilter from './DropdownFilter'

type Props = {
  identifier: string,
  article: Article,
  close: () => mixed
}

export default React.memo<Props>(function ArticleConfig ({identifier, article, close}:Props){
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => setVisible(true), [])

  return (
    <Wrapper className='ArticleConfig'>
      <h3>{article.title}</h3>
      <Box className='image-wrapper'>
        <img src={resize(200,200,article.images[0])}/>
      </Box>
      <div className='filter-list'>
        <ColorFilter as={Box} identifier={identifier}/>
        <DropdownFilter as={Box} identifier={identifier} filterKey='size' label='Größe' />
        <DropdownFilter as={Box} identifier={identifier} filterKey='variant' label='Variante' />
        <DropdownFilter as={Box} identifier={identifier} filterKey='style' label='Stil' />
      </div>
      <Box className='button-list'>
        <button className='abort' onClick={close}>Abbrechen</button>
        <button className='add' onClick={close}>Hinzufügen</button>
      </Box>
    </Wrapper>
  )
})

const Box = posed.div({
  enter: { x: 0, opacity: 1, transition: { type: 'spring', mass: .4 }},
  exit: {x: 300, opacity: 0}
})

const Wrapper = styled.div`
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