const PhoneBookLabels = () => {
  return (
    <thead>
      <tr className="border-b-2 border-gray-300">
        {labelItems.map((item) => (
          <th key={item} className={"px-6 py-2 border-2 border-grey "}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default PhoneBookLabels;

const labelItems = [
  "Name",
  "Last Name",
  "Address",
  "City",
  "Country",
  "Email",
  "Number",
  "Edit",
  "Delete",
];
