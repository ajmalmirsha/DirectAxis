import axios from "axios";

const baseURL = "https://dummyjson.com";

// setup axios base url 
const api = axios.create({ baseURL });


/**
 * Retrieves a list of products based on the provided filters.
 * 
 * @param {*} category - The category to filter products by.
 * @param {*} sort - The sorting criteria for the product list.
 * @param {*} search - The search query to filter products by name or description.
 * @param {*} offset - The number of products to skip for pagination.
 * @param {*} limit - The maximum number of products to retrieve.
 * 
 * @returns {Promise} - A promise that resolves with the list of filtered products.
 */
export const getProductList = async (category, sort, search, offset, limit) => {
  return await api.get(
    `/products${category}${
      search ? `/search?q=${search}&` : "?"
    }skip=${offset}&${sort}limit=${limit}`
  );
};

/**
 * Retrieves a list of product categories.
 * 
 * @returns {Promise} - A promise that resolves with the list of product categories.
 */
export const getCategoryList = async () => {
  return await api.get("/products/category-list");
};
