import { useSelector } from "react-redux";
import Login from "./pages/Login";
import ImageUploadPage from "./pages/TabFlow/ImageUploadPage";

const TabContent = () => {
  const { user, loading } = useSelector((state) => state.auth); // Add loading state

  return <div>{user ? <ImageUploadPage /> : <Login /> }</div>;
};

export default TabContent;
