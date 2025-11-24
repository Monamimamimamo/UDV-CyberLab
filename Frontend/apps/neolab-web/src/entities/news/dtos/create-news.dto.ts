export interface CreateNewsDto {
  name: string;
  description: string;
  shortDescription: string;
  ownerName: string;
  url: string;
  logoPhoto: File;
}