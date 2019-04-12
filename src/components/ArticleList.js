// @flow
import React from 'react'
import styled from 'styled-components'
import ArticleWidget, {Loading} from 'components/ArticleWidget'
// import Introduction from 'components/Introduction'
import ArticleDetail from 'components/ArticleDetail'
import Container from 'atoms/Container'
import LazyComponent from 'atoms/LazyComponent'

type Props = {
  numbers: string[]
}

export default function ArticleList (props:Props) {
  return (
    <Wrapper className='ArticleList'>
      {/* <Introduction /> */}
      <div className='left'>
        {props.numbers.map(n => (
          <LazyComponent placeholder={<div><Loading/></div>} key={n} defaultHeight={500} offset={300}>
            <ArticleWidget number={n}/>
          </LazyComponent>
        ))}
      </div>
      <div className='right'>
        <ArticleDetail />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  display: flex;

  > .left {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    > * {
      margin: 3px;
      flex-basis: 45%;
    }

    @media (min-width: 500px){
      > * {
        flex-basis: 32%;
      }
    }

    @media (min-width: 650px){
      > * {
        flex-basis: 23%;
      }
    }

    @media (min-width: 1000px){
      > * {
        flex-basis: 32%;
      }
    }
  }

  @media (min-width: 1000px){
    > .right {
      flex: 1;
    }
  }
  

`