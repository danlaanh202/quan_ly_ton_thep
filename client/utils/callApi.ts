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
export const getInvoices = async () => {
  return await publicRequest.get("/invoice/get");
};

export const getInvoicesById = async (id: string) => {
  return await publicRequest.get("/invoice/get_by_person_id", {
    params: {
      khach_hang_id: id,
    },
  });
};

export const getPeople = async () => {
  return await publicRequest.get("/person/get");
};
