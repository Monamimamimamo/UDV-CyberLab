import type { AccessTokenType, CurrentTestType } from '../types';
import { LocalStorageService } from './LocalStorage';

export const tokenService = new LocalStorageService<AccessTokenType>('token');
export const currentTestService = new LocalStorageService<CurrentTestType>('currentAttemptId');
