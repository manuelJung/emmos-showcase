// @flow
import React from 'react'
import styled from 'styled-components'
import ArticleWidget from 'components/ArticleWidget'
// import Introduction from 'components/Introduction'
import ArticleDetail from 'components/ArticleDetail'
import Container from 'atoms/Container'


export default function () {
  return (
    <Container>
    <Wrapper>
      {/* <Introduction /> */}
      <div className='left'>
        <ArticleWidget number='10009000' />
        <ArticleWidget number='10089634' />
        <ArticleWidget number='30003909' />
        <ArticleWidget number='10089624' />
        <ArticleWidget number='30039895' />
        <ArticleWidget number='30025913' />
      </div>
      <div className='right'>
        <ArticleDetail />
      </div>
    </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div`
  display: flex;

  > .left {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    > .ArticleWidget {
      margin: 3px;
      flex-basis: 45%;
    }

    @media (min-width: 500px){
      > .ArticleWidget {
        flex-basis: 32%;
      }
    }

    @media (min-width: 650px){
      > .ArticleWidget {
        flex-basis: 23%;
      }
    }

    @media (min-width: 1000px){
      > .ArticleWidget {
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