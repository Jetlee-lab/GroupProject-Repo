import { Link, useNavigate } from "react-router-dom";
import { House } from "lucide-react"

export default function NotFound() {
    const navigate = useNavigate();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col space-y-6 text-center">
          <p className="text-8xl font-extrabold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          Oops! Lost in Cyberspace
          </h1>
          <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="flex items-center justify-center gap-x-8 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               <span aria-hidden="true">&larr;</span> Go back
            </button>
            <Link to="/" className="flex flex-row gap-x-2 text-sm font-semibold text-blue-700 underline underline-offset-2">
              <House size={18}/>{" "}Home
            </Link>
            <Link to="#" className="text-sm font-semibold text-blue-700 underline underline-offset-2">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
