"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { clearAllUserErrors } from "@/store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "@/components/dashboard/MyProfile";
import UpdateProfile from "@/components/dashboard/UpdateProfile";
import UpdatePassword from "@/components/dashboard/UpdatePassword";
import FeePayment from "@/components/dashboard/FeePayment";
import Keys from "@/components/dashboard/Keys";
// import DeleteAccount from "@/components/dashboard/DeleteAccount";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");
  // const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [componentName]);

  // const handleLogoutClick = () => {
  //   setShowLogoutModal(true);
  // };

  // const handleLogoutConfirm = () => {
  //   dispatch(logout());
  //   toast.success("Logged out successfully.");
  //   setShowLogoutModal(false);
  // };

  // const handleLogoutCancel = () => {
  //   setShowLogoutModal(false);
  // };

  useEffect(() => {
    if (error && error !== "Internal Server Error") {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [dispatch, error, loading, isAuthenticated, router]);

  return (
    <div>
      <section className="dashboard bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
        <div className="max-w-7xl mx-auto py-14">
          {/* Dashboard Header */}
          <div className="dashboard-header flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p>
              Welcome, <span className="font-medium">{user?.name}</span>!
            </p>
          </div>

          <div className="dashboard-container flex flex-col md:flex-row gap-6">
            {/* Mobile Menu Backdrop */}
            {show && (
              <div
                className="fixed inset-0 bg-black/50 z-30 md:hidden"
                onClick={() => setShow(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={`sidebar fixed md:static inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg md:w-1/4 transform transition-transform duration-300 ease-in-out
                ${show ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
              <ul className="sidebar-links space-y-4 p-6">
                <h4 className="text-lg font-semibold">Manage Account</h4>
                {[
                  { name: "My Profile", component: "My Profile" },
                  { name: "Update Profile", component: "Update Profile" },
                  { name: "Update Password", component: "Update Password" },
                  { name: "Pay Fee", component: "Pay Fee" },
                  { name: "Keys", component: "Keys" },
                ].map(({ name, component }, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setComponentName(component);
                        setShow(false);
                      }}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {name}
                    </button>
                  </li>
                ))}
                {/* <li>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </li> */}
                {/* <li>
                  <button 
                    onClick={() => {
                      setComponentName("Delete Account");
                      setShow(false);
                    }}
                    className="w-full text-left text-red-500 hover:text-red-700"
                  >
                    Delete Account
                  </button>
                </li> */}
              </ul>
            </div>

            {/* Main Content */}
            <div className="content flex-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div
                className="sidebar-toggle md:hidden mb-4 flex justify-end"
                onClick={() => setShow(!show)}
              >
                <LuMoveRight
                  className={`text-2xl cursor-pointer transition-transform ${
                    show ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dynamic Component Rendering */}
              {(() => {
                switch (componentName) {
                  case "My Profile":
                    return <MyProfile />;
                  case "Update Profile":
                    return <UpdateProfile />;
                  case "Update Password":
                    return <UpdatePassword />;
                  case "Pay Fee":
                    return <FeePayment />;
                  case "Keys":
                    return <Keys />;

                  // case "Delete Account":
                  //   return <DeleteAccount />;
                  default:
                    return <MyProfile />;
                }
              })()}
            </div>
          </div>
        </div>

        {/* Logout Confirmation Modal
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
        )} */}
      </section>
    </div>
  );
};

export default Dashboard;
