// frontend/src/components/Question.js
//// Main Form Component to select subject, chapter, questions for Quarterly,Half yearly,prepublic 
"use client";
import React, { useRef } from "react";

// 👉 html2pdf ని dynamic import చేయాలి (SSR avoid చేయడానికి)
let html2pdf;
if (typeof window !== "undefined") {
  html2pdf = require("html2pdf.js");
}

const QuestionPaper = ({ filters }) => {
  const printRef = useRef();

  // 🖨️ Print Function (cross-device safe)
  const handlePrint = () => {
    if (!printRef.current) return;

    // Clone the printable area
    const printContent = printRef.current.cloneNode(true);

    // Create new print window
    const printWindow = window.open("", "_blank", "width=800,height=600");

    // Copy styles
    const styles = Array.from(
      document.querySelectorAll("style, link[rel='stylesheet']")
    )
      .map((el) => el.outerHTML)
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Question Paper</title>
          ${styles}
          <style>
            @page { size: A4; margin: 10mm; }
            body { margin: 0; padding: 0; font-family: sans-serif; }
            .no-print { display: none !important; }
          </style>
        </head>
        <body></body>
      </html>
    `);

    printWindow.document.body.appendChild(printContent);
    printWindow.document.close();

    // ✅ Mobile Safari fix (slight delay)
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // 📥 Download PDF Function
  const handleDownloadPDF = () => {
    if (!printRef.current || !html2pdf) return;
    const element = printRef.current;

    const opt = {
      margin: 0.5,
      filename: "QuestionPaper.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!filters?.selectedQuestions?.length) {
    return <p className="text-center text-red-500">⚠️ No Questions Selected!</p>;
  }

  const shortQuestions = filters.selectedQuestions.filter((q) => q.type === "short");
  const longQuestions = filters.selectedQuestions.filter((q) => q.type === "long");

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-100 min-h-screen ">
      {/* ✅ Preview Area */}
      <div
        ref={printRef}
        className="w-full  min-h-[297mm] bg-white p-4 sm:p-8 relative max-w-6xl"
      >
        {/* ✅ Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <img
            src="/images/apbise.png"
            alt="Watermark"
            className="opacity-10 w-32 h-32 sm:w-[200px] sm:h-[200px]"
          />
        </div>

{/* ✅ Header (Center aligned) */}
<div className="mb-2 border-b-2 pb-4 text-center">
  <h1 className="text-lg sm:text-xl font-bold uppercase text-gray-900">
    {filters.collegeName || "N/A"}
  </h1>
  <p className="text-sm sm:text-base font-semibold">
    {filters.examType || "N/A"} - {filters.year || "N/A"} <br />
    {filters.courseYear || "N/A"} <br />
    Subject: {filters.subject || "N/A"} <br />
    Date: {filters.date || "N/A"}&nbsp;{filters.session} &emsp;
    Duration: {filters.duration || "N/A"} &emsp;
    Max Marks: {filters.maxMarks || "N/A"}
  </p>
</div>

        {/* ✅ Section A */}
        <h3 className="mt-2 text-md text-center font-semibold underline">
          SECTION - A
        </h3>
        <p className="text-gray-900 text-sm sm:text-base">
          (i) Answer All Questions ✍️ (ii) Each Question carries  2 Marks 🏆 
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

        {/* ✅ Section B */}
        <h3 className="mt-4 text-md text-center font-semibold underline">
          SECTION - B
        </h3>
        <p className="text-gray-900 text-sm sm:text-base">
          (i) Answer Any Five Questions ✍️ (ii) Each Question carries &emsp;&emsp; 6 Marks 🏆 
          5 × 6 = 30
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

      {/* ✅ Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-[210mm] no-print">
        <button
          onClick={handleDownloadPDF}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg shadow hover:bg-blue-700"
        >
          📥 Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white text-sm sm:text-base rounded-lg shadow hover:bg-green-700"
        >
          🖨️ Print
        </button>
      </div>
    </div>
  );
};

export default QuestionPaper;
