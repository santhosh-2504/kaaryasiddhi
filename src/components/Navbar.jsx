import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSun, FaMoon, FaFire } from "react-icons/fa";
import { useTheme } from "@/store/context/ThemeContext";
import { logout, clearAllUserErrors } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLinkClick = () => {
    setSidebarVisible(false);
    setShow(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    setShowLogoutModal(false);
    setSidebarVisible(false);
    setShow(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Mobile Navigation Bar - Unchanged */}
      <nav 
        className={`md:hidden fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-200 
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
                <div className="flex items-center space-x-1 text-gray-800 dark:text-gray-100">
                  <FaFire className="w-5 h-5 text-orange-500" aria-hidden="true" />
                  <span className="text-sm font-medium" aria-label={`Current streak: ${user.streak} days`}>
                    {user.streak}
                  </span>
                </div>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label={theme ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme ? (
                  <FaSun className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                ) : (
                  <FaMoon className="w-5 h-5 text-gray-700" aria-hidden="true" />
                )}
              </button>
              <button
                onClick={() => setShow(!show)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle navigation menu"
                aria-expanded={show}
                aria-controls="mobile-menu"
              >
                <GiHamburgerMenu className="w-6 h-6 text-gray-700 dark:text-gray-100" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div 
            className={`${show ? 'block' : 'hidden'}`}
            id="mobile-menu"
            role="region"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-4 px-2 pt-2 pb-3">
              <Link 
                href="/" 
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                onClick={handleLinkClick}
              >
                HOME
              </Link>
              <Link
                href="/path"
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                onClick={handleLinkClick}
              >
                GROWTH ROADMAP
              </Link>
              <Link 
                href="/resources"
                className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                onClick={handleLinkClick}
              >
                RESOURCES
              </Link>

              {isAuthenticated && user.role === "admin" && (
                <>
                  <Link
                    href="/admin"
                    className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                    onClick={handleLinkClick}
                  >
                    ADMIN OVERVIEW
                  </Link>
                  <Link
                    href="/submissions"
                    className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                    onClick={handleLinkClick}
                  >
                    SUBMISSIONS
                  </Link>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/practice"
                    className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                    onClick={handleLinkClick}
                  >
                    PRACTICE
                  </Link>
                  <Link 
                    href="/dashboard"
                    className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                    onClick={handleLinkClick}
                  >
                    DASHBOARD
                  </Link>
                </>
              ) : (
                <Link 
                  href="/login"   
                  className="text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                  onClick={handleLinkClick}
                >
                  LOGIN
                </Link>
              )}

              {/* Mobile Logout Button */}
              {isAuthenticated && (
                <button
                  onClick={handleLogoutClick}
                  className="text-red-500 hover:text-red-700"
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Confirm Logout
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to log out? You will need to sign in again to access your account.
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleLogoutCancel}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
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
        {/* Hover trigger area */}
        <div 
          className="fixed left-0 top-0 w-4 h-full z-40"
          onMouseEnter={() => setSidebarVisible(true)}
        />
        
        {/* Sidebar */}
        <nav
          className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out z-50 
          ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
          onMouseLeave={() => setSidebarVisible(false)}
          role="navigation"
          aria-label="Desktop navigation"
        >
          <div className="w-64 h-full flex flex-col">
            {/* Header Section with Logo, Streak, and Theme Toggle */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
                  <div className="flex items-center space-x-1 text-gray-800 dark:text-gray-100">
                    <FaFire className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <span className="text-sm font-medium" aria-label={`Current streak: ${user.streak} days`}>
                      {user.streak}
                    </span>
                  </div>
                )}
                
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label={theme ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme ? (
                    <FaSun className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                  ) : (
                    <FaMoon className="w-4 h-4 text-gray-700 dark:text-gray-100" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4">
              <div className="flex flex-col space-y-1 px-3">
                <Link 
                  href="/" 
                  className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  HOME
                </Link>
                <Link
                  href="/path"
                  className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  GROWTH ROADMAP
                </Link>
                <Link
                  href="/resources"
                  className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  RESOURCES
                </Link>
              
                {isAuthenticated && user.role === "admin" && (
                  <>
                    <Link
                      href="/admin"
                      className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      ADMIN OVERVIEW
                    </Link>
                    <Link
                      href="/submissions"
                      className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      SUBMISSIONS
                    </Link>
                  </>
                )}
                
                {isAuthenticated ? (
                  <>
                    <Link 
                      href="/practice"
                      className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      PRACTICE
                    </Link>
                    <Link 
                      href="/dashboard"
                      className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      DASHBOARD
                    </Link>
                  </>
                ) : (
                  <Link 
                    href="/login"
                    className="px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    LOGIN
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom Section with Logout (if authenticated) */}
            {isAuthenticated && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogoutClick}
                  className="w-full px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
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