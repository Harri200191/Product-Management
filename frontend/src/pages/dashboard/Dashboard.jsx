import React, { useEffect } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Chat from "../../components/chatbot/Chat";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  return (
    <div>
      <h2 className="temp">Dashboard</h2>
      <Chat />
    </div>
  );
};

export default Dashboard;