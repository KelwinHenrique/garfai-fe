import { IEnvironment } from "./IEnvironment";

export enum EUserAccessRole {
  owner = 'owner',
  admin = 'admin',
  member = 'member'
}

export enum EUserAccessStatus {
  active = 'active',
  invite = 'invite'
}
export interface IUserAccess {
  id: string;
  userId: string;
  environmentId: string;
  role: EUserAccessRole;
  status: EUserAccessStatus;
  deleted: boolean;
}

export interface IUserAccessPopulated extends Omit<IUserAccess, 'environment'> {
  environment: Pick<IEnvironment, 'city' | 'name' | 'logoUrl' | 'categoryName' | 'coverUrl' | 'id'>
}