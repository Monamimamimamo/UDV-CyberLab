import type { CreateTestDTO } from './CreateTestDTO';

export interface UpdateTestDTO extends CreateTestDTO {
  id: string;
}
