// @flow
import styled from 'styled-components'

export default styled.div`
  padding: 10px;

  @media (min-width: 800px){
    padding: 10px 0;
    width: 750px;
    margin: 0 auto;
  }

  @media (min-width: 1000px){
    padding: 0;
    width: 950px;
  }

  @media (min-width: 1250px){
    padding: 0;
    width: 1200px;
  }
`