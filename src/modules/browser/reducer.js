// @flow
import {createResponsiveStateReducer} from 'redux-responsive'
import {ms} from './const'

export type State = {
  _responsiveState: boolean,
  lessThan: {
    extraSmall: boolean,
    small: boolean,
    medium: boolean,
    large: boolean,
    extraLarge: boolean,
    infinity: boolean
  },
  greaterThan: {
    extraSmall: boolean,
    small: boolean,
    medium: boolean,
    large: boolean,
    extraLarge: boolean,
    infinity: boolean
  },
  is: {
    extraSmall: boolean,
    small: boolean,
    medium: boolean,
    large: boolean,
    extraLarge: boolean,
    infinity: boolean
  },
  mediaType: 'extraLarge' | 'large' | 'medium' | 'small' | 'extraSmall',
  orientation: 'landscape' | 'portrait'
}

const reducer:(state:State)=>State = createResponsiveStateReducer({
  extraSmall: ms.MOBILE-1,
  small: ms.TABLET-1,
  medium: ms.LAPTOP-1,
  large: ms.LAPTOP_L-1,
  extraLarge: ms.LAPTOP_XL-1
})

export default reducer