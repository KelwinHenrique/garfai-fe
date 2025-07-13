import { EPortionSize, IChoice } from "./IMenu"

export interface ICreateUpdateItemDetailBody {
  description: string
  details: string
  unitPrice: number // Price in cents
  unitOriginalPrice: number // Price in cents

  logoUrl?: string | null
  pdvCode?: string
  portionSizeTag?: EPortionSize
  choices: IChoice[]
}