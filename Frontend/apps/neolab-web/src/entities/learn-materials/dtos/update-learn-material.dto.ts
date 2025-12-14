import type { CreateLearnMaterialDto } from './create-learn-material.dto';

export type UpdateLearnMaterialDto = Partial<CreateLearnMaterialDto> & { id: string };
