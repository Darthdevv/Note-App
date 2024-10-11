import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[#F7F18A] border border-[#F2D161] text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold text-[black] focus:outline-none focus:opacity-80"
            to="/"
          >
            EverNote
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-2 rounded-lg border border-[#F2D161] font-medium bg-[#F7F18A] text-[black] shadow-sm align-middle focus:outline-none text-sm"
              id="hs-navbar-primary-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-primary"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-primary"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-primary"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-primary-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <NavLink
              className="font-medium text-[black] focus:outline-none"
              to="login"
              aria-current="page"
            >
              Login
            </NavLink>
            <NavLink
              className="font-medium text-[black]  focus:outline-none "
              to="register"
            >
              Register
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar