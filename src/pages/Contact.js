import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Contact Me</h1>

        {/* కాంటాక్ట్ ఇన్ఫో */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center" >Phone Number</h2>
            <p className="text-lg text-gray-600 text-center">8985122961</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">E-Mail</h2>
            <p className="text-lg text-gray-600 text-center">venkat.bvp34@gmail.com</p>
          </div>
        </div>

        {/* ఫారమ్ */}
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">E-Mail</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;