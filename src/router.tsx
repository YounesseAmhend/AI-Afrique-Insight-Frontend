import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NewsDetailPage } from './pages/NewsDetailsPage';
import { ErrorPage } from './pages/ErrorPage';
import { MainLayout } from './components/layout/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'news/:id',
        element: <NewsDetailPage />,
      },
    ],
  },
]);