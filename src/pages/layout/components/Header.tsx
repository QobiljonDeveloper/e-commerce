import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { useSelector } from "react-redux";
import type { RootState } from "../../../lib";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.value.length
  );
  const cartCount = useSelector((state: RootState) => state.cart.value.length);

  // DRY uslubda nav linklar
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  return (
    <section className="h-auto md:h-[60px] border-b border-gray-200">
      <div className="container mx-auto h-full">
        <div className="h-full flex flex-row justify-between items-center py-2 md:py-0">
          {/* Left side: menu button (mobile) + logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>

            <Link to={"/"}>
              <img src={logo} alt="Logo" className="w-[100px] md:w-auto" />
            </Link>
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-6 text-[#6C7275] text-sm md:text-base">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-black underline"
                      : "hover:underline"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop icons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>

            {/* Account */}
            <NavLink to="/account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-user-round"
              >
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </NavLink>

            {/* Wishlist */}
            <NavLink to="/wishlist" className="flex relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart"
              >
                <path d="M19 14c-1.5 2-3.5 3.5-7 6-3.5-2.5-5.5-4-7-6a5 5 0 0 1 7-7 5 5 0 0 1 7 7z" />
              </svg>
              {wishlistCount > 0 && (
                <div className="absolute -top-2 -right-2 w-[20px] h-[20px] grid place-items-center text-xs rounded-full bg-black text-white">
                  {wishlistCount}
                </div>
              )}
            </NavLink>

            {/* Cart */}
            <NavLink to="/cart" className="flex relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-handbag"
              >
                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                <path d="M8 11V6a4 4 0 0 1 8 0v5" />
              </svg>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 w-[20px] h-[20px] grid place-items-center text-xs rounded-full bg-black text-white">
                  {cartCount}
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile sidebar nav */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="mb-6 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className="flex flex-col gap-4 text-sm text-[#6C7275]">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-2 md:hidden z-50">
        {/* Search */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>

        {/* Account */}
        <NavLink to="/account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-user-round"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </NavLink>

        {/* Wishlist */}
        <NavLink to="/wishlist" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart"
          >
            <path d="M19 14c-1.5 2-3.5 3.5-7 6-3.5-2.5-5.5-4-7-6a5 5 0 0 1 7-7 5 5 0 0 1 7 7z" />
          </svg>
          {wishlistCount > 0 && (
            <div className="absolute -top-1 -right-2 w-5 h-5 grid place-items-center text-xs rounded-full bg-black text-white">
              {wishlistCount}
            </div>
          )}
        </NavLink>

        {/* Cart */}
        <NavLink to="/cart" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-handbag"
          >
            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
            <path d="M8 11V6a4 4 0 0 1 8 0v5" />
          </svg>
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-2 w-5 h-5 grid place-items-center text-xs rounded-full bg-black text-white">
              {cartCount}
            </div>
          )}
        </NavLink>
      </div>
    </section>
  );
};

export default Header;
