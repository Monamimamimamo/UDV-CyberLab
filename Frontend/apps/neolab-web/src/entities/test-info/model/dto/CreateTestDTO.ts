export interface CreateTestDTO {
  name: string;
  description: string;
  theme: string;
  difficulty: string;
  maxPoints: number;
  
  startTestTime: string;
  endTestTime: string;
  passTestTime?: string;
  attemptsCount: number;
}
