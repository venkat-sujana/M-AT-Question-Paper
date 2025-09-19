// src/components/QuestionPaper.js

import React, { useRef } from "react";

const QuestionPaper = ({ filters }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    // Get styles from the current document
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('');
    
    printWindow.document.write(`
      <html>
        <head>
          <title> Question Paper Genarator</title>
          ${styles}
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print {
              display: none !important;
            }
            .question-list {
              margin-left: 5mm; /* Changed to left margin for questions */
            }
              p{
              margin-left: 5mm;
              }

          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
          <script>
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (
    !filters ||
    !filters.selectedQuestions ||
    filters.selectedQuestions.length === 0
  ) {
    return (
      <p className="text-center text-red-500">⚠️ No Questions Selected!</p>
    );
  }

  const shortQuestions = filters.selectedQuestions.filter(
    (q) => q.type === "short"
  );
  const longQuestions = filters.selectedQuestions.filter(
    (q) => q.type === "long"
  );

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div
        ref={printRef}
        className="w-[210mm] min-h-[297mm] bg-white p-8 rounded-xl shadow-lg border border-gray-300 relative print:w-full print:shadow-none print:border-0"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <img
            src="/images/apbise.png"
            alt="Watermark"
            className="opacity-10 w-[200px] h-[200px] print:opacity-20"
          />
        </div>

        {/* HEADER */}
        <div className="text-center mt-4 border-b-2 pb-4 print:border-b-2">
          <h1 className="text-xl font-bold font-serif uppercase text-gray-900">
            {filters.collegeName || "N/A"}
          </h1>
          <p className="text-lg font-semibold">
            {filters.examType || "N/A"}-{filters.year || "N/A"} <br />
            {filters.courseYear || "N/A"} <br />
            Subject : {filters.subject || "N/A"} <br />
            Date: {filters.date || "N/A"}&emsp;&emsp;&emsp;&emsp;
            Duration: {filters.duration || "N/A"}
            &emsp;&emsp; Max.Marks:{" "}
            {filters.maxMarks || "N/A"}
          </p>
        </div>

        {/* SECTION - A */}
        <h3 className="mt-2 text-md text-center font-semibold underline">
          SECTION - A<br />
        </h3>
        <p className="text-gray-900" style={{ marginLeft: "10mm" }}>
          (i) Answer All the Questions&nbsp;✍️ (ii)Each Question Carries 2
          Marks&nbsp;🏆&ensp;
          {shortQuestions.length} X 2 = {shortQuestions.length * 2}
        </p>

<ol className="pl-5 list-outside question-list" start={1}>
  {shortQuestions.map((q, index) => (
    <li key={q._id} className="mt-2">
      {index + 1}. {q.questionText} <br />
      <span className="text-gray-900">{q.questionTextTelugu}</span>
    </li>
  ))}
</ol>


        {/* SECTION - B */}
        <h3 className="mt-2 text-md text-center font-semibold underline">
          SECTION - B <br />
        </h3>
        <p className="text-gray-900">
          (i) Answer Any Three Questions&nbsp;✍️ (ii) Each Question Carries 5
          Marks&nbsp;🏆&ensp; 3 X 5 = 15
        </p>

<ol className="pl-5 list-outside question-list" start={shortQuestions.length + 1}>
  {longQuestions.slice(0, 5).map((q, index) => (
    <li key={q._id} className="mt-2">
      {shortQuestions.length + index + 1}. {q.questionText} <br />
      <span className="text-gray-900">{q.questionTextTelugu}</span>
    </li>
  ))}
</ol>


        {/* FOOTER */}
        <div className="footer mt-10 border-t pt-4 text-center text-gray-900">
          <p>********* All the Best *********</p>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-6 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 no-print"
      >
        Print / Export PDF
      </button>
    </div>
  );
};

export default QuestionPaper;