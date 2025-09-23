import React from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* Main Content Only */}
      <div className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center sm:text-left mt-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tiles */}
          <Link to="/questionpaperinputform" className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 w-full">
            
            <div className="p-6 flex items-center sm:items-start  bg-green-100 shadow-2xl rounded-xl">
              <div className=" p-4 rounded-full mr-4">
                <span className="text-blue-600 text-2xl">✍️</span>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl  font-semibold text-gray-800 shadow-2xl" >QP Input Form</h2>
                <p className="text-gray-500 text-sm sm:text-base">Create new question paper templates</p>
              </div>

            </div>
          </Link>

          <Link to="/generate-paper" className="bg-amber-100 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 w-full">
            <div className="p-6 flex items-center sm:items-start">
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <span className="text-green-600 text-2xl">📄</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Question Paper</h2>
                <p className="text-gray-500 text-sm sm:text-base">Generate new question papers</p>
              </div>
            </div>
          </Link>

          <Link to="/crud" className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 w-full">
            <div className="p-6 flex items-center sm:items-start bg-purple-300 shadow-2xl rounded-xl">
              <div className="bg-purple-100 p-4 rounded-full mr-4">
                <span className="text-purple-600 text-2xl">🛠️</span>
              </div>
              <div >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 ">CRUD Operations</h2>
                <p className="text-gray-500 text-sm sm:text-base">Manage database records</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
