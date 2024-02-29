import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Page not found
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
