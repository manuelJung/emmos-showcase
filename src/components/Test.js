// @flow
import React from 'react'
import styled from 'styled-components'
import ArticleWidget from 'components/ArticleWidget'
import Introduction from 'components/Introduction'
import ArticleDetail from 'components/ArticleDetail'


export default function () {
  return (
    <Wrapper>
      {/* <Introduction /> */}
      <ArticleDetail />
      <ArticleWidget number='10009000' />
      <ArticleWidget number='10089634' />
      <ArticleWidget number='30003909' />
      <ArticleWidget number='10089624' />
      <ArticleWidget number='30039895' />
      <ArticleWidget number='30025913' />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  > .ArticleWidget {
    margin: 3px;
    flex-basis: 45%;
  }

  @media (min-width: 600px){
    > .ArticleWidget {
      flex-basis: 30%;
    }
  }
`