// @flow
import React from 'react'
import styled from 'styled-components'
import ArticleList from './components/ArticleList'
import useStepper from 'modules/configurator/hooks/useStepper'
import useActiveStep from 'modules/configurator/hooks/useActiveStep'


export default function App () {
  const stepper = useStepper()
  const activeStep = useActiveStep()
  return (
    <Wrapper className="App">
      <nav className='navigation'>
        {stepper.data.map((step, i) => (
          <Item 
            key={step.title}
            active={i === stepper.step}
            children={step.title}
            onClick={() => stepper.setStep(i)}
          />
        ))}
      </nav>
      <ArticleList numbers={activeStep.data.articles}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > .navigation {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
`

const Item = styled.div`
  margin: 10px;
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.active ? 'grey' : 'transparent'};
`