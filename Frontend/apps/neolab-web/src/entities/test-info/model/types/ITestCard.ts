export enum TestStatus {
  IDLE = 'idle',
  RUN = 'run',
  OVER = 'over',
}

export interface ITestCard {
  id: string;
  owner: string;
  title: string;
  totalPoints?: number;
  currentPoints?: number;
  status: 'idle' | 'run' | 'over';
}


