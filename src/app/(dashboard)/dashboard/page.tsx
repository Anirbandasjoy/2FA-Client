import AdminRoute from "@/components/routes/AdminRoute";
import React from "react";

const Dashboard = () => {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gradient ">
            Welcome to Dashboard
          </h1>
          <p className="text-lg text-gray-300">My Admin</p>
          <button className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 transition duration-300">
            Lets back
          </button>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Dashboard;
