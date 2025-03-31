import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import { Provider } from "@/provider.tsx";
import { Suspense } from "react";
import Dashbord from "./pages/dashbord";
import { LogIn, SignUp } from "./routes";

const router = createBrowserRouter([
  // {
  //   // no path on this parent route, just the component
  //   Component: MarketingLayout,
  //   children: [
  //     { index: true, Component: Home },
  //     { path: "contact", Component: Contact },
  //   ],
  // },
  // {
  //   path: "projects",
  //   children: [
  //     { index: true, Component: ProjectsHome },
  //     {
  //       // again, no path, just a component for the layout
  //       Component: ProjectLayout,
  //       children: [
  //         { path: ":pid", Component: Project },
  //         { path: ":pid/edit", Component: EditProject },
  //       ],
  //     },
  //   ],
  // },
  {
    path: "/",
    Component: IndexPage,
    // loader: async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 2000));

    //   return null;
    // },
  },
  {
    path: "/docs",
    Component: DocsPage,
  },
  {
    path: "/pricing",
    Component: PricingPage,
  },
  {
    path: "/blog",
    Component: BlogPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/dashboard",
    Component: Dashbord,
    // Component: () => (
    //   <Suspense fallback={<div>Loading Dashboard...</div>}>
    //     <Dashbord />
    //   </Suspense>
    // ),
  },
  {
    path: "/account/*",
    children: [
      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider fallbackElement={<p>Initial Load...</p>} router={router} />
  );

  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<DocsPage />} path="/docs" />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
