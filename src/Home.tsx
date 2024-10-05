import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <Link to="/list" className="text-blue-500 hover:underline">
        Go to List Page
      </Link>
    </div>
  );
}

export default Home;