import type { RouteObject } from 'react-router-dom';
import { NewsPage, NewsPreviewPage } from './routes';

export const newsRoutes: RouteObject[] = [
  {
    children: [
      {
        path: '/news',
        element: <NewsPage />,
      },
      {
        path: '/news/:newsId',
        element: <NewsPreviewPage />,
      },
    ],
  },
];
