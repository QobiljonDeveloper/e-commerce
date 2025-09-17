import { lazy, memo, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Wishlist from "./wishlist";
import Cart from "./cart";
import ClipLoader from "react-spinners/ClipLoader";
import Blog from "./blog/Blog";
import ContactUs from "./contactUs/ContactUs";
import NotFound from "./404/404";
import Address from "./account/components/address";
import AccountSub from "./account/components/accountSub/index";
import Orders from "./account/components/orders";
import WishlistProfile from "./account/components/wishlistProfile";

const MainLayout = lazy(() => import("./layout"));
const Home = lazy(() => import("./home"));
const Shop = lazy(() => import("./shop"));
const SignIn = lazy(() => import("./sign-in"));
const Account = lazy(() => import("./account"));
const Auth = lazy(() => import("./auth"));
const ProductDetail = lazy(() => import("./product/ProductDetail"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <ClipLoader />
        </div>
      }
    >
      {useRoutes([
        // puplic route with layout
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { path: "/", element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "wishlist", element: <Wishlist /> },
            { path: "cart", element: <Cart /> },
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
              children: [
                {
                  path: "account",
                  element: <Account />,
                  children: [
                    { index: true, element: <AccountSub /> },
                    {
                      path: "address",
                      element: <Address />,
                    },
                    { path: "orders", element: <Orders /> },
                    { path: "wishlist", element: <WishlistProfile /> },
                  ],
                },
              ],
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
