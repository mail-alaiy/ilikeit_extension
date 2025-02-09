import { supabase } from "../../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../store/authSlice"; // Removed clearUser
import { useEffect } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader"; // Import Loader
import VideoPlayer from "../components/VideoPlayer";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth); // Access loading state

  useEffect(() => {
    const getUser = async () => {
      dispatch(setLoading(true)); // Set loading to true
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) dispatch(setUser(user));
      dispatch(setLoading(false)); // Set loading to false
    };
    getUser();
  }, [dispatch]);

  const handleLogin = async () => {
    dispatch(setLoading(true)); // Show loader on login attempt
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Login error:", error.message);
      dispatch(setLoading(false)); // Stop loader on error
    }
  };

  if (loading) return <Loader />; // Show loader when loading

  return (
    <>
      <Header />
      <div className="container flex justify-center items-center flex-col py-10">
        {/* Responsive Video Wrapper */}
        <VideoPlayer />
        {/* Sign-in Button */}
        {!user && (
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full max-w-[280px] px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition-all mt-8"
          >
            <img src="/GoogleIcon.svg" alt="Google Logo" className="w-5 h-5" />
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Login;
