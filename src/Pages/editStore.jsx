import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoreService from "../services/store.service"; // นำเข้า StoreService
import Swal from "sweetalert2";

const EditStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState({
    name: "",
    address: "",
    radius: 0,
    direction: "",
    lat: 0,
    lng: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreDetail = async () => {
      try {
        const response = await StoreService.getStoreById(id);
        setStore(response.data);
      } catch (error) {
        setError("Error fetching store details.");
        console.error("Error fetching store details:", error);
      }
    };

    fetchStoreDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevStore) => ({ ...prevStore, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await StoreService.editStore(id, store);
      Swal.fire("Success!", "Store details have been updated.", "success").then(
        () => {
          navigate(`/`); // นำทางกลับไปที่หน้ารายละเอียดของร้าน
        }
      );
    } catch (error) {
      Swal.fire("Error!", "Error updating store: " + error.message, "error");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Store
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700">Store Name</label>
          <input
            type="text"
            name="name"
            value={store.name}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={store.address}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Delivery Radius (meters)
          </label>
          <input
            type="number"
            name="radius"
            value={store.radius}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Direction Link</label>
          <input
            type="url"
            name="direction"
            value={store.direction}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Latitude</label>
          <input
            type="number"
            name="lat"
            value={store.lat}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Longitude</label>
          <input
            type="number"
            name="lng"
            value={store.lng}
            onChange={handleChange}
            className="input border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Update Store
        </button>
      </form>
    </div>
  );
};

export default EditStore;
