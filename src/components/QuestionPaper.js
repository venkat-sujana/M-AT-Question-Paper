// src/components/QuestionPaper.js

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const QuestionPaper = ({ filters }) => {
  const printRef = useRef();

  // react-to-print handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Question Paper",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        font-family: 'Times New Roman', serif;
      }
      .no-print { display: none !important; }
    `,
  });

  if (
    !filters ||
    !filters.selectedQuestions ||
    filters.selectedQuestions.length === 0
  ) {
    return (
      <p className="text-center text-red-500 font-medium mt-10">
        ⚠️ No Questions Selected!
      </p>
    );
  }

  const shortQuestions = filters.selectedQuestions.filter(
    (q) => q.type === "short"
  );
  const longQuestions = filters.selectedQuestions.filter(
    (q) => q.type === "long"
  );

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div
        ref={printRef}
        className="w-full max-w-4xl lg:w-[210mm] bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-300 relative print:w-full print:shadow-none print:border-0"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <img
            src="/images/apbise.png"
            alt="Watermark"
            className="opacity-10 w-48 h-48 sm:w-60 sm:h-60 print:opacity-20"
          />
        </div>

        {/* HEADER */}
        <div className="text-center mt-2 sm:mt-4 border-b-2 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif uppercase text-gray-900 tracking-wide">
            {filters.collegeName || "N/A"}
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed mt-2">
            {filters.examType || "N/A"} - {filters.year || "N/A"} <br />
            {filters.courseYear || "N/A"} <br />
            Subject: {filters.subject || "N/A"} <br />
            Date: {filters.date || "N/A"} &emsp; Duration:{" "}
            {filters.duration || "N/A"} &emsp; Max Marks:{" "}
            {filters.maxMarks || "N/A"}
          </p>
        </div>

        {/* SECTION - A */}
        <h3 className="mt-4 text-lg text-center font-semibold underline tracking-wide text-gray-800">
          SECTION - A
        </h3>
        <p className="text-gray-700 text-sm sm:text-base ml-4 mt-1">
          (i) Answer All Questions ✍️ &nbsp;&nbsp;(ii) Each Question Carries 2
          Marks 🏆 &ensp;
          {shortQuestions.length} × 2 = {shortQuestions.length * 2}
        </p>

        <ol className="pl-6 list-decimal question-list text-gray-900 text-base leading-relaxed mt-2 space-y-2">
          {shortQuestions.map((q, index) => (
            <li key={q._id}>
              {q.questionText} <br />
              <span className="text-gray-700 italic">
                {q.questionTextTelugu}
              </span>
            </li>
          ))}
        </ol>

        {/* SECTION - B */}
        <h3 className="mt-6 text-lg text-center font-semibold underline tracking-wide text-gray-800">
          SECTION - B
        </h3>
        <p className="text-gray-700 text-sm sm:text-base ml-4 mt-1">
          (i) Answer Any Three Questions ✍️ &nbsp;&nbsp;(ii) Each Question
          Carries 5 Marks 🏆 &ensp; 3 × 5 = 15
        </p>

        <ol
          className="pl-6 list-decimal question-list text-gray-900 text-base leading-relaxed mt-2 space-y-3"
          start={shortQuestions.length + 1}
        >
          {longQuestions.slice(0, 5).map((q, index) => (
            <li key={q._id}>
              {q.questionText} <br />
              <span className="text-gray-700 italic">
                {q.questionTextTelugu}
              </span>
            </li>
          ))}
        </ol>

        {/* FOOTER */}
        <div className="mt-10 border-t pt-4 text-center text-gray-800 font-semibold text-sm sm:text-base">
          ********* All the Best *********
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full shadow-md hover:scale-105 transform transition-all duration-300 no-print"
      >
        🖨️ Print / Export PDF
      </button>
    </div>
  );
};

export default QuestionPaper;
