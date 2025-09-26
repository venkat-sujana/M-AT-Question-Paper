import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import QuestionPaperForm from "./components/QuestionPaperForm";
import UnitTest from "./components/UnitTest";
import QuestionPaperInputForm from "./components/QuestionPaperInputForm";
import CRUDComponent from "./components/CRUDComponent";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";


function App() {
  const [filters, setFilters] = useState(null);

  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-10">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Question Paper Input Form */}
            <Route
              path="/questionpaperinputform"
              element={<QuestionPaperInputForm />}
            />


            {/* Question Paper Generator */}
            <Route
              path="/generate-paper"
              element={
                <div>
                  <QuestionPaperForm
                    onGenerate={(data) => {
                      console.log("Filters in App.js:", data);
                      setFilters(data);
                    }}
                  />

                  {filters && <UnitTest filters={filters} />}
                </div>
              }
            />

            {/* CRUD Operations */}
            <Route path="/crud" element={<CRUDComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
