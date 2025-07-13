export interface IEnvironment {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  logoUrl: string;
  address: string;
  zipCode: string;
  phone: string;
  categoryName: string;
  categoryCode: EMerchantCategoryCode;
  categoryId: string;
  description: string;
  preparationTime: number;
  minimumOrderValue: number;
  coverUrl: string;
  latitude: number;
  longitude: number;
  logoBase64?: string;
  coverBase64?: string;
}

export type IEnvironmentWithoutBase64 = Omit<IEnvironment, 'logoBase64' | 'coverBase64'>;


export enum EMerchantCategoryCode {
  AC1 = 'AC1',
  AF1 = 'AF1',
  ALE = 'ALE',
  ARA = 'ARA',
  AR1 = 'AR1',
  ASI = 'ASI',
  BA1 = 'BA1',
  BRA = 'BRA',
  CA1 = 'CA1',
  CAR = 'CAR',
  CS1 = 'CS1',
  CHI = 'CHI',
  CO1 = 'CO1',
  CN1 = 'CN1',
  CF1 = 'CF1',
  CNT = 'CNT',
  CR1 = 'CR1',
  CRP = 'CRP',
  CP1 = 'CP1',
  DCE = 'DCE',
  ES1 = 'ES1',
  FRA = 'FRA',
  FR1 = 'FR1',
  FRU = 'FRU',
  GA1 = 'GA1',
  GRC = 'GRC',
  BUR = 'BUR',
  IND = 'IND',
  ITA = 'ITA',
  JAP = 'JAP',
  LCH = 'LCH',
  MA1 = 'MA1',
  MAR = 'MAR',
  MED = 'MED',
  MEX = 'MEX',
  MI1 = 'MI1',
  NO1 = 'NO1',
  PA1 = 'PA1',
  PQC = 'PQC',
  PR1 = 'PR1',
  PAS = 'PAS',
  PX1 = 'PX1',
  PER = 'PER',
  PIZ = 'PIZ',
  POR = 'POR',
  PRE = 'PRE',
  SAG = 'SAG',
  SAU = 'SAU',
  SP1 = 'SP1',
  SOR = 'SOR',
  THA = 'THA',
  TA1 = 'TA1',
  TN1 = 'TN1',
  VAR = 'VAR',
  VE1 = 'VE1',
  VEG = 'VEG',
  XI1 = 'XI1',
  YA1 = 'YA1',
}

export const EMerchantCategoryName = {
  [EMerchantCategoryCode.AC1]: 'Açaí',
  [EMerchantCategoryCode.AF1]: 'Africana',
  [EMerchantCategoryCode.ALE]: 'Alemã',
  [EMerchantCategoryCode.ARA]: 'Árabe',
  [EMerchantCategoryCode.AR1]: 'Argentina',
  [EMerchantCategoryCode.ASI]: 'Asiática',
  [EMerchantCategoryCode.BA1]: 'Baiana',
  [EMerchantCategoryCode.BRA]: 'Brasileira',
  [EMerchantCategoryCode.CA1]: 'Cafeteria',
  [EMerchantCategoryCode.CAR]: 'Carnes',
  [EMerchantCategoryCode.CS1]: 'Casa de Sucos',
  [EMerchantCategoryCode.CHI]: 'Chinesa',
  [EMerchantCategoryCode.CO1]: 'Colombiana',
  [EMerchantCategoryCode.CN1]: 'Comida na Tigela',
  [EMerchantCategoryCode.CF1]: 'Comfort Food',
  [EMerchantCategoryCode.CNT]: 'Contemporânea',
  [EMerchantCategoryCode.CR1]: 'Crepe',
  [EMerchantCategoryCode.CRP]: 'Culinária Rápida',
  [EMerchantCategoryCode.CP1]: 'Cupcake',
  [EMerchantCategoryCode.DCE]: 'Doces',
  [EMerchantCategoryCode.ES1]: 'Espanhola',
  [EMerchantCategoryCode.FRA]: 'Francesa',
  [EMerchantCategoryCode.FR1]: 'Frangos',
  [EMerchantCategoryCode.FRU]: 'Frutas',
  [EMerchantCategoryCode.GA1]: 'Gaúcha',
  [EMerchantCategoryCode.GRC]: 'Grega',
  [EMerchantCategoryCode.BUR]: 'Hambúrguer',
  [EMerchantCategoryCode.IND]: 'Indiana',
  [EMerchantCategoryCode.ITA]: 'Italiana',
  [EMerchantCategoryCode.JAP]: 'Japonesa',
  [EMerchantCategoryCode.LCH]: 'Lanches',
  [EMerchantCategoryCode.MA1]: 'Marmita',
  [EMerchantCategoryCode.MAR]: 'Marroquina',
  [EMerchantCategoryCode.MED]: 'Mediterrânea',
  [EMerchantCategoryCode.MEX]: 'Mexicana',
  [EMerchantCategoryCode.MI1]: 'Mineira',
  [EMerchantCategoryCode.NO1]: 'Nordestina',
  [EMerchantCategoryCode.PA1]: 'Padaria',
  [EMerchantCategoryCode.PQC]: 'Panqueca',
  [EMerchantCategoryCode.PR1]: 'Paranaense',
  [EMerchantCategoryCode.PAS]: 'Pastel',
  [EMerchantCategoryCode.PX1]: 'Peixes',
  [EMerchantCategoryCode.PER]: 'Peruana',
  [EMerchantCategoryCode.PIZ]: 'Pizza',
  [EMerchantCategoryCode.POR]: 'Portuguesa',
  [EMerchantCategoryCode.PRE]: 'Presentes',
  [EMerchantCategoryCode.SAG]: 'Salgados',
  [EMerchantCategoryCode.SAU]: 'Saudável',
  [EMerchantCategoryCode.SP1]: 'Sopas & Caldos',
  [EMerchantCategoryCode.SOR]: 'Sorvetes',
  [EMerchantCategoryCode.THA]: 'Tailandesa',
  [EMerchantCategoryCode.TA1]: 'Tapioca',
  [EMerchantCategoryCode.TN1]: 'Típica do Norte',
  [EMerchantCategoryCode.VAR]: 'Variada',
  [EMerchantCategoryCode.VE1]: 'Vegana',
  [EMerchantCategoryCode.VEG]: 'Vegetariana',
  [EMerchantCategoryCode.XI1]: 'Xis',
  [EMerchantCategoryCode.YA1]: 'Yakisoba',
} as const
