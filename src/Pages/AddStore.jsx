import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreService from "../services/store.service"; // นำเข้า StoreService
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2"; // นำเข้า SweetAlert

const AddStore = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [store, setStore] = useState({
    name: "",
    address: "",
    direction: "",
    lat: "",
    lng: "",
    radius: "",
    adminId: user?.id || "",
  });

  const [error, setError] = useState(""); // สำหรับเก็บข้อความข้อผิดพลาด

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await StoreService.insertStore(store); // เรียกใช้ insertStore จาก StoreService

      // แสดง SweetAlert เมื่อสร้างร้านค้าสำเร็จ
      await Swal.fire({
        title: "Success!",
        text: "Store added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าร้านค้าหลังจากสร้างสำเร็จ
    } catch (error) {
      console.error("Error adding store:", error);
      setError("Error adding store. Please try again."); // แสดงข้อความข้อผิดพลาด

      // แสดง SweetAlert เมื่อเกิดข้อผิดพลาด
      Swal.fire({
        title: "Error!",
        text: "Failed to add store. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Store
      </h1>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}{" "}
      {/* แสดงข้อความข้อผิดพลาด */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Store Name
          </label>
          <input
            type="text"
            name="name"
            value={store.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            placeholder="Enter store name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={store.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            placeholder="Enter store address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Direction Link
          </label>
          <input
            type="url"
            name="direction"
            value={store.direction}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            placeholder="Enter direction URL"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              name="lat"
              value={store.lat}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
              placeholder="Enter latitude"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              name="lng"
              value={store.lng}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
              placeholder="Enter longitude"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Radius (meters)
          </label>
          <input
            type="number"
            name="radius"
            value={store.radius}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 p-2"
            placeholder="Enter delivery radius"
          />
        </div>
        <button
          type="submit"
          className="bg-[#50717b] w-full text-white font-semibold py-2 px-8 rounded-lg shadow-lg hover:bg-[#3a4042] transition-all duration-300 ease-in-out"
        >
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStore;
