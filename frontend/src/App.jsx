import React, { useState, useEffect, lazy } from "react";
import {
  // AuthContextProvider,
  AuthChangeRedirector,
  AnonymousRoute,
  AuthenticatedRoute,
} from "@/features/auth";
import RequestPasswordReset from "@/account/RequestPasswordReset";
import ConfirmPasswordResetCode from "@/account/ConfirmPasswordResetCode";
import ChangePassword from "@/account/ChangePassword";
import {
  resetPasswordByLinkLoader,
  ResetPasswordByCode,
  ResetPasswordByLink,
} from "@/account/ResetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useConfig } from "@/features/auth/hooks";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const Landing = lazy(() => import("@/pages/Home"));
// const HomePage = lazy(() => import("@/pages/HomePage"));
const Dashboard = lazy(() => import("@/components/dashboard/Dashboard"));
const Login = lazy(() => import("@/components/auth/Login"));
const SignUp = lazy(() => import("@/components/auth/SignUp"));
const AppLayout = lazy(() => import("@/components/common/AppLayout"));
const HelpPage = lazy(() => import("@/pages/HelpPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const NotFound = lazy(() => import("@/pages/404"));
const AccountLayout = lazy(() => import("@/account/account-layout"));
const ProviderCallback = lazy(() => import("@/socialaccount/ProviderCallback"));
const ProviderSignup = lazy(() => import("@/socialaccount/ProviderSignup"));

function createRouter(config) {
  return createBrowserRouter([
    {
      path: "",
      element: (
        <AuthChangeRedirector>
          <AppLayout />
        </AuthChangeRedirector>
      ),
      children: [
        {
          path: "",
          Component: Landing,
        },
        // {
        //   path: "/landing",
        //   element: <LandingPage />,
        // },
        // {
        //   path: "/login",
        //   element: <AnonymousRoute><LoginPage /></AnonymousRoute>,
        // },
        // {
        //   path: "/account/logout",
        //   Component: LogoutPage,
        // },
        {
          path: "/account/*",
          element: (
            <AnonymousRoute>
              <AccountLayout />
            </AnonymousRoute>
          ),
          children: [
            {
              path: "signup",
              Component: SignUp,
            },
            {
              path: "login",
              Component: Login,
            },
            {
              path: "password/reset",
              Component: RequestPasswordReset,
            },
            {
              path: "password/reset/confirm",
              Component: ConfirmPasswordResetCode,
            },
            {
              path: "password/reset/complete",
              Component: ResetPasswordByCode,
            },
            {
              path: "password/reset/key/:key",
              Component: ResetPasswordByLink,
              loader: resetPasswordByLinkLoader,
            },
          ],
        },
        {
          path: "account/password/change",
          element: (
            <AuthenticatedRoute>
              <AccountLayout>
                <ChangePassword />
              </AccountLayout>
            </AuthenticatedRoute>
          ),
        },
        {
          path: '/account/provider/callback',
          Component: ProviderCallback
        },
        {
          path: '/account/provider/signup',
          element: <AnonymousRoute><ProviderSignup /></AnonymousRoute>
        },
        {
          path: "/dashboard/*",
          element: (
            <AuthenticatedRoute>
              <Dashboard />
            </AuthenticatedRoute>
          ),
        },

        // {
        //   path: "/dashboard",
        //   element: <Dashboard />
        // },
        // {
        //   path: "/help",
        //   Component: HelpPage,
        // },
        {
          path: "*",
          Component: NotFound,
        },
      ],
    },
  ]);
}

export function Router() {
  // If we create the router globally, the loaders of the routes already trigger
  // even before the <AuthContext/> trigger the initial loading of the auth.
  // state.
  const [router, setRouter] = useState(null);
  const config = useConfig();
  useEffect(() => {
    setRouter(createRouter(config));
  }, [config]);

  return router ? (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true, // Enable the future flag
        v7_relativeSplatPath: true, // Enables relative paths in nested routes
        // v7_fetcherPersist: true, // Retains fetcher state during navigation
        // v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
        // v7_partialHydration: true, // Supports partial hydration for server-side rendering
        // v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
      }}
    />
  ) : null;
}

export default function App() {
  // return <Test/>
  return (
    // <AuthContextProvider>
    <Provider>
      <Toaster />
      <Router />
    </Provider>
    // </AuthContextProvider>
  );
}
