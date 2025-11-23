export interface ITestDetails {
  id: string;
  owner: string;
  title: string;
  difficulty: string;
  subject: string;
  startDate: string;
  endDate: string;
  duration?: string;

  leftAttempts?: number;

  totalPoints: number;
  currentPoints?: number;

  status: 'idle' | 'run' | 'over';
}
