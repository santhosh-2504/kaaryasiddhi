import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSun, FaMoon, FaFire } from "react-icons/fa";
import { useTheme } from "@/store/context/ThemeContext";
import { logout, clearAllUserErrors } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLinkClick = () => {
    setShow(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    setShowLogoutModal(false);
    setShow(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // Function to check if current route matches the link
  const isActiveRoute = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  // Navigation links configuration
  const navigationLinks = [
    { href: "/", label: "HOME" },
    { href: "/path", label: "GROWTH ROADMAP" },
    { href: "/resources", label: "RESOURCES" },
  ];

  const authenticatedLinks = [
    { href: "/practice", label: "PRACTICE" },
    { href: "/dashboard", label: "PROFILE" },
  ];

  const adminLinks = [
    { href: "/admin", label: "ADMIN OVERVIEW" },
    { href: "/submissions", label: "SUBMISSIONS" },
    { href: "/payments", label: "PAYMENTS" },
  ];

  const NavLink = ({ href, children, mobile = false }) => {
    const isActive = isActiveRoute(href);
    const baseClasses = mobile
      ? "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
      : "px-3 py-2 rounded-md transition-all duration-200 font-medium";

    const activeClasses = mobile
      ? "bg-emerald-600 text-white shadow-md"
      : "bg-emerald-600 text-white shadow-md";

    const inactiveClasses = mobile
      ? "text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300"
      : "text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300";

    return (
      <Link
        href={href}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        onClick={handleLinkClick}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav
        className={`md:hidden fixed w-full top-0 z-50 bg-gradient-to-r from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 
        ${show ? "h-screen" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center" aria-label="Home">
                <img
                  src="/images/logo (2).png"
                  alt="Website logo"
                  className="h-8 w-auto dark:invert"
                />
              </Link>
            </div>

            {/* Right Side: Theme Toggle Button, Streak Icon, and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Streak Icon - Only show when authenticated */}
              {isAuthenticated && (
                <div className="flex items-center space-x-1 text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-800/70 px-3 py-1 rounded-full shadow-sm">
                  <FaFire
                    className="w-4 h-4 text-orange-500"
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm font-medium"
                    aria-label={`Current streak: ${user.streak} days`}
                  >
                    {user.streak}
                  </span>
                </div>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200"
                aria-label={
                  theme ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {theme ? (
                  <FaSun
                    className="w-5 h-5 text-yellow-500"
                    aria-hidden="true"
                  />
                ) : (
                  <FaMoon
                    className="w-5 h-5 text-slate-600"
                    aria-hidden="true"
                  />
                )}
              </button>
              <button
                onClick={() => setShow(!show)}
                className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                aria-label="Toggle navigation menu"
                aria-expanded={show}
                aria-controls="mobile-menu"
              >
                <GiHamburgerMenu
                  className="w-6 h-6 text-slate-700 dark:text-slate-200"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`${show ? "block" : "hidden"}`}
            id="mobile-menu"
            role="region"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-2 px-2 pt-2 pb-3">
              {navigationLinks.map((link) => (
                <NavLink key={link.href} href={link.href} mobile>
                  {link.label}
                </NavLink>
              ))}

              {isAuthenticated && user.role === "admin" && (
                <>
                  {adminLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              {isAuthenticated ? (
                <>
                  {authenticatedLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      {link.label}
                    </NavLink>
                  ))}
                </>
              ) : (
                <NavLink href="/login" mobile>
                  LOGIN
                </NavLink>
              )}

              {/* Mobile Logout Button */}
              {isAuthenticated && (
                <button
                  onClick={handleLogoutClick}
                  className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                >
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Confirm Logout
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Are you sure you want to log out? You will need to sign in again
                to access your account.
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleLogoutCancel}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Vertical Sidebar */}
      <div className="hidden md:block">
        {/* Sidebar */}
        <nav
          className="fixed left-0 top-0 h-full bg-gradient-to-b from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out z-50"
          role="navigation"
          aria-label="Desktop navigation"
        >
          <div className="w-64 h-full flex flex-col">
            {/* Header Section with Logo, Streak, and Theme Toggle */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              {/* <Link href="/" className="flex items-center mb-4" aria-label="Home" onClick={handleLinkClick}>
                <img 
                  src="/images/logo (2).png" 
                  alt="Website logo" 
                  className="h-8 w-auto dark:invert"
                />
              </Link> */}

              {/* Streak and Theme Toggle Row */}
              <div className="flex items-center justify-between">
                {/* Streak Display */}
                {isAuthenticated && (
                  <div className="flex items-center space-x-1 text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-800/70 px-3 py-1 rounded-full shadow-sm">
                    <FaFire
                      className="w-4 h-4 text-orange-500"
                      aria-hidden="true"
                    />
                    <span
                      className="text-sm font-medium"
                      aria-label={`Current streak: ${user.streak} days`}
                    >
                      {user.streak}
                    </span>
                  </div>
                )}

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200"
                  aria-label={
                    theme ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {theme ? (
                    <FaSun
                      className="w-4 h-4 text-yellow-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaMoon
                      className="w-4 h-4 text-slate-600 dark:text-slate-300"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4">
              <div className="flex flex-col space-y-1 px-3">
                {navigationLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}

                {isAuthenticated && user.role === "admin" && (
                  <>
                    {adminLinks.map((link) => (
                      <NavLink key={link.href} href={link.href}>
                        {link.label}
                      </NavLink>
                    ))}
                  </>
                )}

                {isAuthenticated ? (
                  <>
                    {authenticatedLinks.map((link) => (
                      <NavLink key={link.href} href={link.href}>
                        {link.label}
                      </NavLink>
                    ))}
                  </>
                ) : (
                  <NavLink href="/login">LOGIN</NavLink>
                )}
              </div>
            </div>

            {/* Bottom Section with Logout (if authenticated) */}
            {isAuthenticated && (
              <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleLogoutClick}
                  className="w-full px-3 py-2 text-emerald-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 font-medium"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
