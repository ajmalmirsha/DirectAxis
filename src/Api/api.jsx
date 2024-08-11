import axios from "axios";

const api = axios.create({ baseURL: "https://fakestoreapi.com" });

export const getProductList = async (category, sort, limit) => {
  return await api.get(`/products/${category}?sort=${sort}&limit=${limit}`);
};

export const getCategoryList = async () => {
    return await api.get("/products/categories");
  };


