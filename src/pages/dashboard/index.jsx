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
// import FeePayment from "@/components/dashboard/FeePayment";
import Keys from "@/components/dashboard/Keys";
import Github from "@/components/dashboard/Github";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [componentName]);

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
                  // { name: "Pay Fee", component: "Pay Fee" },
                  { name: "Keys", component: "Keys" },
                  { name: "GitHub", component: "GitHub" },
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
                  // case "Pay Fee":
                  //   return <FeePayment />;
                  case "Keys":
                    return <Keys />;
                  case "GitHub":
                    return <Github />;

                  // case "Delete Account":
                  //   return <DeleteAccount />;
                  default:
                    return <MyProfile />;
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
