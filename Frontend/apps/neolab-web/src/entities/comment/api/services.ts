import { CommentApiService } from './comment-api.service';

export const commentServices = {
  projects: new CommentApiService('/api/ProjectComment', 'projects-comments'),
  news: new CommentApiService('/api/NewsComment', 'news-comments'),
  'learn-materials': new CommentApiService(
    '/api/LearnMaterialsComment',
    'learn-materials-comments',
  ),
} as const;
