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

// AI Image Enhancement Types
export interface IAIEnhancementRequest {
  imageUrl: string
  itemId: string
}

export interface IAIEnhancementResponse {
  success: boolean
  data: {
    jobId: string
  }
  timestamp: string
  executionTime: number
}

export interface IAIJobStatus {
  id: string
  itemId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  imageUrl: string
  enhancedImageUrl?: string
  analysisResult?: {
    input: string
    output: string
  }
  errorMessage?: string | null
  startedAt: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export interface IAIJobStatusResponse {
  success: boolean
  data: IAIJobStatus
  timestamp: string
}