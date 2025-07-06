"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  const pathname = usePathname();

  // Hide navbar on exact /practice or anything under /problems
  const shouldHideNavbar =
    pathname === "/practice" || pathname === "/dashboard" || pathname === "/submissions" || pathname === "/admin"|| pathname.startsWith("/problems");

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <div
        className={`${
          shouldHideNavbar ? "" : "md:ml-64"
        } bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-all duration-300`}
      >
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

