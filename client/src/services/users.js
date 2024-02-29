import axios from "axios";
const URL = "http://localhost:5001/users";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Fetch all users error:", error.message);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${URL}/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Update user error:", error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.status === 204 ? null : response.data;
  } catch (error) {
    console.error("Delete user error:", error.message);
    throw error;
  }
};
