import {EPortionSize, IChoice, IProductInfo } from "./IMenu"

export interface ItemDetailMenuCategoryDto {
  id: string
  name: string
  displayOrder: number
  isActive: boolean
  categoryType: string
}

export interface IItemDetail {
  id: string
  description: string
  details: string | null
  logoUrl: string | null
  unitPrice: number // Price in cents
  unitOriginalPrice?: number | null // Price in cents
  unitMinPrice?: number | null // Price in cents
  productInfo?: IProductInfo
  choices?: IChoice[]
  displayOrder: number
  menuCategory: ItemDetailMenuCategoryDto

  // Form-specific fields / fields from detailed spec
  itemType: "prepared" | "industrialized_beverage" | "industrialized"
  pdvCode?: string
  portionSizeTag?: EPortionSize
  hasComplements?: boolean // For complements tab
}