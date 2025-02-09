import { useSelector } from "react-redux";
import TryOn from "./pages/PopUpFlow/TryOn";
import Login from "./pages/Login";

const PopUpContent = () => {
  const { user, loading } = useSelector((state) => state.auth); // Add loading state

  return (
    <div className="min-w-[400px] min-h-[600px]">
      <div>{user ? <TryOn /> : <Login />}</div>;
    </div>
  );
};

export default PopUpContent;
