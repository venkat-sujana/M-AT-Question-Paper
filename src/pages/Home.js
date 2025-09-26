import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-indigo-50 to-white mt-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-indigo-600 to-blue-400">
        <div className="max-w-3xl w-full flex flex-col items-center">
          <div className="mb-5">
            <svg className="w-16 h-16 text-white drop-shadow-lg" fill="none" viewBox="0 0 64 64" stroke="currentColor">
              <rect x="8" y="10" width="48" height="44" rx="6" strokeWidth="2.5" className="stroke-white" fill="none"/>
              <path d="M24 18h16M20 27h24M20 36h24" className="stroke-white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight text-center">
            M&AT Question Paper Generator
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-5 text-center max-w-xl">
            Instantly generate professional, custom question papers for any subject or class
          </p>
          <button className="bg-white text-indigo-700 px-8 py-3 rounded-md font-bold shadow hover:bg-indigo-50 transition-colors">
            <Link to="/dashboard">Get Started</Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex-1 max-w-6xl w-full mx-auto py-14 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Custom Templates */}
          <div className="bg-indigo-200 rounded-xl shadow hover:shadow-lg p-8 text-center transition group border border-gray-100">
            <div className="flex flex-col items-center mb-5 cursor-pointer">
              <span className="bg-indigo-100 text-indigo-500 rounded-full p-4 mb-2 text-3xl transition group-hover:bg-indigo-600 group-hover:text-white">
                <Link to="/QuestionPaperInputForm">📝</Link></span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create New Question Paper Templates</h3>
            <p className="text-gray-600">Design once, reuse anytime for any pattern or exam.</p>
          </div>
          {/* Smart Question Bank */}
          <div className="bg-green-200 rounded-xl shadow hover:shadow-lg p-8 text-center transition group border border-gray-100">
            <div className="flex flex-col items-center mb-5">
              <span className="bg-indigo-100 text-indigo-500 rounded-full cursor-pointer p-4 mb-2 text-3xl transition group-hover:bg-indigo-600 group-hover:text-white">
                <Link to="/crud">📚</Link></span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Manage Database Records</h3>
            <p className="text-gray-600">Thousands of well-classified questions with instant search & filter.</p>
          </div>
          {/* AI Powered */}
          <div className="bg-blue-200 rounded-xl shadow hover:shadow-lg p-8 text-center transition group border border-gray-100">
            <div className="flex flex-col items-center mb-5">
              <span className="bg-indigo-100 text-indigo-500 rounded-full cursor-pointer p-4 mb-2 text-3xl transition group-hover:bg-indigo-600 group-hover:text-white">🤖</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Papers</h3>
            <p className="text-gray-600">Balanced, syllabus-fit papers – generated in seconds using AI.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pb-12 px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-700 to-blue-700 text-white shadow-lg rounded-2xl py-10 px-6 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Automate Your Exam Preparation</h2>
          <p className="text-indigo-100 mb-5 text-center">
            Save valuable time, avoid errors. Generate exam-ready, printable papers with a single click!
          </p>
          <button className="bg-white text-indigo-700 px-7 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors">
            Try It Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Question Paper Generator. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
