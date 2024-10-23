import React from "react";
import UserProfile from "./UserProfile";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom"; // นำเข้า Link
import Logo from "../assets/DaliveryZoneLogo.png";

const Navbar = () => {
  const authContext = useAuthContext();
  const { user } = authContext || {}; // ตรวจสอบว่ามี authContext ก่อนการ destructure

  return (
    <div className="navbar bg-[#8ecccc] text-gray-800 shadow-md py-2 px-4">
      <div className="flex-1 flex items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={Logo} // ใช้โลโก้ที่นำเข้า
            alt="DaliveryZone Logo"
            className="w-16 h-16" // ปรับขนาดโลโก้
          />
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#50717b] to-[#3a4042]">
            DaliveryZone
          </span>
        </Link>
      </div>
      <div className="flex-none">
        {/* Add Button - Shown only for Admin or Moderator roles */}
        {(user?.roles?.includes("ROLE_ADMIN") ||
          user?.roles?.includes("ROLE_MODERATOR")) && (
          <div className="flex space-x-4">
            <Link
              to="add"
              className="btn bg-[#50717b] text-white hover:bg-[#3a4042] transition duration-300"
            >
              Add
            </Link>
          </div>
        )}
      </div>
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-semibold text-lg">
                Welcome,{" "}
                <span className="text-black font-bold">{user.username}</span>
              </span>
              <div className="flex items-center space-x-2">
                {user.roles.map((role, index) => (
                  <div
                    key={index}
                    className="badge badge-accent text-xs bg-[#3a4042] text-white"
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>
            <UserProfile />
          </>
        ) : (
          <div className="space-x-4">
            <RegisterButton />
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
