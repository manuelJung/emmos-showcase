// @flow
import { shopId, shopname } from 'utils/config'
import trimText from 'utils/trimText'

const imagePlaceholder = () => {
  const lowerShopname = shopname(),
    upperShopname = lowerShopname.charAt(0).toUpperCase() + lowerShopname.slice(1),
    host = (window.location.hostname === 'localhost')? 'localhost:3000' : window.location.hostname,
    url = window.location.protocol + '//' + host + '/themes/Frontend/' + upperShopname + '/frontend/_public/src/img/no-picture.jpg'
  return url
}

const getImageUrls = article =>
  (article.attributes.core.external_images || imagePlaceholder())
    .split('\n')

const getFilter = (article, key, withImage) =>
  [article.attributes.core[`emgroup_${key}`]]
    .filter(attr => attr)
    .map(attr => ({
      label: attr,
      image: withImage && getImageUrls(article)[0]
    }))
    .reduce((p, n) => p || n, null)

const getAttributes = article => {
  try {
    const res = Object.keys(article.propertySet.groups)
      .map(key => article.propertySet.groups[key])
      .map(group => ({
        label: group.name,
        value: group.options.map(opt => opt.name).join(', '),
        code: group.attributes.core.emgroup_code
      }))
    return res
  }
  catch (e) {
    return []
  }
}

const getServiceIcons = (article, iconDict) => {
  try {
    const res = Object.keys(iconDict)
      .map(key => Object.assign({}, iconDict[key], { key: `emgroup_${key}` }))
      .filter(({ key }) => article.attributes.core[key] === '1')
      .map(({ pic, text }) => ({
        image: pic,
        label: text
      }))

    return res
  }
  catch (e) {
    return []
  }
}

const mapPriceRules = (priceRules) => {
  //priceRules.map funktioniert nicht, da die api hier ein object anstatt ein array zurückgibt. eine zusätzliche abfrage ist hier notwendig.
  if(Array.isArray(priceRules)) {
    return priceRules.map((cur) => ({
      price: cur.price,
      from: cur.from,
      to: cur.to
    }), [])
  }
  else {
    return Object.keys(priceRules).map((key) => ({
      price: priceRules[key].price,
      from: priceRules[key].from,
      to: priceRules[key].to
    }), [])
  }
}

const getIsNewFlag = (date) => {
  const expireDate = new Date(date)
  const currentDate = new Date()

  return currentDate < expireDate
}

const calcActiveStatus = (emgroup_active) => {
  if (!emgroup_active) return false
  try {
    const emgroupActiveArr = JSON.parse(emgroup_active),
      emgroupActive = emgroupActiveArr[shopId]
    return emgroupActive
  }
  catch (e) {
    return false
  }
}

const removeBr = (input) => (
  input.replace(/<br[^>]*>/gi, '\n')
)

const parseStringToArray = (value) => {
  try {
    const arr = value.split(',')
    return (arr.length > 1) ? arr : []
  }
  catch (e) {
    return []
  }
}

const lowerUrl = (value) => {
  try {
    const lower = value.toLowerCase()
    return lower.replace('sarticle', 'sArticle')
  } catch(e) {
    return ''
  }
}


export default function preprocessSwArticleResponse(swData:any) {
  let container
  swData.articles.some(row => {
    container = row
    return row.attributes.core.is_master_article === '1'
  })

  const result = swData.articles
    .filter(row => row.attributes.core.is_master_article === '0') // only true skus
    // .filter(row => calcActiveStatus(row.attributes.core.emgroup_active)) // only active
    // .filter(row => row.prices.map(price => price.calculatedPrice)[0] !== 10000) // filter 10.000€
    .map((row, index, array) => {
      let tailorSizes = {},
        attr = getAttributes(row),
        isCustomTailor = (attr.find(a => a.code === 'CONFIGURATION_MODEL') !== undefined)

      try {
        tailorSizes = isCustomTailor && {
          // $FlowFixMe
          minWidth: parseInt(attr.find(a => a.code === 'WIDTH_MIN').value, 10), // $FlowFixMe
          maxWidth: parseInt(attr.find(a => a.code === 'WIDTH_MAX').value, 10), // $FlowFixMe
          minHeight: parseInt(attr.find(a => a.code === 'LENGTH_MIN').value, 10), // $FlowFixMe
          maxHeight: parseInt(attr.find(a => a.code === 'LENGTH_MAX').value, 10)
        }
      } catch (e) {
        isCustomTailor = false
      }
      
      attr = attr
        .filter(row => row.code !== 'CONFIGURATION_MODEL')
        .filter(row => row.code !== 'CUSTOMIZABLE')

      return {
        active: calcActiveStatus(row.attributes.core.emgroup_active),
        sellable: !(row.closeouts && row.stock === 0),
        articleId: row.id,
        articleUrl: lowerUrl(row.attributes.emgroup_article_url),
        articleContainerUrl: lowerUrl(container.attributes.emgroup_article_url),
        attributes: attr,
        bundleSkus: (swData.bundles || []).map(bundle => ({sku: bundle.sku.toString(), preselected: bundle.preselected})),
        closeout: row.closeouts || false,
        containerSku: array[0].number || null,
        crossSellSkus: parseStringToArray(row.attributes.core.emgroup_cross_sell_skus),
        customizableUrl: row.attributes.personalization.url || null,
        customTailor: {
          setId: 1,
          sizes: tailorSizes
        },
        deliveryDate: row.attributes.core.emgroup_delivery_date,
        filterValues: {
          color: getFilter(row, 'ax_color', true) || null,
          size: getFilter(row, 'ax_size') || null,
          variant: getFilter(row, 'ax_variant') || null,
          style: getFilter(row, 'ax_style') || null
        },
        hasPriceRules: row.priceRules ? mapPriceRules(row.priceRules)[0].to !== null : false,
        images: getImageUrls(row),
        isCustomTailor: isCustomTailor,
        isNew: getIsNewFlag(row.attributes.core.emgroup_novelty_expiration),
        isDummy: false,
        longDescription: removeBr(row.longDescription),
        masterArticleNumber: row.attributes.core.master_article_number || '',
        ordernumber: row.number,
        packUnit: row.unit.packUnit,
        energyEfficienceClass: row.attributes.core.emgroup_energy_efficiency_class,
        energyLabelImage: row.attributes.core.emgroup_energy_label,
        packUnitId: row.unit.id,
        price: row.prices.map(price => price.calculatedPrice)[0],
        priceRules: row.priceRules ? mapPriceRules(row.priceRules) : [],
        priceSingle: row.prices.map(price => price.calculatedReferencePrice || price.calculatedPrice)[0],
        productNumber: row.attributes.core.emgroup_product_number,
        pseudoPrice: row.prices.map(price => price.calculatedPseudoPrice)[0],
        pseudoPriceSingle: row.prices.map(price => price.calculatedPseudoPrice)[0] / row.unit.purchaseUnit,
        purchaseUnit: row.unit.purchaseUnit === null ? 0 : row.unit.purchaseUnit,
        rating: {
          value: (container.voteAverage) ? container.voteAverage.average : null,
          count: (container.voteAverage) ? container.voteAverage.count : null
        },
        requestSamplesUrl: row.attributes.requestSamples.url || null,
        sale: row.prices.map(price => price.calculatedPseudoPrice)[0] > row.prices.map(price => price.calculatedPrice)[0],
        series: {
          name: row.attributes.seriesData.seriesName || null,
          url: row.attributes.seriesData.seriesLink || null
        },
        seriesSkus: parseStringToArray(row.attributes.emgroup_series_skus),
        serviceIcons: getServiceIcons(row, swData.icons),
        shippingFree: row.shippingFree,
        shortDescription: trimText(removeBr(row.longDescription)),
        similarSkus: parseStringToArray(row.attributes.emgroup_smiliar_skus),
        stock: row.stock,
        subtitle: row.name.split(';').slice(1).join(';') || '',
        tax: (row.tax.tax / 100),
        title: row.attributes.core.emgroup_shortname.split(';')[0],
        unitName: row.unit.name,
        votes: container.votes
      }
    })

  /*eslint-disable */
  if (process.env.NODE_ENV === 'development') {
    // console.log('mappedArt', result) //eslint-disable-line
    // console.log('rawArt', swData) //eslint-disable-line
  }
  /*eslint-enable */

  return result
}