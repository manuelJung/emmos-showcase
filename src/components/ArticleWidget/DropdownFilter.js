// @flow
import * as React from 'react'
import styled from 'styled-components'
import useFilter from 'modules/products/hooks/useFilter'
import type {FilterKey} from 'modules/products/entities'

type Props = {
  identifier: string,
  filterKey: FilterKey,
  label: string
}

export default React.memo<Props>(function DropdownFilter({identifier, filterKey, label}:Props){
  const $filter = useFilter({identifier, filterKey})
  const [open, setOpen] = React.useState(false)
  const selectedLabel = $filter.data.value ? $filter.data.value.label : 'Bitte wählen'

  if($filter.data.type === 'EMPTY') return null
  if($filter.data.type === 'TEXT') return (
    <Wrapper className='DropdownFilter'>
      <div className='label'>
        {label}: {selectedLabel}
      </div>
    </Wrapper>
  )

  return (
    <Wrapper className='DropdownFilter' open={open}>
      <div className='label' onClick={() => setOpen(!open)}>
        {label}: {selectedLabel}
        <div className='chevon'/>
      </div>
      {open && (
        <ul className='content'>
          {$filter.data.options.map(opt => (
            <Option
              key={opt.value.label}
              children={opt.value.label}
              selected={opt.value.label === selectedLabel}
              onClick={() => {
                $filter.setValue(opt)
                setOpen(false)
              }}
            />
          ))}
          <Option onClick={() => {$filter.clear(); setOpen(false)}}>
            {label}: Bitte wählen
          </Option>
        </ul>
      )}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;

  > .label {
    padding: 10px;
    border: 1px solid lightgrey;

    > .chevon {
      position: absolute;
      right: 0;
      top: 0;
      ${props => props.open 
        ? `transform: rotate(270deg); border-top: 1px solid lightgrey;`
        : `transform: rotate(90deg); border-bottom: 1px solid lightgrey;`}
      padding: 10px;
      &:after {
        content: '<'
      }
    }
  }

  > .content {
    position: absolute;
    background: white;
    left: 0;
    right: 0;
    bottom: 30px;
    padding: 0;
    list-style: none;
    border: 1px solid lightgrey;
    max-height: 400px;
    overflow: scroll;
  }
`

const Option = styled.li`
  padding: 10px 5px;

  ${props => props.selected && `
    background: #2a4c85;
    color: white;
  `}
`