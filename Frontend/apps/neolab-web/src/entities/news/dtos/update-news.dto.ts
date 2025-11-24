import type { CreateNewsDto } from './create-news.dto';

export type UpdateNewsDto = Partial<CreateNewsDto> & { id: string };
