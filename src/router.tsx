import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ErrorPage } from "./pages/error/errorPage";
import { HomePage } from "./pages/home/homePage";
import { NewsDetailPage } from "./pages/news_details/newsDetailsPage";


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
