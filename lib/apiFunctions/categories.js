import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get("/api/admin/categories");
  return res.data;
};

export const addCategory = async (data) => {
  return await axios.post("/api/admin/categories", data);
};

export const deleteCategory = async (id) => {
  return await axios.delete(`/api/admin/categories/${id}`);
};


export const updateCategory = async (id, data) => {
  return await fetch(`/api/admin/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};


