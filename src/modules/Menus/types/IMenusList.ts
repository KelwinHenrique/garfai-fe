import { ITimestamps } from "@/shared/types/ITimestamp";

export interface IMenusList extends ITimestamps {
  id: string; // uuid
  environment_id: string; // uuid, fk to environments.id
  ifood_merchant_id: string | null;
  raw_catalog_data: any | null; // jsonb, can be the parsed IFoodAPIResponse
  is_active: boolean;
  name: string | null;
  imported_at: Date | null;
  menuStatus: EImportMenuStatus;
}


export enum EImportMenuStatus {
  NOT_IMPORTED = 'NOT_IMPORTED',
  SCHEDULED = 'SCHEDULED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
