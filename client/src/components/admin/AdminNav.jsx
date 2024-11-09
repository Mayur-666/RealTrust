import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/Context.jsx";

function AdminNav() {
  const navigate = useNavigate();

  const { adminState, setAdminState } = useContext(MyContext);

  return (
    <div className="absolute z-20 t top-0 left-0 w-full bg-white flex items-center justify-between mx-auto">
      <div className="w-1/3 py-4 px-14">
        <img
          src="/images/logo.svg"
          alt="logo"
          className="max-w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      {adminState.isAuth && (
        <div className=" w-1/4 py-4 flex lg:w-2/3 items-center justify-end">
          <button
            className="bg-orange-500 text-white rounded-lg py-2 px-10 mr-16 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("adminState");
              setAdminState({
                username: "",
                password: "",
                isAuth: false,
              });
              navigate("/admin-auth");
            }}
          >
            LOGOUT
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminNav;
