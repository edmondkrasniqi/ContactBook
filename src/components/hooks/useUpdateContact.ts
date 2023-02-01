import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Contact } from "../../App";

export const updateContact = async (data: Contact) => {
  return axios.patch(
    "https://phoneboook-87eac-default-rtdb.europe-west1.firebasedatabase.app/contactBook.json",
    { [data.id]: { ...data } }
  );
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(updateContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("contacts");
    },
  });
};
