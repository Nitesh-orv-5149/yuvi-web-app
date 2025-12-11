//note:this file's function is to serve admin
import axios from "axios";

export const getExperts = async () => {
  const res = await axios.get("/api/admin/experts");
  return res.data;
};

export const approveExpert = async (id) => {
  const res = await axios.patch(`/api/admin/experts/${id}`, { isApproved: true });
  return res.data;
};

export const deleteExpert = async (id) => {
  const res = await axios.delete(`/api/admin/experts/${id}`);
  return res.data;
};

