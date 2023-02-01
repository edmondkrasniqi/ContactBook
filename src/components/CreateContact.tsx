import { useFormik } from "formik";
import { useCreateContact } from "./hooks/useCreateContact";
import * as Yup from "yup";
import cs from "classnames";
import { Contact } from "../App";
import { redirect, useNavigate } from "react-router-dom";

const CreateContact = () => {
  const { mutate } = useCreateContact();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    // phone: Yup.array().of(
    //   Yup.object().shape({
    //     id: Yup.string().required("Phone is required"),
    //     value: Yup.string().required("Phone is required"),
    //   })
    // ),
    // email: Yup.array().of(
    //   Yup.object().shape({
    //     id: Yup.string().required("Email is required"),
    //     value: Yup.string()
    //       .email("Invalid email")
    //       .required("Email is required"),
    //   })
    // ),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      address: "",
      phone: [
        {
          id: Math.random().toString(),
          value: "",
        },
      ],
      email: [
        {
          id: Math.random().toFixed(),
          value: "",
        },
      ],
      id: Math.random().toString(),
      country: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values as Contact, {
        onSuccess: () => {
          formik.resetForm();
          navigate("/");
        },
      });
    },
  });

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

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg">
      <div>
        <h3 className="text-[25px] mb-[15px] font-bold">Register New Contact</h3>
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2" >
          Name:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter the Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className={cs("border border-gray-400 p-2 rounded-lg w-full", {
            "border-red-500": formik.errors.name && formik.touched.name,
          })}
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-medium mb-2"
        >
          Last Name:
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter Last Name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className={cs("border border-gray-400 p-2 rounded-lg w-full", {
            "border-red-500": formik.errors.lastName && formik.touched.lastName,
          })}
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label
          htmlFor="address"
          className="block text-gray-700 font-medium mb-2"
        >
          Address:
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Enter Address"
          onChange={formik.handleChange}
          value={formik.values.address}
          className={cs("border border-gray-400 p-2 rounded-lg w-full", {
            "border-red-500": formik.errors.address && formik.touched.address,
          })}
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
          City:
        </label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Enter City"
          onChange={formik.handleChange}
          value={formik.values.city}
          className={cs("border border-gray-400 p-2 rounded-lg w-full", {
            "border-red-500": formik.errors.city && formik.touched.city,
          })}
        />
      </div>
      <div className="flex flex-col gap-2  justify-center items-start">
        <label
          htmlFor="country"
          className="block text-gray-700 font-medium mb-2"
        >
          Country:
        </label>
        <input
          id="country"
          name="country"
          type="text"
          placeholder="Enter Country"
          onChange={formik.handleChange}
          value={formik.values.country}
          className={cs("border border-gray-400 p-2 rounded-lg w-full", {
            "border-red-500": formik.errors.country && formik.touched.country,
          })}
        />
      </div>
      <div className=" flex flex-row justify-center  items-center gap-2 ">
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>

          {formik.values.email.map((email, index) => (
            <input
              id={email.id}
              name={`email[${index}]`}
              type="text"
              placeholder="Enter the Email"
              onChange={(e) =>
                formik.setFieldValue(`email[${index}]`, {
                  id: email.id,
                  value: e.target.value,
                })
              }
              value={email.value}
              className={cs("border border-gray-400 p-2 rounded-lg w-full", {
                "border-red-500": formik.errors.email && formik.touched.email,
              })}
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
      <div className=" flex flex-row justify-center  items-center gap-2 ">
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
          >
            Number:
          </label>
          {formik.values.phone.map((phone, index) => (
            <input
              id={phone.id}
              name={`phone[${index}]`}
              type="text"
              placeholder="Enter the Number"
              onChange={(e) =>
                formik.setFieldValue(`phone[${index}]`, {
                  id: phone.id,
                  value: e.target.value,
                })
              }
              value={phone.value}
              className={cs("border border-gray-400 p-2 rounded-lg w-full", {
                "border-red-500": formik.errors.phone && formik.touched.phone,
              })}
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
      <button
        type="submit"
        className="px-2 py-2 mt-[10px] text-xs text-white bg-blue-500 rounded-md "
      >
        Save
      </button>
    </form>
  );
};

export default CreateContact;
