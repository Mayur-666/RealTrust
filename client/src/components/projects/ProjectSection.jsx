import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";

function ProjectSection() {
  const projects = [
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      title: "Consultation",
      description: "Project Name, Location",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      title: "Design",
      description: "Project Name, Location",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      title: "Marketing & Design",
      description: "Project Name, Location",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      title: "Consultation & Marketing",
      description: "Project Name, Location",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      title: "Consultation",
      description: "Project Name, Location",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      title: "Consultation",
      description: "Project Name, Location",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      title: "Consultation",
      description: "Project Name, Location",
    },
  ];
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div id="projects" className="bg-sky-50 w-full p-10">
      <h1 className="text-3xl font-bold text-center p-3 text-sky-600">
        Our Projects
      </h1>
      <p className="mx-auto text-center text-xl p-3 mb-3 w-3/4 lg:w-1/2 text-gray-700 font-serif">
        We know what buyers are looking for and suggest projects that will bring
        clients top dollar for the sale of their homes.
      </p>
      <div className="relative flex items-center">
        {/* Button for scrolling left */}
        <button
          className="absolute left-0 z-10 p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400"
          onClick={scrollLeft}
        >
          {"<"}
        </button>

        <div
          className="flex overflow-x-scroll items-center space-x-10 mx-10"
          ref={scrollContainerRef}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              img={project.img}
              title={project.title}
              name={project.name}
              location={project.location}
            />
          ))}
        </div>

        {/* Button for scrolling right */}
        <button
          className="absolute right-0 z-10 p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default ProjectSection;
