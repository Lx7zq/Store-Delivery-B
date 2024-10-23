import api from "./api";

const STORE_API = import.meta.env.VITE_STORE_API; // URL สำหรับ Store API ที่เก็บไว้ใน environment variable

const getAllStores = async () => {

    return await api.get(STORE_API);
};

const getStoreById = async (id) => {
    return await api.get(`${STORE_API}/${id}`);
};

const insertStore = async (store) => {
    return await api.post(STORE_API, store);
};

const editStore = async (id, store) => {
    return await api.put(`${STORE_API}/${id}`, store);
};

const deleteStore = async (id) => {
    return await api.delete(`${STORE_API}/${id}`);
};

const StoreService = {
    getAllStores,
    getStoreById,
    insertStore,
    editStore,
    deleteStore
};

export default StoreService;
