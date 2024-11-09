import React from "react";

function Navbar() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed z-20 top-0 left-0 w-full bg-white flex items-center justify-between mx-auto t border-b-2 shadow-lg">
      <div className="w-1/3 py-4 px-14">
        <img src="/images/logo.svg" alt="logo" className="max-w-40" />
      </div>
      <div className="py-4 hidden lg:flex w-2/3 items-center justify-evenly">
        <ul className="flex items-center justify-evenly w-full">
          <li
            onClick={() => handleScroll("hero")}
            className="text-sky-600 font-semibold"
          >
            HOME
          </li>
          <li
            onClick={() => handleScroll("speciality")}
            className="text-sky-600 font-semibold"
          >
            SERVICES
          </li>
          <li
            onClick={() => handleScroll("projects")}
            className="text-sky-600 font-semibold"
          >
            ABOUT PROJECTS
          </li>
          <li
            onClick={() => handleScroll("clients")}
            className="text-sky-600 font-semibold"
          >
            TESTIMONIALS
          </li>
        </ul>
        <button className="bg-orange-500 text-white rounded-lg py-2 px-10 mr-16">
          CONTACT
        </button>
      </div>
    </div>
  );
}

export default Navbar;
