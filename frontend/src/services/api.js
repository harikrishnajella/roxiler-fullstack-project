const API_BASE_URL = "https://roxiler-fullstack-project-backend.onrender.com/api";

/**
 * Fetches all registered stores from the API.
 * @returns {Promise<Array>} A list of stores.
 */
export const fetchStores = async () => {
  const response = await fetch(`${API_BASE_URL}/stores`);
  return response.json();
};

/**
 * Fetches store details by ID.
 * @param {string} storeId - The ID of the store.
 * @returns {Promise<Object>} The store details.
 */
export const fetchStoreDetails = async (storeId) => {
  const response = await fetch(`${API_BASE_URL}/stores/${storeId}`);
  return response.json();
};

/**
 * Fetches user profile details by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The user details.
 */
// export const fetchUserProfile = async (userId) => {
//   console.log("userId", userId)
//   const response = await fetch(`${API_BASE_URL}/users/${userId}`);
//   return response.json();
// };

/**
 * Submits a rating for a store.
 * @param {string} storeId - The ID of the store.
 * @param {number} rating - The rating value (1-5).
 * @param {string} userId - The ID of the user submitting the rating.
 * @returns {Promise<Object>} The response from the API.
 */
export const submitRating = async (storeId, rating, userId) => {
  const response = await fetch(`${API_BASE_URL}/ratings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ storeId, rating, userId }),
  });
  return response.json();
};

/**
 * Fetches all ratings for a given store.
 * @param {string} storeId - The ID of the store.
 * @returns {Promise<Array>} A list of ratings for the store.
 */
export const fetchStoreRatings = async (storeId) => {
  const response = await fetch(`${API_BASE_URL}/ratings?storeId=${storeId}`);
  return response.json();
};

/**
 * Logs in a user and returns authentication data.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The authentication response.
 */
// export const loginUser = async (email, password) => {
//   const response = await fetch(`${API_BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return response.json();
// };

/**
 * Registers a new user.
 * @param {Object} userData - The user registration data.
 * @returns {Promise<Object>} The registration response.
 */
// export const registerUser = async (userData) => {
//   const response = await fetch(`${API_BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return response.json();
// };
