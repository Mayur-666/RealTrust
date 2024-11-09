import React, { useEffect, useState, useRef, useCallback } from "react";
import instance from "../../utils/instance";

function Subscriptions() {
  const [emails, setEmails] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const fetchEmails = async () => {
      // Replace this with your API call
      setLoading(true);
      try {
        const { data } = await instance.get(
          `/get-details?type=newsletters&page=${page}`
        );
        setEmails((prevEmails) => {
          const newEmails = [...prevEmails, ...data.data];
          // Remove duplicates based on the unique `id` property (change if necessary)
          const uniqueEmails = newEmails.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t._id === value._id)
          );
          return uniqueEmails;
        });
        setHasMore(data.data.length == 10);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchEmails();
  }, [page]);

  const lastEmailElementRef = useCallback(
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
    <div className="min-h-screen w-full t">
      <h1 className="text-2xl font-bold mb-4 text-center">Subscribed Emails</h1>
      <ul className="t grid list-decimal pl-5 bg-white p-4 rounded shadow-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xL:grid-cols-4">
        {emails.length > 0 ? (
          emails.map((data, index) => {
            if (data.length === index + 1) {
              return (
                <li
                  ref={lastEmailElementRef}
                  key={index}
                  className="m-2 t p-2 border-b border-gray-200"
                >
                  {data.email}
                </li>
              );
            } else {
              return (
                <li
                  key={index}
                  className="m-2 t p-2 border-b border-gray-200 w-full "
                >
                  {data.email}
                </li>
              );
            }
          })
        ) : (
          <div className="text-center">No newsletter subscriptions found</div>
        )}
      </ul>
      {loading && <div className="text-center mt-4">Loading more...</div>}
    </div>
  );
}

export default Subscriptions;
