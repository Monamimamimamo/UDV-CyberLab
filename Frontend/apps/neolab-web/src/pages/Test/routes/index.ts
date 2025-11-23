import { lazy } from 'react';

export const EditAIPage = lazy(() => import('./manage/EditAIPage'));
export const EditCustomPage = lazy(() => import('./manage/EditCustomPage'));
export const EditGeneratePage = lazy(() => import('./manage/EditGeneratePage'));
export const TestPreviewPage = lazy(() => import('./manage/TestPreviewPage'));
export const TestSettingsPage = lazy(() => import('./manage/TestSettingsPage'));
export const TestStatisticsPage = lazy(
  () => import('./manage/TestStatisticsPage')
);

export const MyCreatedTestsPage = lazy(() => import('./my/MyCreatedTestsPage'));
export const MyPassedTestsPage = lazy(() => import('./my/MyPassedTestsPage'));
export const MyTestsPage = lazy(() => import('./my/MyTestsPage'));

export const TestPage = lazy(() => import('./test/TestPage'));
export const TestOverviewPage = lazy(() => import('./test/TestOverviewPage'));
export const TestResultPage = lazy(() => import('./test/TestResultPage'));
export const TestResultListPage = lazy(
  () => import('./test/TestResultListPage')
);
export const TestResultPreviewPage = lazy(
  () => import('./test/TestResultPreviewPage')
);

export const TestsPage = lazy(() => import('./tests/TestsPage'));
