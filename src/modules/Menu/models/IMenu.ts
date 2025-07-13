export interface IGarnishItem {
  id?: string
  description: string // Name of the garnish/complement item
  logoUrl: string | null
  unitPrice: number // Price in cents
  details: string | null // Further description
  displayOrder: number
  pdvCode?: string // For complement items in form
  isActive: boolean
}

export interface IChoice {
  // Represents a complement group
  id?: string
  name: string // Name of the complement group
  min: number // Min selectable items in this group
  max: number // Max selectable items in this group
  garnishItems: IGarnishItem[]
  displayOrder: number
  isActive: boolean
}

export interface IProductInfo {
  id: string
  packaging: string | null
  sequence: number | null
  quantity: number
  unit: string
  ean: string | null
}


export enum EPortionSize {
  SERVES_1 = 'SERVES_1',
  SERVES_2 = 'SERVES_2',
  SERVES_3 = 'SERVES_3',
  SERVES_4 = 'SERVES_4',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export const portionSizeOptions: { value: EPortionSize; label: string }[] = [
  { value: EPortionSize.NOT_APPLICABLE, label: "N/A" },
  { value: EPortionSize.SERVES_1, label: "1 pessoa" },
  { value: EPortionSize.SERVES_2, label: "2 pessoas" },
  { value: EPortionSize.SERVES_3, label: "3 pessoas" },
  { value: EPortionSize.SERVES_4, label: "4 pessoas" },
]


export interface IMenuItem {
  id: string
  description: string
  details: string
  logoUrl: string | null
  unitPrice: number // Price in cents
  unitOriginalPrice?: number | null // Price in cents
  productInfo?: IProductInfo
  choices?: IChoice[]
  displayOrder: number

  // Form-specific fields / fields from detailed spec
  itemType: "prepared" | "industrialized_beverage" | "industrialized"
  pdvCode?: string
  discountAmount?: number // Discount in cents
  portionSizeTag?: EPortionSize
  hasComplements?: boolean // For complements tab
}

export interface IMenuCategory {
  id: string
  name: string
  items: IMenuItem[]
  displayOrder: number
}

export enum EImportMenuStatus {
  NOT_IMPORTED = 'NOT_IMPORTED',
  SCHEDULED = 'SCHEDULED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface IMenu {
  id?: string
  name: string
  isActive: boolean
  status: EImportMenuStatus
  categories: IMenuCategory[]
  menuStatus: EImportMenuStatus
}
