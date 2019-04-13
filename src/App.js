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
      {activeStep.hasMore && (
        <div className='show-more'>
          <button onClick={activeStep.showMore}>Mehr</button>
        </div>
      )}
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

  > .show-more {
    display: flex;
    margin: 20px;
    align-items: center;
    justify-content: center;
    > button {
      background: #2a4c85;
      padding: 10px;
      text-align: center;
      width: 350px;
      color: white;
    }
  }
`

const Item = styled.div`
  margin: 10px;
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.active ? 'grey' : 'transparent'};
`