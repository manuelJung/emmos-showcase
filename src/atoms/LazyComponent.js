// @flow
import React from 'react'
import type {Node} from 'react'
import Observer from '@researchgate/react-intersection-observer'
import styled from 'styled-components'

type Props = {|
  children: Node,
  prerenderHide?: boolean, // true when also prerenderer should not see this content
  offset?: number, // num pixels Child should be visible before Component comes into Viewport (from top and bottom)
  defaultHeight?: number, // height while Child is not visible
  onMount?: () => void,
  gridArea?: Object,
  className?: string,
  idleLoad?: boolean,
  placeholder?: Node
|}

type State = {
  visible: boolean
}

let idleList = []
let listRunning = false

function startIdleList(){
  listRunning = true
  const cb = idleList.shift()
  const run = window.requestIdleCallback || window.requestAnimationFrame
  run(() => {
    cb()
    if(idleList.length) startIdleList()
    else listRunning = false
  })
}

/**
 * Only renders children when they hit the viewport. Super usefull when rendering costly Nodes
 * like big images or hardware-intensive Components. Can be turned off while prerendering
 */
export default class LazyComponent extends React.Component<Props,State> {

  static defaultProps = {
    offset: 0,
    defaultHeight: 0
  }

  componentDidMount(){
    if(this.props.idleLoad) idleList.push(() => {
      this.setState && this.setState({visible:true})
    })
    if(!listRunning && idleList.length){
      startIdleList()
    }
  }

  state = { visible: false }

  handleChange = (e:any) => {
    if(e.isIntersecting){
      console.log('intersecting')
      this.setState({visible: true})
      if(this.props.onMount) this.props.onMount()
    }
  }

  render(){
    const {visible} = this.state
    const {children, defaultHeight, offset, gridArea, className, placeholder} = this.props

    if(visible) return children

    const mTop = offset + defaultHeight
    const mBottom = offset || 0
    
    return (
      <Observer 
        disabled={visible} 
        onChange={this.handleChange} 
        rootMargin={`${mTop}px 0px ${mBottom}px 0px`} 
        children={placeholder
          ? placeholder
          : <Placeholder className={className} defaultHeight={defaultHeight} gridArea={gridArea} />}
      />
    )
  }
}

const Placeholder = styled.div`
  height: ${props => props.defaultHeight}px;
  grid-area: ${props => props.gridArea};
`