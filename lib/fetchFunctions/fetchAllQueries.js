import axios from "axios";

export async function fetchAllQueries(q = "") {
  try {
    const url = q ? `/api/queries?q=${encodeURIComponent(q)}` : "/api/queries";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}
