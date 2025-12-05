import axios from "axios";

export async function fetchAllQueries({
 q = "",
 categoryId = "",
 page = 1,
 limit = 10,
} = {}) {
 try {
  const url = `/api/queries`;
  
  const res = await axios.get(url, {
   params: {
    q,
    categoryId,
    page,
    limit,
   },
  });

  console.log("FINAL API URL = ", res.config.url, res.config.params);

  return res.data.data;
 } catch (error) {
  console.error("Error fetching queries:", error);
  return [];
 }
}