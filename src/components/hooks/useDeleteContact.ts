import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Contact } from "../../App";

export const deleteContact = async (data: Contact) => {
  return axios.put(
    "https://phoneboook-87eac-default-rtdb.europe-west1.firebasedatabase.app/contactBook.json",
    data
  );
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("contacts");
    },
  });
};
