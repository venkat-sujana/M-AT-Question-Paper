import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 ">
      <div className="mx-auto max-w-7xl flex items-center justify-between mt-8 p-4">
        <Link to="/home" className="text-xl font-bold text-blue-500  ">M&AT</Link>
        <button className="md:hidden text-2xl cursor-pointer" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <ul className={`flex-col md:flex-row md:flex space-y-2 md:space-y-0 md:space-x-6 items-center absolute md:static left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none top-16 px-4 py-3 transition-all duration-300 ${open ? "flex" : "hidden"} md:flex`}>

          <li>
            <Link to="/about" className="text-blue-500 font-medium hover:underline" onClick={() => setOpen(false)}>About Me</Link>
          </li>
          <li>
            <Link to="/contact" className="text-blue-500 font-medium hover:underline" onClick={() => setOpen(false)}>Contact</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
