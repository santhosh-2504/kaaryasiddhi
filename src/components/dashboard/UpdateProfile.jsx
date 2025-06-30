import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "@/store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "@/store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile,
  );
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleUpdateProfile = () => {
    const formData = {
      name,
      email,
      phone,
    };

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error && error !== "Internal Server Error") {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());

      setName(user?.name || "");
      setPhone(user?.phone || "");
    }
  }, [dispatch, error, isUpdated, user]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Update Profile
      </h3>

      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            readOnly
            disabled
            className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white cursor-not-allowed opacity-75"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Email cannot be changed
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200">
            Phone Number
          </label>
          <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setPhone(value);
            }}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                   rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                     text-white rounded-md transition-colors duration-200 disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
