import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Contact } from "../../App";

export const createContact = async (data: Contact) => {
  return axios.post(
    "https://phoneboook-87eac-default-rtdb.europe-west1.firebasedatabase.app/contactBook.json",
    data
  );
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(createContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("createContact");
    },
  });
};
