import { createBrowserRouter } from "react-router-dom";
import { App } from "@app/App";
import { HomePage } from "@pages/home/HomePage";
import { LoginPage } from "@pages/login/ui/LoginPage";
import { RegistrationForm } from "@features/auth/ui/registrationForm";
import { NotFoundPage } from "@pages/notFound/notFoundPage";
import { ProductForm } from "@features/auth/ui/productsForm";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'registration',
          element: <RegistrationForm />,
        },
        {
            path: 'products',
            element: <ProductForm />,
        },
        {
            path: '*',
            element: <NotFoundPage />, //страница 404 
        }
      ],
    },
  ]);