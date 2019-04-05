// @flow
import * as React from 'react'
import styled from 'styled-components'
import useFilter from 'modules/products/hooks/useFilter'
import resize from 'utils/resizeSwImage'
import DropdownFilter from './DropdownFilter'

type Props = {
  identifier: string
}

export default React.memo<Props>(function ColorFilter({identifier}:Props){
  const $filter = useFilter({identifier, filterKey: 'color'})
  const color = $filter.data.value ? $filter.data.value.label : 'bitte wählen'

  if($filter.data.type !== 'IMAGE'){
    return <DropdownFilter identifier={identifier} filterKey='color' label='Farbe'/>
  }

  return (
    <Wrapper className='ColorFilter'>
      <div className='label'>Farbe: {color}</div>
      <ul className='options'>
        {$filter.data.options.map(opt => (
          <Option 
            key={opt.value.label} 
            onClick={() => $filter.toggleValue(opt)}
            selected={opt.value.label === color}
            children={<img src={resize(40,40,opt.value.image)}/>}
          />
        ))}
      </ul>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  > label {
    margin-bottom: 5px;
  }

  > .options {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
`

const Option = styled.li`
  margin: 5px 5px 5px 0;
  padding: 2px;
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.selected ? '#2a4c85' : 'lightgrey'};
`