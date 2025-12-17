export interface CreateLearnMaterialDto {
  name: string;
  description: string;
  shortDescription: string;
  publicationType: string;
  ownerName: string;
  url: string;
  logoPhoto: File;
}
