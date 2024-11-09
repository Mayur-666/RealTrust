import React, { useEffect, useState, useRef, useCallback } from "react";
import instance from "../../utils/instance";

function ContactDetails() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchContacts = async () => {
      // Replace this with your API call
      setLoading(true);
      try {
        const { data } = await instance.get(
          `/get-details?type=contacts&page=${page}`
        );
        setContacts((prevContacts) => {
          const newContacts = [...prevContacts, ...data.data];
          // Remove duplicates based on the unique `id` property (change if necessary)
          const uniqueContacts = newContacts.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t._id === value._id)
          );
          return uniqueContacts;
        });
        setHasMore(data.data.length == 10);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchContacts();
  }, [page]);

  const lastContactElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Details</h2>
      <table className="min-w-full bg-white border border-gray-200 max-h-screen overflow-y-scroll shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Full Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Mobile Number</th>
            <th className="py-2 px-4 border-b text-left">City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => {
              if (contacts.length === index + 1) {
                return (
                  <tr
                    ref={lastContactElementRef}
                    key={index}
                    className="hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 border-b">{contact.fullName}</td>
                    <td className="py-2 px-4 border-b">{contact.email}</td>
                    <td className="py-2 px-4 border-b">{contact.mobile}</td>
                    <td className="py-2 px-4 border-b">{contact.city}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{contact.fullName}</td>
                    <td className="py-2 px-4 border-b">{contact.email}</td>
                    <td className="py-2 px-4 border-b">{contact.mobile}</td>
                    <td className="py-2 px-4 border-b">{contact.city}</td>
                  </tr>
                );
              }
            })
          ) : (
            <div className="text-center p-4">No details found.</div>
          )}
        </tbody>
      </table>
      {loading && <div className="text-center mt-4">Loading more...</div>}
    </div>
  );
}

export default ContactDetails;
