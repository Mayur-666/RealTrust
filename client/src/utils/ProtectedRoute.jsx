import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MyContext } from "../utils/Context";

const ProtectedRoute = () => {
  const { adminState, setAdminState } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdminState = localStorage.getItem("adminState");
    if (storedAdminState) {
      setAdminState(JSON.parse(storedAdminState));
    }
    setLoading(false);
  }, [setAdminState]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return adminState && adminState.isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-auth" />
  );
};

export default ProtectedRoute;
