// src/components/QuestionPaper.js
//for unit testing only
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

const QuestionPaper = ({ filters }) => {
  const printRef = useRef();

  // Print/Export (react-to-print)
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

  // Direct PDF Download (html2pdf.js)
  const handleDownload = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: "question-paper.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

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
       {/* ✅ Header (Center aligned) */}
<div className="mb-4 border-b-2 pb-4 text-center">
  <h1 className="text-lg sm:text-xl font-bold uppercase text-gray-900">
    {filters.collegeName || "N/A"}
  </h1>
  <p className="text-sm sm:text-base font-semibold">
    {filters.examType || "N/A"} - {filters.year || "N/A"} <br />
    {filters.courseYear || "N/A"} <br />
    Subject: {filters.subject || "N/A"} <br />
    Date: {filters.date || "N/A"} &emsp;
    Duration: {filters.duration || "N/A"} &emsp;
    Max Marks: {filters.maxMarks || "N/A"}
  </p>
</div>

{/* ✅ Body */}
<div className="text-left">
  {/* ✅ Section A (heading center, content left) */}
  <h3 className="mt-2 text-md font-semibold underline text-center">
    SECTION - A
  </h3>
  <p className="text-gray-900 text-sm sm:text-base">
    (i) Answer All Questions ✍️ (ii) Each = 2 Marks 🏆 &emsp;
    {shortQuestions.length} × 2 = {shortQuestions.length * 2}
  </p>
  <ol className="pl-5 list-outside text-sm sm:text-base">
    {shortQuestions.map((q, index) => (
      <li key={q._id} className="mt-2">
        {index + 1}. {q.questionText} <br />
        <span className="text-gray-700 italic">{q.questionTextTelugu}</span>
      </li>
    ))}
  </ol>

  {/* ✅ Section B (heading center, content left) */}
  <h3 className="mt-4 text-md font-semibold underline text-center">
    SECTION - B
  </h3>
  <p className="text-gray-900 text-sm sm:text-base">
    (i) Answer Any Five Questions ✍️ (ii) Each = 5 Marks 🏆 &emsp;
    3 × 5 = 15
  </p>
  <ol
    className="pl-5 list-outside text-sm sm:text-base"
    start={shortQuestions.length + 1}
  >
    {longQuestions.slice(0, 8).map((q, index) => (
      <li key={q._id} className="mt-2">
        {shortQuestions.length + index + 1}. {q.questionText} <br />
        <span className="text-gray-700 italic">{q.questionTextTelugu}</span>
      </li>
    ))}
  </ol>

  {/* ✅ Footer */}
  <div className="mt-6 sm:mt-10 border-t pt-4 text-center text-gray-900 text-sm sm:text-base">
    ********* All the Best *********
  </div>
</div>

      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 no-print">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all"
        >
          🖨️ Print 
        </button>
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all"
        >
          📥 Download PDF
        </button>
      </div>
    </div>
  );
};

export default QuestionPaper;
