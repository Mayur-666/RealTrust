import React, { useRef } from "react";
import ClientCard from "./ClientCard";

function CardSection() {
  const clients = [
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      name: "Consultation",
      designation: "designation",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam est eligendi iusto eaque rem, distinctio quibusdam assumenda quisquam, suscipit non eos quod fugiat velit facere veritatis odio ex id autem, possimus laborum delectus ratione minus. Praesentium amet quo corporis voluptatem?",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      name: "Consultation",
      designation: "designation",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam est eligendi iusto eaque rem, distinctio quibusdam assumenda quisquam, suscipit non eos quod fugiat velit facere veritatis odio ex id autem, possimus laborum delectus ratione minus. Praesentium amet quo corporis voluptatem?",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      name: "Consultation",
      designation: "designation",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam est eligendi iusto eaque rem, distinctio quibusdam assumenda quisquam, suscipit non eos quod fugiat velit facere veritatis odio ex id autem, possimus laborum delectus ratione minus. Praesentium amet quo corporis voluptatem?",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      name: "Consultation",
      designation: "designation",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam est eligendi iusto eaque rem, distinctio quibusdam assumenda quisquam, suscipit non eos quod fugiat velit facere veritatis odio ex id autem, possimus laborum delectus ratione minus. Praesentium amet quo corporis voluptatem?",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      name: "Consultation",
      designation: "designation",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam est eligendi iusto eaque rem, distinctio quibusdam assumenda quisquam, suscipit non eos quod fugiat velit facere veritatis odio ex id autem, possimus laborum delectus ratione minus. Praesentium amet quo corporis voluptatem?",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      name: "Consultation",
      designation: "designation",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam est eligendi iusto eaque rem, distinctio quibusdam assumenda quisquam, suscipit non eos quod fugiat velit facere veritatis odio ex id autem, possimus laborum delectus ratione minus. Praesentium amet quo corporis voluptatem?",
    },
    {
      img: "/images/pexels-andres-ayrton-6578391.svg",
      name: "Consultation",
      designation: "designation",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam est eligendi iusto eaque rem, distinctio quibusdam assumenda quisquam, suscipit non eos quod fugiat velit facere veritatis odio ex id autem, possimus laborum delectus ratione minus. Praesentium amet quo corporis voluptatem?",
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
    <div id="clients" className="bg-white w-full p-10">
      <h1 className="text-3xl font-bold text-center p-3 my-4 text-sky-600">
        Happy Clients
      </h1>
      <div className="relative flex items-center my-10 t">
        {/* Button for scrolling left */}
        <button
          className="absolute left-0 z-10 p-2 rounded-full shadow-md hover:bg-gray-400"
          onClick={scrollLeft}
        >
          {"<"}
        </button>

        <div
          className="flex items-center w-11/12 overflow-x-scroll space-x-10 mx-10"
          ref={scrollContainerRef}
        >
          {clients.map((client, index) => (
            <ClientCard
              key={index}
              img={client.img}
              designation={client.description}
              name={client.name}
              description={client.description}
            />
          ))}
        </div>

        {/* Button for scrolling right */}
        <button
          className="absolute right-0 z-10 p-2 rounded-full shadow-md hover:bg-gray-400"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default CardSection;
