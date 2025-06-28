'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAllUserErrors, register } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
    matches: false
  });

  const validatePassword = (password, confirmPass) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      matches: password === confirmPass && password !== ""
    });
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !phone || !parentPhone || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (parentPhone.length < 10) {
      toast.error("Please enter a valid parent/guardian phone number");
      return;
    }

    if (phone === parentPhone) {
      toast.error("Your phone number and parent/guardian phone number cannot be the same");
      return;
    }

    if (!Object.values(passwordValidation).every(Boolean)) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    if (!isAgeVerified) {
      toast.error("Please confirm your age verification");
      return;
    }

    if (!isTermsAccepted) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    // Create registration data object instead of FormData
    const registrationData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone,
      parentPhone: parentPhone,
      password: password
    };

    dispatch(register(registrationData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message && isAuthenticated) {
      toast.success(message);
      router.push("/");
    }
  }, [dispatch, error, message, isAuthenticated, router]);

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Limit to 10 digits
    return cleaned.slice(0, 10);
  };

  const PasswordRequirements = () => (
    <div className="text-sm space-y-1 mt-2 text-gray-600 dark:text-gray-400">
      <p className={passwordValidation.minLength ? "text-green-500" : ""}>
        ✓ At least 8 characters
      </p>
      <p className={passwordValidation.hasUpper ? "text-green-500" : ""}>
        ✓ At least one uppercase letter
      </p>
      <p className={passwordValidation.hasLower ? "text-green-500" : ""}>
        ✓ At least one lowercase letter
      </p>
      <p className={passwordValidation.hasNumber ? "text-green-500" : ""}>
        ✓ At least one number
      </p>
      <p className={passwordValidation.hasSpecial ? "text-green-500" : ""}>
        ✓ At least one special character
      </p>
      <p className={passwordValidation.matches ? "text-green-500" : "text-red-500"}>
        {passwordValidation.matches ? "✓ Passwords match" : "✗ Passwords do not match"}
      </p>
    </div>
  );

  return (
    <>
      <div className="mt-5">
        <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
            <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6 mt-20">
              Create a New Account
            </h3>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <FaPencilAlt className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Your Name (minimum 3 characters)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                    maxLength={30}
                  />
                </div>
                {name && name.length < 3 && (
                  <p className="text-red-500 text-xs mt-1">Name must be at least 3 characters</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <MdOutlineMailOutline className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Your Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <FaPhoneFlip className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="1234567890"
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                {phone && phone.length < 10 && (
                  <p className="text-red-500 text-xs mt-1">Phone number must be 10 digits</p>
                )}
              </div>

              {/* Parent Phone Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Parent/Guardian Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <FaUserFriends className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="1234567890"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(formatPhoneNumber(e.target.value))}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                {parentPhone && parentPhone.length < 10 && (
                  <p className="text-red-500 text-xs mt-1">Parent phone number must be 10 digits</p>
                )}
                {phone && parentPhone && phone === parentPhone && (
                  <p className="text-red-500 text-xs mt-1">Parent phone number must be different from your phone number</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  This will be used for emergency contact and account verification
                </p>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <RiLock2Fill className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                    maxLength={32}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700">
                  <RiLock2Fill className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                    maxLength={32}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <PasswordRequirements />

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="age-verify"
                      type="checkbox"
                      checked={isAgeVerified}
                      onChange={(e) => setIsAgeVerified(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600"
                      required
                    />
                  </div>
                  <label htmlFor="age-verify" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    I confirm that I am at least 16 years old <span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={isTermsAccepted}
                      onChange={(e) => setIsTermsAccepted(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    I agree to the{" "}
                    <Link href="/terms" className="text-emerald-600 hover:underline dark:text-emerald-500">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-emerald-600 hover:underline dark:text-emerald-500">
                      Privacy Policy
                    </Link> <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !Object.values(passwordValidation).every(Boolean) || !isAgeVerified || !isTermsAccepted}
                className={`w-full py-2 text-white font-medium rounded-md transition ${
                  loading || !Object.values(passwordValidation).every(Boolean) || !isAgeVerified || !isTermsAccepted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-500 dark:text-emerald-400 hover:underline">
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;