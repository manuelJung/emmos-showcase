// @flow
import * as React from 'react'
import styled from 'styled-components'
import resize from 'utils/resizeSwImage'
import useFilter from 'modules/products/hooks/useFilter'
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
  const $size = useFilter({identifier, filterKey: 'size'})
  const $color = useFilter({identifier, filterKey: 'color'})
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => setVisible(true), [])

  return (
    <Wrapper className='ArticleConfig'>
      <div className='overlay' onClick={close}/>
      <Content className='content' pose={visible ? 'visible' : 'hidden'}>
        <h3>{article.title}</h3>
        <div className='image-wrapper'>
          <img src={resize(200,200,article.images[0])}/>
        </div>
        <div className='filter-list'>
          <ColorFilter identifier={identifier}/>
          <DropdownFilter identifier={identifier} filterKey='size' label='Größe' />
          <DropdownFilter identifier={identifier} filterKey='variant' label='Variante' />
          <DropdownFilter identifier={identifier} filterKey='style' label='Stil' />
        </div>
        <div className='button-list'>
          <button className='abort' onClick={close}>Abbrechen</button>
          <button className='add' onClick={close}>Hinzufügen</button>
        </div>
      </Content>
    </Wrapper>
  )
})

const Content = posed.div({
  hidden: { marginBottom: '-100%' },
  visible: { marginBottom: '0%' }
});

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  > .overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
  }

  > .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 85%;
    background: white;
    padding: 10px;
    display: flex;
    flex-direction: column;

    > h3 {margin: 0;}

    > .image-wrapper {
      align-self: center;
      width: 200px;
      height: 200px;
    }

    > .filter-list {
      > * {margin-bottom: 10px;}
    }

    > .button-list {
      display: flex;
      > button {
        flex: 1;
        padding: 10px;
        margin: 5px;
        color: white;
      }
      > .abort {
        background: #cd483e;
      }
      > .add {
        background: #2a4c85;
      }
    }
  }
`