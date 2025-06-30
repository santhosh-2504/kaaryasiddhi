"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      {/* Content area, pushed down below Navbar height */}
      <div className="md:ml-64 bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-all duration-300">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
