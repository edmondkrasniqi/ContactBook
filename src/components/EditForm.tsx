import axios from "axios";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Contact } from "../App";
import { useUpdateContact } from "./hooks/useUpdateContact";
// import { useGetContact } from "./hooks/useGetContact";
import { useGetContacts } from "./hooks/useGetContacts";

export const EditForm = () => {
  const { id } = useParams();
  const { data } = useGetContacts();
  const { mutate } = useUpdateContact();






  const addPhone = () => {
    formik.setFieldValue("phone", [
      ...formik.values.phone,
      {
        id: Math.random().toString(),
        value: "",
      },
    ]);
  };
  const addEmail = () => {
    formik.setFieldValue("email", [
      ...formik.values.email,
      {
        id: Math.random().toString(),
        value: "",
      },
    ]);
  };

  const contact = data?.find((item: Contact) => item.id === id);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: contact?.name || "",
      lastName: contact?.lastName || "",
      address: contact?.address || "",
      phone: contact?.phone || [],
      email: contact?.email || [],
      id: contact?.id || "",
      country: contact?.country || "",
      city: contact?.city || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // const dataToSend = { [values.id]: { ...values } };
      mutate(values as any)
      navigate("/");
    },
  });



  const { values, handleChange, handleSubmit, } = formik;
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
      <div>
        <h3 className="text-[25px] mb-[15px] font-bold">Edit Contact</h3>
      </div>
      <label
        htmlFor="name"
        className="block text-gray-700  font-bold mb-2  "

      >
        Name:
      </label>
      <div className="flex flex-col gap-2  justify-center items-start">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter the Name"
          onChange={handleChange}
          value={values.name}
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-bold font-bold mb-2"
        >
          Last Name:
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter Last Name"
          onChange={handleChange}
          value={values.lastName}
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label
          htmlFor="address"
          className="block text-gray-700 font-bold mb-2"
        >
          Address:
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Enter Address"
          onChange={handleChange}
          value={values.address}
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
          City:
        </label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Enter City"
          onChange={handleChange}
          value={values.city}
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label
          htmlFor="country"
          className="block text-gray-700 font-bold mb-2"
        >
          Country:
        </label>
        <input
          id="country"
          name="country"
          type="text"
          placeholder="Enter Country"
          onChange={handleChange}
          value={values.country}
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
      </div>
      <div className="flex flex-row justify-center  items-center gap-2">
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          {values.email.map((item: any, index: number) => (
            <input
              id={item.id}
              name={`email[${index}]`}
              type="text"
              placeholder="Enter the Email"
              onChange={(e) =>
                formik.setFieldValue(`email[${index}]`, {
                  id: item.id,
                  value: e.target.value,
                })}
              value={item.value} // here i have error  ts(2322) Type 'string | number | readonly string[] | undefined' is not assignable to type 'string'.  Type 'number' is not assignable to type 'string'.  Type 'readonly string[]' is not assignable to type 'string'.  Type 'undefined' is not assignable to type 'string'. value={values.email}
              className="border border-gray-400 p-2 rounded-lg w-full"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={addEmail}
          className="bg-blue-400 text-white h-10 mt-10 border-1 rounded-md p-2"
        >
          Add
        </button>
      </div>
      <div className="flex flex-row justify-center  items-center gap-2">
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Number:
          </label>
          {values.phone.map((item: any, index: number) => (
            <input
              id={item.id}
              name={`phone[${index}]`}
              type="text"
              placeholder="Enter the Number"
              onChange={(e) =>
                formik.setFieldValue(`phone[${index}]`, {
                  id: item.id,
                  value: e.target.value,
                })}
              value={item.value} // here i have error  ts(2322) Type 'string | number | readonly string[] | undefined' is not assignable to type 'string'.  Type 'number' is not assignable to type 'string'.  Type 'readonly string[]' is not assignable to type 'string'.  Type 'undefined' is not assignable to type 'string'. value={values.phone}
              className="border border-gray-400 p-2 rounded-lg w-full"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={addPhone}
          className="bg-blue-400 text-white h-10 mt-10 border-1 rounded-md p-2"
        >
          Add
        </button>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-6 rounded-lg hover:bg-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
