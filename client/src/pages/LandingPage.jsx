import { useState } from "react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectSection from "../components/projects/ProjectSection";
import instance from "../utils/instance";
import ClientSection from "../components/clients/CardSection";

function LandingPage() {
  return (
    <div className="t w-full relative">
      <Navbar />
      <HeroSection />
      <Section2 />
      <SpecialitySection />
      <GallerySection />
      <AboutUsSection />
      <ProjectSection />
      <ClientSection />
      <BannerSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default LandingPage;

function HeroSection() {
  return (
    <div
      id="hero"
      className="w-full relative t flex items-end justify-center bg-no-repeat h-screen lg:h-dvh"
      style={{
        background: `url(${"images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home.svg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "70px",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-center t w-11/12 mb-10">
        <h1 className="text-5xl lg:text-7xl mt-10 lg:mt-0 mb-10 pb-10 text-white font-extrabold w-2/3 t leading-none">
          Consultation, <br /> Design, <br />& Marketing
        </h1>
        <div className="w-full t flex item-start justify-center">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div
      className="t w-full t flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      <div className="t w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-4xl p-2 ml-5 t text-blue-600 font-bold">
          Not Your Average Realtor
        </h1>
        <p className="text-left py-2 t w-full ml-10 lg:w-1/2 lg:mr-5 lg:ml-0 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          exercitationem nobis dolore dolores ex quasi reiciendis provident
          assumenda ad? Eos numquam provident.
        </p>
      </div>
      <div className="grid grid-cols-2 t w-1/2 place-items-center">
        <img src="/images/Ellipse 11.svg" alt="" className="" />
        <div>
          <img
            src="/images/Ellipse 12.svg"
            className="w-72 m-5 lg:-translate-x-0 -translate-x-7"
            alt=""
          />
          <img
            src="/images/Ellipse 13.svg"
            className="w-72 lg:-translate-x-0 -translate-x-7"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

function SpecialitySection() {
  const sections = [
    {
      img: "/icons/home.svg",
      title: "Potential ROI",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque, justo nec.",
    },
    {
      img: "/icons/paintbrush-2.svg",
      title: "Design",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque, justo nec.",
    },
    {
      img: "/icons/circle-dollar-sign.svg",
      title: "Marketing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque, justo nec.",
    },
  ];

  return (
    <div
      id="speciality"
      className="t w-full t flex flex-col items-center justify-center p-10"
    >
      <div className="text-3xl font-bold text-center p-3 text-blue-600">
        Why Choose Us?
      </div>
      <img src="/shapes/Rectangle 58.svg" alt="" className="mb-5 p-4" />
      <div className="t w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-4 mx-3 w-full t flex flex-col items-center h-72"
          >
            <div className="rounded-full bg-blue-50 mb-4">
              <img src={section.img} alt="" className="p-4" />
            </div>
            <h2 className="text-3xl m-3 p-4 text-blue-600 font-bold">
              {section.title}
            </h2>
            <p className="text-center px-5 py-4 text-ellipsis overflow-hidden whitespace-nowrap w-full ">
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GallerySection() {
  return (
    <div className="t w-full t flex flex-col items-center justify-center p-10 relative">
      <img
        src="/shapes/Rectangle 55.svg"
        alt=""
        className="absolute w-72 top-1/2 right-1/2 translate-x-10 -translate-y-20"
      />
      <div className="grid grid-cols-3 t" style={{ height: "70vh" }}>
        <div
          className="t flex items-start
         justify-end p-5 "
        >
          <img
            src="/shapes/Subtract-4.svg"
            className="translate-x-24 translate-y-44"
          />
          <img
            className="t w-32 translate-x-8 lg:w-60 "
            src="/images/pexels-brett-sayles-2881232.svg"
            alt=""
          />
          <img
            src="/shapes/Rectangle 54.svg"
            className="w-16 translate-x-14 -translate-y-10"
          />
        </div>
        <div className="translate-y-20 relative">
          <img
            className="w-96"
            src="/images/pexels-andres-ayrton-6578391.svg"
            alt=""
          />
          <img
            src="/shapes/Subtract.svg"
            alt=""
            className="absolute top-0 right-0 -translate-y-10"
          />
        </div>
        <div className="flex lg:items-end translate-x-10">
          <img
            className="w-36 lg:w-60"
            src="/images/pexels-fauxels-3182834.svg"
            alt=""
          />

          <img
            src="/shapes/Subtract-5.svg"
            className="-translate-x-3 translate-y-4"
          />
        </div>
      </div>
    </div>
  );
}

function AboutUsSection() {
  return (
    <div className="t w-full t flex flex-col items-center justify-center p-10">
      <div className="text-3xl font-bold text-center p-3 text-blue-600">
        About Us
      </div>
      <img src="/shapes/Rectangle 58.svg" alt="" className="mb-5 p-4" />
      <p className="w-3/4 lg:w-1/2 p-4 my-4 text-xl text-gray-600 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        quaerat quia accusamus autem adipisci esse mollitia, cum officiis atque
        unde ipsum totam voluptatibus quibusdam placeat maxime, ab dolores sequi
        et.
      </p>
      <button className="my-6 px-4 py-3 border border-b-2 border-b-blue-600 shadow-md text-blue-600 font-bold rounded-lg w-1/4">
        LEARN MORE
      </button>
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleNewsLetterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/create/newsletter", { email });
      console.log(response.data);
      alert(response.data);
      setEmail("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-blue-600 t w-full flex items-center justify-center flex-col lg:flex-row">
      <ul className="flex justify-center w-full lg:w-1/2 t lg:px-10 items-center text-white mx-auto">
        <li className="p-4">Home</li>
        <li className="p-4">Services</li>
        <li className="p-4">Projects</li>
        <li className="p-4">Testimonials</li>
        <li className="p-4">Contact</li>
      </ul>
      <div className="w-full p-5 flex-col sm:flex-row lg:w-1/2 flex text-white items-center justify-center">
        <h3 className="mb-3 sm:mb-3 sm:mx-5"> Subscribe Us</h3>
        <form onSubmit={handleNewsLetterSubmit}>
          <input
            type="email"
            name="newsletter-email"
            id="newsletter-email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none px-10 py-2 rounded-l-xl bg-transparent border-2 border-r-0 border-white"
          />
          <button
            type="submit"
            className="font-bold px-10 py-2 rounded-r-xl text-blue-600 bg-white border-2 border-l-0 border-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

function BannerSection() {
  return (
    <div
      className="t w-full t flex items-center flex-col justify-center relative min-h-96 bg-no-repeat"
      style={{
        background: `url(${"/images/Rectangle.svg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "rgba(0,0,0, 0.5)",
        backgroundBlendMode: "multiply",
      }}
    >
      <h2 className="text-3xl mb-5 text-white font-extrabold w-3/4 sm:w-1/2 lg:w-1/2 text-center p-4">
        Learn more about our listing process, as well as our additional staging
        and design work.
      </h2>
      <button className="my-4 px-4 py-3 text-blue-600 font-bold rounded-lg w-2/3 sm:w-1/2 lg:w-1/4 bg-white">
        LEARN MORE
      </button>
    </div>
  );
}
