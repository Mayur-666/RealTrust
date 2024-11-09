import React from "react";

function Footer() {
  return (
    <div className="md:p-4 w-full flex flex-col sm:flex-row items-center justify-evenly bg-gray-800 p-2 text-white">
      <div className="w-full sm:w-1/3 text-center sm:text-left p-3">
        All Rights Reserved | 2024
      </div>
      <img className="max-w-36 m-3" src="/images/logo1.svg" alt="" />
      <div className="w-1/3 flex items-center justify-center sm:justify-end">
        <img className="m-2" src="/icons/Group.svg" alt="" />
        <img className="m-2" src="/icons/Linkedin.svg" alt="" />
        <img className="m-2" src="/icons/Frame.svg" alt="" />
        <img className="m-2" src="/icons/Group-1.svg" alt="" />
      </div>
    </div>
  );
}

export default Footer;
