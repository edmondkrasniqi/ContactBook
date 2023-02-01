import { Link } from "react-router-dom";
import { useDeleteContact } from "./components/hooks/useDeleteContact";
import { useGetContacts } from "./components/hooks/useGetContacts";
import PhoneBookLabels from "./components/PhoneBookLabels";
import PhoneBookList from "./components/PhoneBookList";
import { queryClient } from "./main";
export type Contact = {
  name: string;
  lastName: string;
  address: string;
  phone: [{ id: string; value: string }];
  email: [{ id: string; value: string }];
  id: string;
  country: string;
  city: string;
};

function App() {
  const { data, isLoading, refetch } = useGetContacts();
  const { mutate } = useDeleteContact()
  const handleDeleteContact = async (id: string) => {
    const dataUpdated = data?.filter((item) => item.id !== id);




    mutate(dataUpdated as any, {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts");
        refetch();
      },
    });

  };


  return (
    <>
      <div className="p-[9px] text-[25px] bg-black text-white">PhoneBook</div>
      <div className="flex flex-col max-w-[1400px]  mx-auto mt-20">
        <div className="mb-[70px] flex items-center justify-between">
          <h3 className="font-bold text-[25px]">Contacts</h3>
          <Link
            to={"addContact"}
            className="bg-[#0466c8] text-white w-30 mb-4 right-0 p-1 border-1 rounded-md self-end"
          >
            Add Contact
          </Link>
        </div>

        <table className="table-auto border-2 border-gray-500">
          <PhoneBookLabels />
          {data ? (
            data?.map((item: Contact) => (
              <PhoneBookList
                key={item.id}
                item={item}
                onDeleteClick={() => handleDeleteContact(item.id)}
              />
            ))
          ) : (
            <tbody>
              <tr>
                <td>No data found, please add some...</td>
              </tr>
            </tbody>
          )}
          {isLoading && (
            <tbody>
              <tr>
                <td>Loading...</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default App;
