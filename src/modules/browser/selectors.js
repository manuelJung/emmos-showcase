// @flow

import type {State} from './reducer'
import type {MediaSize} from './entities'

const dict = {
  MOBILE: 'extraSmall',
  TABLET: 'small',
  LAPTOP: 'medium',
  LAPTOP_L: 'large',
  LAPTOP_XL: 'extraLarge'
}

export const greaterThan = (state:State, mediaSize:MediaSize):boolean => state.greaterThan[dict[mediaSize]]

export const lessThan = (state:State, mediaSize:MediaSize):boolean => state.lessThan[dict[mediaSize]]

export const getBrowserSize = (state:State):State => state