import type { ITestCard } from '../types/ITestCard';

export const mapStateToStatus = (state: number): ITestCard['status'] => {
  switch (state) {
    case 0:
      return 'idle';
    case 1:
      return 'run';
    case 2:
      return 'over';
    default:
      return 'idle';
  }
};
