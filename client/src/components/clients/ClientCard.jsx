import React from "react";

function ClientCard({ img, designation, name, description }) {
  return (
    <div className="flex flex-col my-2 t bg-white rounded-2xl shadow-md items-center justify-center">
      <img
        src={img}
        alt=""
        className="rounded-full border-2 mt-4 w-20 h-20 object-cover"
      />
      <div className="flex h-60 max-w-64 t flex-col">
        <p className="pl-4 p-2 mt-10 m-1 text-gray-600 overflow-hidden text-ellipsis whitespace-break-spaces min-w-40 min-h-32">
          {description.slice(0, 100)}
        </p>
        <h2 className="px-4 text-xl mx-1 text-sky-600 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </h2>
        <h2 className="px-4  mx-1 text-gray-400  overflow-hidden text-ellipsis whitespace-nowrap">
          {designation}
        </h2>
      </div>
    </div>
  );
}

export default ClientCard;
