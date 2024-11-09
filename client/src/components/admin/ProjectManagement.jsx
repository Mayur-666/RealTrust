import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import instance from "../../utils/instance.js";
import ProjectCard from "../projects/ProjectCard.jsx";
import ImageCropper from "../ImageCropper";

const ProjectManagement = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const originalImageRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastProjectElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleImageChange = (image) => {
    setProjectData({ ...projectData, image: image });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/create/project", { projectData });

      alert(response?.data);

      setProjectData({
        title: "",
        description: "",
        image: "",
      });
      if (originalImageRef.current) {
        originalImageRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get(
        `/get-details?type=projects&page=${page}`
      );
      setProjects((prevProjects) => {
        const newProjects = [...prevProjects, ...data.data];
        // Remove duplicates based on the unique `id` property (change if necessary)
        const uniqueProjects = newProjects.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
        return uniqueProjects;
      });
      setHasMore(data.data.length === 10);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Create New Project
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl p-8 bg-white rounded-lg shadow-lg mx-auto space-y-6"
      >
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={projectData.title}
          onChange={handleDataChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          value={projectData.description}
          onChange={handleDataChange}
          required
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Project Image
        </label>
        <ImageCropper
          handleImageChange={handleImageChange}
          originalImageRef={originalImageRef}
        />
        <button
          type="submit"
          className="w-full font-bold p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>
      {projects.length > 0 && (
        <h1 className="text-3xl font-bold text-center text-blue-600 mt-16">
          All Projects
        </h1>
      )}
      <div className="mt-6 t grid grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => {
          if (projects.length === index + 1) {
            return (
              <div ref={lastProjectElementRef} key={index} className="p-2 m-4">
                <ProjectCard
                  title={project.title}
                  img={project.image}
                  description={project.description}
                />
              </div>
            );
          } else {
            return (
              <div key={index} className="p-2 m-2">
                <ProjectCard
                  title={project.title}
                  img={project.image}
                  description={project.description}
                />
              </div>
            );
          }
        })}
      </div>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {!loading && projects.length === 0 && (
        <div className="text-center text-gray-500">No projects found.</div>
      )}
    </div>
  );
};

export default ProjectManagement;
