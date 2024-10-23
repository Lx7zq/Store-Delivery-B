import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await AuthService.login(user.username, user.password);
      if (currentUser.status === 200) {
        login(currentUser.data);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        });
        setUser({
          username: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-darkBlue to-blue-900">
      <div className="w-full max-w-lg bg-darkBlue text-gold p-12 rounded-2xl shadow-2xl border border-gold">
        <h2 className="text-4xl font-extrabold mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gold text-lg font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-4 border border-gray-300 rounded-lg text-black focus:border-gold focus:ring-2 focus:ring-gold transition-all duration-300"
              required
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gold text-lg font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-4 border border-gray-300 rounded-lg text-black focus:border-gold focus:ring-2 focus:ring-gold transition-all duration-300"
              required
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gold text-darkBlue p-4 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-darkBlue text-gold p-4 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkBlue"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
