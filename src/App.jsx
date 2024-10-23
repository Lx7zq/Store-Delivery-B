import { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import LocationMap from "./component/LocationMap"; // Ensure this path is correct
import StoreService from "./services/store.service";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const base_url = import.meta.env.VITE_API_BASE_URL;

// Define custom icons
const storeIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/plasticine/100/shop.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const houseIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/plasticine/100/exterior.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const selectedStoreIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7877/7877890.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

// Function to calculate distance between 2 points using Haversine Formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; // Earth's radius in meters
  const phi_1 = (lat1 * Math.PI) / 180;
  const phi_2 = (lat2 * Math.PI) / 180;

  const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
  const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
    Math.cos(phi_1) *
      Math.cos(phi_2) *
      Math.sin(delta_lambda / 2) *
      Math.sin(delta_lambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

const App = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const center = [13.838487865712025, 100.02534086066446]; // SE NPRU
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch stores on component mount
  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true); // Start loading
      try {
        const response = await StoreService.getAllStores();
        console.log(response.data);

        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch stores. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    fetchStores();
  }, []);

  const handleEditStore = (id) => {
    // Navigate to the edit store page with the selected store's id
    navigate(`edit-store/${id}`); // Ensure the path matches the router definition
  };

  const handleDeleteStore = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await StoreService.deleteStore(id); // Make sure this method exists in your StoreService
        setStores(stores.filter((store) => store.id !== id)); // Update the state to remove the store
        Swal.fire("Deleted!", "Your store has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting store:", error);
        Swal.fire(
          "Error!",
          "Failed to delete the store. Please try again later.",
          "error"
        );
      }
    }
  };

  const handlerGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          Swal.fire({
            title: "Error!",
            text: "Unable to retrieve your location. Please allow location access.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      );
    } else {
      Swal.fire({
        title: "Error!",
        text: "Geolocation is not supported by this browser.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleLocationCheck = () => {
    if (!myLocation.lat || !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your valid location",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      selectedStore.lat,
      selectedStore.lng
    );

    if (distance <= selectedStore.radius) {
      Swal.fire({
        title: "Success",
        text: "You are within the delivery zone for " + selectedStore.name,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "You are outside the delivery zone for " + selectedStore.name,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      {/* Button Section */}
      <div className="flex justify-center space-x-6 mt-8">
        <button
          className="bg-[#50717b] text-white font-semibold py-2 px-8 rounded-lg shadow-lg hover:bg-[#3a4042] transition-all duration-300 ease-in-out"
          onClick={handlerGetLocation}
        >
          Get My Location
        </button>
        <button
          className="bg-[#50717b] text-white font-semibold py-2 px-8 rounded-lg shadow-lg hover:bg-[#3a4042] transition-all duration-300 ease-in-out"
          onClick={handleLocationCheck}
        >
          Check Delivery Availability
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center mt-4">
          <p className="text-blue-500">Loading stores...</p>
        </div>
      )}

      {/* Map Section */}
      <div className="flex justify-center items-center mt-8 h-[80vh]">
        <div className="w-full max-w-5xl h-full">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg shadow-xl border border-gray-300"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Store Markers */}
            {stores.length > 0 &&
              stores.map((store) => (
                <Marker
                  key={store.id}
                  position={[store.lat, store.lng]}
                  icon={
                    selectedStore && selectedStore.id === store.id
                      ? selectedStoreIcon
                      : storeIcon
                  }
                  eventHandlers={{
                    click: () => {
                      setSelectedStore(store);
                    },
                  }}
                >
                  <Popup className="font-semibold text-gray-900">
                    <b>{store.name}</b>
                    <p>{store.address}</p>
                    <p>Delivery Radius: {store.radius} meters</p>
                    <a
                      href={store.direction}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Direction
                    </a>
                    <div className="flex justify-between mt-2">
                      {store.adminId === userId && ( // Check if adminId matches userId
                        <>
                          <button
                            className="mt-2 bg-green-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
                            onClick={() => handleEditStore(store.id)}
                          >
                            Edit Store
                          </button>
                          <button
                            className="mt-2 bg-red-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out"
                            onClick={() => handleDeleteStore(store.id)} // Ensure this function is defined
                          >
                            Delete Store
                          </button>
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* Selected Store Delivery Radius */}
            {selectedStore && (
              <>
                <Marker
                  position={[selectedStore.lat, selectedStore.lng]}
                  icon={selectedStoreIcon}
                >
                  <Popup className="font-semibold text-gray-900">
                    <b>{selectedStore.name}</b>
                    <p>{selectedStore.address}</p>
                    <p>Delivery Radius: {selectedStore.radius} meters</p>
                  </Popup>
                </Marker>
                <Circle
                  center={[selectedStore.lat, selectedStore.lng]}
                  radius={selectedStore.radius}
                  pathOptions={{
                    color: "#3a4042",
                    fillColor: "#8ecccc",
                    fillOpacity: 0.4,
                  }}
                />
              </>
            )}

            {/* My Location Marker */}
            <LocationMap
              myLocation={myLocation}
              icon={houseIcon}
              onLocationSelect={setMyLocation}
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default App;
