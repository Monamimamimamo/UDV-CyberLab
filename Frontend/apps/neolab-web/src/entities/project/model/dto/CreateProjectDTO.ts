export interface CreateProjectDTO {
  name: string;
  description: string;
  shortDescription: string;
  ownerName: string;
  landingURL: string;
  logoPhoto: File;
  projectPhoto?: File;
  documentation: File; 
}