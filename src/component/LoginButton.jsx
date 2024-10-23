import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom

const LoginButton = () => {
  return (
    <Link
      to="/login" // เปลี่ยน href เป็น to และใช้เส้นทางที่ถูกต้อง
      className="inline-block bg-[#2c3e50] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#34495e] focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-opacity-30 transition-colors duration-200"
    >
      Login
    </Link>
  );
};

export default LoginButton;
