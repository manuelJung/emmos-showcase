// @flow
import themes from './themes.json'
import defaultConfig from './defaultConfig.json'
import type {Number,ProductNumber} from 'modules/products/entities'

// if (!window.__SW_PDP_REACT_PARAMS__) {
//   window.__SW_PDP_REACT_PARAMS__ = {
//     config: {},
//     translations: {}
//   }
// }

let url = window.location.origin
if(url.includes('localhost')){
  url = "https://www.vega-direct.com"
  // url = "https://www.jobeline.de"
  // url = "https://www.hotelwaesche.de"
}

const platform = (() => {
  if(url.includes('vega-direct')) return 'V'
  if(url.includes('jobeline')) return 'J'
  if(url.includes('hotelwaesche')) return 'H'
  return 'V'
})()

const country = (() => {
  return 'DE'
})()

if(!window.__SW_PDP_REACT_PARAMS__){
  window.__SW_PDP_REACT_PARAMS__ = defaultConfig[platform]
}

/**
 * translations
 */

 const translations = window.__SW_PDP_REACT_PARAMS__.translations


export const t = (key:string, dict:Object = {}) => {
  let result = translations[key]
  Object.keys(dict).forEach(
    key => (result = (result) ? result.replace(`[${key}]`, dict[key]) : '')
  )
  return result
}

/**
 * config
 */
const config = window.__SW_PDP_REACT_PARAMS__.config

export const getVariantsUrl = (productNumber:ProductNumber) => config.variants_endpoint + productNumber
export const getContainerUrl = (number:Number) => config.container_endpoint + number
export const cdn_domain = config.cdn_domain
// const usp = config.usp_list || '[]'
// export const usps = JSON.parse(usp.replace(/[']/g, '"'))
export const intl = {
  'locale': config.locale || 'de-DE',
  'currency_ISO': config.currency_ISO || 'EUR',
  'currency_symbol': config.currency_symbol || '&euro;',
  'currency_position': config.currency_position || '0'
}
// export const productNumber = config.productnumber
export const shopId = config.shop_id || '1'
// export const grossPriceVisible = config.gross_price_visible === '1'
// export const ecoTaxRate = config.eco_tax_rate || '0.00'
// export const ecoTaxVisible = (ecoTaxRate === '0.00') ? false : (config.eco_tax_visible === '1')
// export const whatsappVisible = config.whatsapp_visible === '1'
// export const showBundle = config.isBundle === '1'
// export const rating = {
//   authorShortname: (config.rating_author_short_name === '1') || false,
//   authorBlacklist: (config.rating_author_blacklist) ? config.rating_author_blacklist.split(',').map(item => item.trim()).filter(item => (item !== '')) : []
// }
// export const forward404 = () => {
//   if (process.env.NODE_ENV !== 'test') {
//     document.location.href = window.jsBaseURL + '404'
//   }
// }
// if (!productNumber || productNumber === '') forward404()

/**
 * theme
 */
export const shopname = () => {
  try {
    const classes = [...document.getElementsByTagName('body')[0].classList] || [],
      themeClass = classes.filter(cssclass => (cssclass.startsWith('is--theme-')))[0]

    return themeClass.replace('is--theme-', '')
  }
  catch (e) {
    return 'vega'
  }
}

export const theme = (shopname() in themes) ? themes[shopname()] : themes['vega']

export const getMandant = () => {
  return platform + country
}