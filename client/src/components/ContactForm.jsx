import React, { useState } from "react";
import instance from "../utils/instance";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add condition to check if mobile has 10 dig
    if (formData.mobile.length != 10) {
      return alert("Mobile number should be 10 digits");
    }
    try {
      const response = await instance.post("/create/contact", {
        contactData: formData,
      });
      console.log(response.data);
      alert(response.data);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        city: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formFields = [
    {
      type: "text",
      name: "name",
      placeholder: "Full Name",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Enter Email Address",
    },
    {
      type: "number",
      name: "mobile",
      placeholder: "Mobile Number",
    },
    {
      type: "text",
      name: "city",
      placeholder: "Area, City",
    },
  ];

  return (
    <div
      className="w-96 rounded-lg border-2 border-gray-300 shadow-2xl"
      style={{ backgroundColor: "#505e8c", opacity: 0.9 }}
    >
      <div className="flex flex-col w-full p-1 items-center justify-center">
        <h1 className="text-xl lg:text-3xl text-white font-bold px-8 py-3 mb-3 text-center">
          Get a Free Consultation
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full mx-auto">
          {formFields.map((field, i) => (
            <input
              required
              key={i}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleDataChange}
              className="p-2 lg:p-3 my-2 mx-auto w-10/12 bg-transparent border-2 border-gray-300 outline-none text-white rounded-lg"
            />
          ))}
          <button
            type="submit"
            className="p-2 lg:p-3 my-4 lg:my-8 mx-auto w-10/12 bg-orange-500 text-white font-semibold rounded-lg"
          >
            Get Quick Quote
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
