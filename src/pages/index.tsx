import { lazy, memo, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Blog from "./blog/Blog";
import ContactUs from "./contactUs/ContactUs";
import NotFound from "./404/404";

const MainLayout = lazy(() => import("./layout"));
const Home = lazy(() => import("./home"));
const Shop = lazy(() => import("./shop"));
const SignIn = lazy(() => import("./sign-in"));
const Account = lazy(() => import("./account"));
const Auth = lazy(() => import("./auth"));
const ProductDetail = lazy(()=>import("./product/ProductDetail"))

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {useRoutes([
        // puplic route with layout
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { path: "/", element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "blog", element: <Blog /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "products/:id", element: <ProductDetail /> },
            { path: "*", element: <NotFound /> },
          ],
        },
        // private route
        {
          path: "/",
          element: <Auth />,
          children: [
            {
              path: "",
              element: <MainLayout />,
              children: [{ path: "account", element: <Account /> }],
            },
          ],
        },
        // puplic route without layout
        { path: "/sign-in", element: <SignIn /> },
      ])}
    </Suspense>
  );
};

export default memo(AppRouter);
