import React from "react";
import { useAuthContext } from "../context/AuthContext"; // Adjust the path as needed
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate

const UserProfile = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate(); // เรียกใช้ useNavigate

  const handleLogout = () => {
    logout();
    navigate("/"); // นำทางกลับไปที่หน้าหลัก
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar button */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            alt="User Profile"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gray-900 text-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
      >
        <li>
          <a
            onClick={handleLogout}
            className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition-colors"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
