import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/authSlice";
import SecondaryButton from "./SecondaryButton";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(clearUser()); // Clear Redux state
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.remove("user", () => {
        console.log("User removed from Chrome storage");
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="container divContainer py-4 flex justify-between items-center">
        <h1 className="font-semibold text-xl sm:text-2xl">I❤️It.ai</h1>
        {user && (
          <div className="flex gap-4">
            <SecondaryButton
              className="px-4 py-2"
              onClick={handleLogout}
              title="Logout"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
