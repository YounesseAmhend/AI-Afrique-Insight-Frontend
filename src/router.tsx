import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ErrorPage } from "./pages/error/ErrorPage";
import { HomePage } from "./pages/home/HomePage";
import { NewsDetailPage } from "./pages/news_details/NewsDetailsPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "news/:id",
                element: <NewsDetailPage />,
            },
        ],
    },
]);
