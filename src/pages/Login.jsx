import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import Loader from "../components/Loader"; // Import Loader
import VideoPlayer from "../components/VideoPlayer";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth); // Access loading state

  if (loading) return <Loader />; // Show loader when loading

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col py-6 px-2">
        {/* Responsive Video Wrapper */}
        <VideoPlayer />
        {/* Sign-in Button */}
        {/* {!user && (
          <button
            // onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full max-w-[280px] px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition-all mt-8"
          >
            <img src="/GoogleIcon.svg" alt="Google Logo" className="w-5 h-5" />
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>
        )} */}
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
