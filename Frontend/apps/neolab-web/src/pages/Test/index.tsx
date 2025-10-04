import { Navigate, type RouteObject } from 'react-router-dom';
import { ManageTestLayout, MyTestLayout, TestLayout } from './layouts';
import { TestGuard } from './guards';
import {
  TestsPage,
  TestPage,
  TestOverviewPage,
  MyCreatedTestsPage,
  MyPassedTestsPage,
  MyTestsPage,
  TestPreviewPage,
  TestResultPage,
  TestSettingsPage,
  TestStatisticsPage,
  TestResultListPage,
  EditCustomPage,
  EditGeneratePage,
  EditAIPage,
  TestResultPreviewPage,
} from './routes';
import { TeacherGuard } from '@/entities/user';

export const testRoutes: RouteObject[] = [
  {
    element: <TestLayout />,
    children: [
      /* Tests Page */
      {
        path: '/tests',
        element: <TestsPage />,
      },
      /* Test Passing Pages */
      {
        children: [
          {
            element: <TestGuard />,
            children: [
              {
                path: '/tests/:testId',
                element: <TestPage />,
              },
              {
                path: '/tests/:testId/overview',
                element: <TestOverviewPage />,
              },
            ],
          },
          {
            children: [
              {
                path: '/tests/:testId/results',
                element: <TestResultListPage />,
              },
              {
                path: '/tests/:testId/results/:attemptId',
                element: <TestResultPage />,
              },
              {
                path: '/tests/:testId/results/:attemptId/preview',
                element: <TestResultPreviewPage />,
              },
            ],
          },
        ],
      },
      /* My Tests Pages */
      {
        element: <MyTestLayout />,
        children: [
          {
            path: '/tests/my',
            element: <MyTestsPage />,
          },
          {
            path: '/tests/my/passed',
            element: <MyPassedTestsPage />,
          },
          {
            element: <TeacherGuard redirectPath="/tests" />,
            children: [
              {
                path: '/tests/my/created',
                element: <MyCreatedTestsPage />,
              },
            ],
          },
        ],
      },
      /* Test Manage Pages */
      {
        element: <TeacherGuard redirectPath="/tests" />,
        children: [
          {
            element: <ManageTestLayout />,
            children: [
              {
                path: '/tests/manage/:testId/edit',
                element: <Navigate replace to="custom" />,
              },
              {
                path: '/tests/manage/:testId/edit/custom',
                element: <EditCustomPage />,
              },
              {
                path: '/tests/manage/:testId/edit/generate',
                element: <EditGeneratePage />,
              },
              {
                path: '/tests/manage/:testId/edit/ai',
                element: <EditAIPage />,
              },
              {
                path: '/tests/manage/:testId/settings',
                element: <TestSettingsPage />,
              },
              {
                path: '/tests/manage/:testId/preview',
                element: <TestPreviewPage />,
              },
            ],
          },
          {
            path: '/tests/manage/:testId/statistics',
            element: <TestStatisticsPage />,
          },
        ],
      },
    ],
  },
];
