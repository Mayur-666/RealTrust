import React from "react";

function ProjectCard({ img, title, description }) {
  return (
    <div className="flex flex-col my-2 bg-white rounded-2xl shadow-md">
      <img
        src={img}
        alt=""
        className="rounded-t-2xl max-w-72 max-h-44 object-cover"
      />
      <div className="flex w-60 h-40 flex-col justify-center">
        <h2 className="pl-4 text-xl mx-1 text-sky-600 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h2>
        <p className="pl-4 py-2 mx-1 text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </p>
        <button className="rounded-lg bg-orange-500 w-40 p-1 ml-5 mt-2 text-white">
          READ MORE
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
