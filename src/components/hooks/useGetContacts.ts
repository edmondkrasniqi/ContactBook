import axios, { AxiosHeaders, AxiosRequestHeaders } from "axios";
import { useQuery } from "react-query";

export const getContacts = async () => {
  const response = await axios.get(
    "https://phoneboook-87eac-default-rtdb.europe-west1.firebasedatabase.app/contactBook.json"
  );
  return response.data;
};

export const useGetContacts = () => {
  return useQuery("contacts", getContacts, {
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
    enabled: true,
    select: (data) => {
      const contacts = Object.entries(data).map(
        ([key, value]: [string, any]) => {
          return { ...value, id: key };
        }
      );
      return contacts;
    },
  });
};
