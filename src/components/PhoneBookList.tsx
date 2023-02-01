import { Link } from "react-router-dom";
import { Contact } from "../App";
type PhoneBookListProps = {
  item: Contact;
  onDeleteClick: (id: string) => void;
};

const PhoneBookList = ({
  item: { name, lastName, address, phone, email, id, country, city },
  onDeleteClick,
}: PhoneBookListProps) => {
  return (
    <tbody className="border-2 even:bg-[#f5f3f4]">
      <tr key={id} className="even:bg-[#e9ecef]">
        <td className=" text-center px-6 py-2 border border-b-2 border-grey ">
          {name}
        </td>
        <td className="text-center px-6 py-2 border border-b-2 border-grey">
          {lastName}
        </td>
        <td className="text-center px-6 py-2 border border-b-2 border-grey">
          {address}
        </td>
        <td className="text-center px-6 py-2 border border-b-2 border-grey">
          {country}
        </td>
        <td className="text-center px-6 py-2 border border-b-2 border-grey">
          {city}
        </td>
        <td className="text-center px-6 py-2  border border-b-2 border-grey">
          <div className="flex flex-col">
            {email &&
              email?.map((item) => (
                <td className="" key={item.id}>
                  {item.value}
                </td>
              ))}
          </div>
        </td>
        <td className="text-center px-6 py-2  border border-b-2 border-grey">
          <div className="flex flex-col">
            {phone &&
              phone?.map((item) => (
                <td key={item.id} className="">
                  {item.value}
                </td>
              ))}
          </div>
        </td>
        <td className=" border border-b-2 border-grey">
          <Link to={`/edit/${id}`}>
            <button className="ml-[25px] px-6 py-2 items-center text-xs text-white bg-[#1c7c54] rounded-md ">
              Edit
            </button>
          </Link>
        </td>
        <td className="border border-b-2 border-grey">
          <button
            className="ml-[25px] px-6 py-2 items-center text-xs text-white bg-red-500 rounded-md hover:bg-red-600"

            onClick={() => onDeleteClick(id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default PhoneBookList;
