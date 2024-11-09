import React, { useState, useRef, useEffect, useCallback } from "react";
import instance from "../../utils/instance.js";
import ClientCard from "..//clients/ClientCard.jsx";
import ImageCropper from "../ImageCropper";

function ClientManagement() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState(null);

  const originalImageRef = useRef(null);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = { name, description, designation, image };
      // Send data to backend
      const response = await instance.post("/create/client", { clientData });
      console.log(response);

      setName("");
      setDescription("");
      setDesignation("");
      setImage("");
      if (originalImageRef.current) {
        originalImageRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };

  const lastClientRef = useCallback(
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

  const handleImageChange = (image) => {
    setImage(image);
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get(
        `/get-details?type=clients&page=${page}`
      );
      setClients((prevClient) => {
        const newClients = [...prevClient, ...data.data];
        const uniqueClients = newClients.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
        return uniqueClients;
      });
      setHasMore(data.data.length === 10);
    } catch (error) {
      console.error("Failed to fetch clients", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
    console.log();
  }, [page]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Create New Client
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Client Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Client Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="designation"
              className="block text-sm font-medium text-gray-700"
            >
              Client Designation
            </label>
            <input
              type="text"
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <ImageCropper
              handleImageChange={handleImageChange}
              originalImageRef={originalImageRef}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Create Client
          </button>
        </form>
      </div>
      {clients.length > 0 && (
        <h1 className="text-3xl font-bold text-center text-blue-600 mt-16">
          All Clients
        </h1>
      )}
      <div className="mt-6 t w-full grid grid-cols-2 lg:grid-cols-4">
        {clients?.map((client, index) => {
          if (clients.length === index + 1) {
            return (
              <div ref={lastClientRef} key={index} className="p-2 m-4 w-full">
                <ClientCard
                  name={client.name}
                  img={client.image}
                  designation={client.designation}
                  description={client.description}
                />
              </div>
            );
          } else {
            return (
              <div key={index} className="p-2 m-4">
                <ClientCard
                  name={client.name}
                  img={client.image}
                  designation={client.designation}
                  description={client.description}
                />
              </div>
            );
          }
        })}
        {!loading && clients?.length === 0 && (
          <div className="text-center text-gray-500">No clients found.</div>
        )}
      </div>
    </div>
  );
}

export default ClientManagement;
