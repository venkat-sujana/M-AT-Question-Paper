//app/src/components/QuestionPaperForm.js
import { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import QuestionPaper from "./QuestionPaper";
const QuestionPaperForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [questions, setQuestions] = useState({ short: [], long: [] });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filters, setFilters] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [error, setError] = useState("");

  const [collegeName, setCollegeName] = useState(
    "S.K.R. GOVERNMENT JUNIOR COLLEGE - GUDUR"
  );
  const [examType, setExamType] = useState("");
  const [year, setYear] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [maxMarks, setMaxMarks] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    axios
      .get("https://tailwind-backend.vercel.app/api/subjects")
      .then((res) => setSubjects(res.data))
      .catch(() => setError("⚠ Failed to load subjects!"));
  }, []);

  const handleSubjectChange = (subjectId) => {
    setSelectedSubject(subjectId);
    setSelectedChapter("");
    setQuestions({ short: [], long: [] });

    axios
      .get(`https://tailwind-backend.vercel.app/api/chapters/subject/${subjectId}`)
      .then((res) => setChapters(res.data))
      .catch(() => setError("⚠ Failed to load chapters!"));
  };

  const handleChapterChange = (chapterId) => {
    setSelectedChapter(chapterId);
    setQuestions({ short: [], long: [] });

    axios
      .get(`https://tailwind-backend.vercel.app/api/questions/chapter/${chapterId}`)
      .then((res) => {
        const shortQuestions = res.data.filter((q) => q.type === "short");
        const longQuestions = res.data.filter((q) => q.type === "long");
        setQuestions({ short: shortQuestions, long: longQuestions });
      })
      .catch(() => setError("⚠ Failed to load questions!"));
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestions((prev) =>
      prev.some((q) => q._id === question._id)
        ? prev.filter((q) => q._id !== question._id)
        : [...prev, question]
    );
  };

  const handleGenerateQuestionPaper = () => {
    if (selectedQuestions.length === 0) {
      setError("⚠ Please select at least one question!");
      return;
    }
    setError("");
    setFilters({
      collegeName,
      examType,
      subject: subjects.find((s) => s._id === selectedSubject)?.name || "N/A",
      year,
      courseYear,
      date,
      maxMarks,
      duration,
      selectedQuestions,
    });
  };

  return (

      <div className="w-full max-w-sm mx-auto bg-zinc-200 shadow-2xl rounded-2xl p-6 sm:p-2 overflow-hidden">
        <h2 className="text-xl sm:text-xl mt-2  font-bold text-center text-blue-950 mb-4">
          📖 M&AT QUESTION PAPER GENERATOR
        </h2>

        {error && (
          <p className="text-red-600 text-center font-semibold mb-6">{error}</p>
        )}

        {/* Form inputs grid */}
        <div className="grid grid-cols-1 bg-blue-100 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="space-y-6 bg-amber-200 p-4 rounded-2xl shadow-lg">
            {[
              {
                label: "College Name:",
                value: collegeName,
                onChange: (e) => setCollegeName(e.target.value),
                options: [
                  "",
                  "S.K.R.GOVERNMENT JUNIOR COLLEGE-GUDUR",
                  "S.P.G.C.GOVERNMENT JUNIOR COLLEGE-NAIDUPET",
                  "T.N.C.GOVERNMENT JUNIOR COLLEGE-KOVUR",
                  "GOVERNMENT JUNIOR COLLEGE-REPALLE",
                  "GOVERNMENT JUNIOR COLLEGE-SATHENAPALLI",
                  "S.K.B.R.GOVERNMENT JUNIOR COLLEGE-MACHERLA",
                ],
                id: "collegeName",
              },
              {
                label: "Exam Type:",
                value: examType,
                onChange: (e) => setExamType(e.target.value),
                options: [
                  "",
                  "UNIT-1",
                  "UNIT-2",
                  "UNIT-3",
                  "UNIT-4",
                  "QUARTERLY EXAMINATIONS",
                  "HALF YEARLY EXAMINATIONS",
                  "PRE PUBLIC EXAMINATIONS-1",
                  "PRE PUBLIC EXAMINATIONS-2",
                ],
                id: "examType",
              },
              {
                label: "Year:",
                value: year,
                onChange: (e) => setYear(e.target.value),
                options: ["", "2025", "2026", "2027"],
                id: "year",
              },
              {
                label: "Course Year:",
                value: courseYear,
                onChange: (e) => setCourseYear(e.target.value),
                options: ["", "FIRST YEAR M&AT", "SECOND YEAR M&AT"],
                id: "courseYear",
              },
            ].map(({ label, value, onChange, options, id }) => (
              <div key={id}>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  {label}
                </label>
                <select
                  value={value}
                  onChange={onChange}
                  className="w-full p-3 border-none rounded-xl shadow-lg focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-50"
                >
                  {options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt === "" ? `-- Select ${label.replace(":", "")} --` : opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Date:
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border-none rounded-xl shadow-lg focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-50"
              />
            </div>

            {[
              {
                label: "Max Marks:",
                value: maxMarks,
                onChange: (e) => setMaxMarks(e.target.value),
                options: ["", "25", "50"],
                id: "maxMarks",
              },
              {
                label: "Duration:",
                value: duration,
                onChange: (e) => setDuration(e.target.value),
                options: ["", "1Hr", "1.5Hrs", "3Hrs"],
                id: "duration",
              },
            ].map(({ label, value, onChange, options, id }) => (
              <div key={id}>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  {label}
                </label>
                <select
                  value={value}
                  onChange={onChange}
                  className="w-full p-3 border-none rounded-xl shadow-lg focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-50"
                >
                  {options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt === "" ? `-- Select ${label.replace(":", "")} --` : opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Select Subject:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full p-3 border-none rounded-xl shadow-lg focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-50"
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Chapter Dropdown */}
        {selectedSubject && (
          <div className="my-8">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Select Chapter:
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => handleChapterChange(e.target.value)}
              className="w-full p-3 border-none rounded-xl shadow-lg focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-50"
            >
              <option value="">-- Select Chapter --</option>
              {chapters.map((chapter) => (
                <option key={chapter._id} value={chapter._id}>
                  {chapter.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Questions Section */}
        {selectedChapter && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              ✍️ Short Answer Questions
            </h3>
            <ul className="bg-gray-100 p-6 rounded-2xl shadow-lg space-y-4 max-h-96 overflow-auto">
              {questions.short.length > 0 ? (
                questions.short.map((q) => (
                  <li
                    key={q._id}
                    className="flex flex-col sm:flex-row sm:items-center pb-4 border-b border-gray-300"
                  >
                    <input
                      type="checkbox"
                      checked={selectedQuestions.some((sq) => sq._id === q._id)}
                      onChange={() => handleQuestionSelect(q)}
                      className="mr-4 w-6 h-6 shrink-0 accent-indigo-600"
                    />
                    <div>
                      <p>{q.questionText}</p>
                      <p className="text-gray-500">{q.questionTextTelugu}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p>No Short Answer Questions available.</p>
              )}
            </ul>

            <h3 className="text-xl font-bold text-green-700 mt-10 mb-4">
              📝 Long Answer Questions
            </h3>
            <ul className="bg-gray-100 p-6 rounded-2xl shadow-lg space-y-4 max-h-96 overflow-auto">
              {questions.long.length > 0 ? (
                questions.long.map((q) => (
                  <li
                    key={q._id}
                    className="flex flex-col sm:flex-row sm:items-center pb-4 border-b border-gray-300"
                  >
                    <input
                      type="checkbox"
                      checked={selectedQuestions.some((sq) => sq._id === q._id)}
                      onChange={() => handleQuestionSelect(q)}
                      className="mr-4 w-6 h-6 shrink-0 accent-indigo-600"
                    />
                    <div>
                      <p>{q.questionText}</p>
                      <p className="text-gray-500">{q.questionTextTelugu}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p>No Long Answer Questions available.</p>
              )}
            </ul>
          </div>
        )}

        {/* Generate Button */}
        {selectedQuestions.length > 0 && (
          <button
            onClick={handleGenerateQuestionPaper}
            className="mt-10 w-full px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl shadow-xl hover:bg-indigo-700 transition duration-300"
          >
            🎯 Add Questions
          </button>
        )}

        {/* Render QuestionPaper or Question based on examType */}
        {filters &&
          (["UNIT-1", "UNIT-2", "UNIT-3", "UNIT-4"].includes(filters.examType) ? (
            <QuestionPaper filters={filters} />
          ) : (
            <Question filters={filters} />
          ))}
      </div>
   
  );
};

export default QuestionPaperForm;
