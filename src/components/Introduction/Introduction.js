// @flow
import * as React from 'react'
import posed, {PoseGroup} from 'react-pose'
import styled from 'styled-components'

type Props = {}

export default React.memo<Props>(function Introduction(props:Props){
  const [step, setStep] = React.useState(0)

  return (
    <PoseGroup animateOnMount preEnterPose='preenter'>
      {step === 0 && <Wrapper key='Introduction' className='Introduction'>
        <Title key='title'>Willkommen zum Konfigurator</Title>
        <Description key='description'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et 
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata 
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing 
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </Description>
        <div>
          <NextButton onClick={() => setStep(step+1)}>weiter</NextButton>
        </div>
      </Wrapper>}
      {step > 0 && null}
    </PoseGroup>
  )
})

const Wrapper = styled(posed.div({
  preenter: { y: 50 },
  enter: { y: 0, opacity: 1, staggerChildren: 100, transition: { type: 'spring', mass: .1 } },
  exit: { opacity: 0, delay: 100}
}))`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  background-image: linear-gradient(to bottom, white 0%, #2a4c85 250%);
  z-index: 9999999999999999;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const NextButton = styled(posed.button({
  preenter: { opacity: 0 },
  enter: { opacity: 1, x:0 },
  exit: { x: -400, opacity: 0}
}))`
  width: 100%;
  display: block;
  padding: 10px;
  margin-top: 5px;
  color: white;
  border: none;
  outline: none !important;
  background: #2a4c85;
`

const Title = posed.h3({
  preenter: { opacity: 0 },
  enter: { opacity: 1, x:0 },
  exit: { x: -400, opacity: 0}
})

const Description = posed.p({
  preenter: { opacity: 0 },
  enter: { opacity: 1, x:0 },
  exit: { x: -400, opacity: 0}
})