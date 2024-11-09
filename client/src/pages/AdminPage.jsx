import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/admin/AdminNav";
import { MyContext } from "../utils/Context";
import ProjectManagement from "../components/admin/ProjectManagement";
import ClientManagement from "../components/admin/ClientManagement";
import ContactDetails from "../components/admin/ContactDetails";
import Subscriptions from "../components/admin/Subscriptions";

function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("project");
  const { adminState, setAdminState } = useContext(MyContext);
  const navigate = useNavigate();

  const topBarLinks = [
    { selectedTab: "project", name: "Projects" },
    { selectedTab: "client", name: "Clients" },
    { selectedTab: "contact", name: "Contacts" },
    { selectedTab: "newsletter", name: "Subscriptions" },
  ];

  return (
    <div className="relative p-20">
      <AdminNav />
      <div className="translate-y-16"></div>
      <div className="flex w-11/12 mx-auto">
        <ul className="flex items-center w-full justify-evenly bg-gray-100 p-4 rounded-lg shadow-md">
          {topBarLinks.map((item, index) => (
            <li
              key={index}
              className={`text-xl font-bold cursor-pointer px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedTab === item.selectedTab
                  ? "text-white bg-blue-600"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab(item.selectedTab)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        {selectedTab === "project" && <ProjectManagement />}
        {selectedTab === "client" && <ClientManagement />}
        {selectedTab === "contact" && <ContactDetails />}
        {selectedTab === "newsletter" && <Subscriptions />}
      </div>
    </div>
  );
}

export default AdminPage;
