import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../supabaseClient";
import { clearUser } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(clearUser()); // Clear Redux state
  };

  return (
    <div className="bg-black flex justify-between items-center px-4 py-4 shadow-md drop-shadow-md">
      <div className="container flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-white">DL</h1>
        {user && ( // Show Carousel & Compare buttons only when logged in
          <div className="flex">
            <button className="text-sm bg-white p-2 rounded-l-full border-r-1">
              Carousel
            </button>
            <button className="text-sm bg-white p-2 rounded-r-full">
              Compare
            </button>
          </div>
        )}
        {user && ( // Show logout button only when logged in
          <button
            className="bg-white text-black px-4 py-2 border border-black rounded-full shadow-md hover:bg-gray-200 transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
