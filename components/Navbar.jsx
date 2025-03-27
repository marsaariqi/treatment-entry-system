import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm z-[9999]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-64 p-2 shadow"
          >
            <li>
              <a href="/">Patient</a>
            </li>

            <li>
              <a href="/manage">Manage</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li>
            <a href="/">Patient</a>
          </li>

          <li>
            <a href="/manage">Manage</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/marsaariqi/"
          className="text-secondary hover:scale-105 transition-transform"
        >
          oWo
        </a>
      </div>
    </div>
  );
};

export default Navbar;
