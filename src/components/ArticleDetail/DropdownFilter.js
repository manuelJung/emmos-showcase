// @flow
import * as React from 'react'
import styled from 'styled-components'
import useFilter from 'modules/products/hooks/useFilter'
import type {FilterKey} from 'modules/products/entities'
import posed, { PoseGroup } from 'react-pose'

type Props = {
  identifier: string,
  filterKey: FilterKey,
  label: string,
  as?: React.Node
}

export default React.memo<Props>(function DropdownFilter({identifier, filterKey, label, as}:Props){
  const $filter = useFilter({identifier, filterKey})
  const ref = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const selectedLabel = $filter.data.value ? $filter.data.value.label : 'Bitte wählen'

  if($filter.data.type === 'EMPTY') return null
  if($filter.data.type === 'TEXT') return (
    <Wrapper as={as} className='DropdownFilter'>
      <div className='label'>
        {label}: {selectedLabel}
      </div>
    </Wrapper>
  )

  React.useEffect(() => {
    const listener = window.addEventListener('click', (e) => {
      e.path.find(el => el === ref.current) || setOpen(false)
    }, true)
    return () => window.removeEventListener('click', listener)
  }, [])

  return (
    <Wrapper as={as} ref={ref} className='DropdownFilter' open={open}>
      <div className='label' onClick={() => setOpen(!open)}>
        {label}: {selectedLabel}
        <div className='chevon'/>
      </div>
        <PoseGroup animateOnMount preEnterPose='preenter'>
        {open && (
          <List key={'dropdown-filter'} className='content'>
            <Option onClick={$filter.clear}>
              {label}: Bitte wählen
            </Option>
            {$filter.data.options.map(opt => (
              <Option
                key={opt.value.label}
                children={opt.value.label}
                selected={opt.value.label === selectedLabel}
                onClick={() => $filter.setValue(opt)}
              />
            ))}
          </List>
        )}
        </PoseGroup>
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
        ? `transform: rotate(90deg); border-bottom: 1px solid lightgrey;`
        : `transform: rotate(270deg); border-top: 1px solid lightgrey;`}
      padding: 10px;
      &:after {
        content: '<'
      }
    }
  }
`

const List = styled(posed.ul({
  preenter: { opacity: 0, maxHeight: 0 },
  enter: { opacity: 1, maxHeight: 300, staggerChildren: 50 },
  exit: { opacity: 0 }
}))`
  position: absolute;
  background: white;
  left: 0;
  right: 0;
  top: 100%;
  padding: 0;
  list-style: none;
  border: 1px solid lightgrey;
  max-height: 300px;
  overflow: scroll;
`

const Option = styled(posed.li({
  preenter: {opacity: 0},
  enter: { opacity: 1 }
}))`
  padding: 10px 5px;

  ${props => props.selected && `
    background: #2a4c85;
    color: white;
  `}
`