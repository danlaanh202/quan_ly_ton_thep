import axios from "axios";

export const publicRequest = axios.create({
  baseURL: "http://localhost:4000",
});
export const getPeopleWithSearchQuery = async (searchQuery: string) => {
  return await publicRequest.get("/person/get_people", {
    params: {
      ten_khach_hang: searchQuery,
    },
  });
};
