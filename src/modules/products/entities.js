// @flow

export type ProductNumber = string

export type Identifier = string

export type Ordernumber = string

export type Number = ProductNumber | Ordernumber

export type FilterKey = 'color' | 'size' | 'variant' | 'style'

export type FilterType = 'EMPTY' | 'SELECT' | 'TEXT' | 'IMAGE'

export type FilterValue = {|
  label: string,
  image?:string
|}

export type FilterValues = {[filterKey:FilterKey]: FilterValue | null}

export type FilterOption = {|
  value: FilterValue,
  selectable: boolean,
  sale: boolean
|}

export type Filter = {|
  value: FilterValue | null,
  options: FilterOption[],
  key: FilterKey,
  type: FilterType,
  identifier: Identifier
|}

export type Article = {|
  ordernumber: Ordernumber,
  filterValues: FilterValues,
  productNumber: ProductNumber,
  // active: boolean,
  // articleId: string,
  // articleUrl: string,
  // articleContainerUrl: string,
  // attributes: string[],
  // bundleSkus: Number[],
  // closeout: boolean,
  // containerSku: string,
  // customizableUrl: string | null,
  // customTailorSetId: string | null,
  // deliveryDate: string,
  // hasPriceRules: boolean,
  images: string[],
  // isCustomTailor: boolean,
  // isNew: boolean,
  // longDescription: string,
  // masterArticleNumber: string,
  // packUnit: 'Packung',
  // packUnitId: string | null,
  price: number,
  // priceRules: mixed[],
  // priceSingle: number,
  // pseudoPrice: number,
  // purchaseUnit: number,
  // rating: { value: number, count: number },
  // crossSellSkus: Number[],
  // requestSamplesUrl: string | null,
  // relatedSkus: Number[],
  sale: boolean,
  // series: { name: string|null, url: string|null },
  // seriesSkus: Number[],
  // serviceIcons: string[],
  // shippingFree: boolean,
  // shortDescription: string,
  // similarSkus: Number[],
  // stock: number,
  // subtitle: string,
  // tax: number,
  title: string,
  // unitName: 'Stück',
  // votes: mixed[],
  // isDummy: boolean,
  // pseudoPriceSingle: number
|}