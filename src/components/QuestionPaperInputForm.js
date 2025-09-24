import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionPaperInputForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionTextTelugu, setQuestionTextTelugu] = useState("");
  const [questionType, setQuestionType] = useState("short");

  const [subjectName, setSubjectName] = useState("");
  const [year, setYear] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterSubject, setChapterSubject] = useState("");

  useEffect(() => {
    axios
      .get("https://tailwind-backend.vercel.app/api/subjects/")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      axios
        .get("https://tailwind-backend.vercel.app/api/chapters/")
        .then((res) => {
          const filteredChapters = res.data.filter(
            (chap) => chap.subject._id === selectedSubject
          );
          setChapters(filteredChapters);
        })
        .catch((err) => console.error("Error fetching chapters:", err));
    }
  }, [selectedSubject]);

  const handleAddSubject = async () => {
    if (!subjectName || !year) {
      alert("Please enter Subject Name and Year");
      return;
    }

    try {
      const newSubject = { name: subjectName, year: parseInt(year) };
      const response = await axios.post(
        "https://tailwind-backend.vercel.app/api/subjects/add",
        newSubject
      );
      setSubjects([...subjects, response.data]);
      alert("Subject added successfully!");
      setSubjectName("");
      setYear("");
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Failed to add subject");
    }
  };

  const handleAddChapter = async () => {
    if (!chapterSubject || !chapterName) {
      alert("Please select a subject and enter chapter name");
      return;
    }

    try {
      const newChapter = { name: chapterName, subject: chapterSubject };
      const response = await axios.post(
        "https://tailwind-backend.vercel.app/api/chapters/add",
        newChapter
      );
      setChapters([...chapters, response.data]);
      alert("Chapter added successfully!");
      setChapterName("");
      setChapterSubject("");
    } catch (error) {
      console.error("Error adding chapter:", error);
      alert("Failed to add chapter");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChapter || !questionText || !questionTextTelugu || !questionType) {
      alert("All fields are required");
      return;
    }

    try {
      const newQuestion = {
        chapter: selectedChapter,
        questionText,
        questionTextTelugu,
        type: questionType,
      };

      await axios.post("https://tailwind-backend.vercel.app/api/questions/add", newQuestion);
      alert("Question added successfully!");
      setQuestionText("");
      setQuestionTextTelugu("");
      setSelectedChapter("");
      setQuestionType("short");
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 mt-16">
      <div className="w-full max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-300">
        
        <h2 className="text-xl sm:text-2xl text-indigo-600 font-semibold text-center mb-6">
          Question Paper Input Form
        </h2>

        {/* Add Subject */}
        <div className="bg-gray-100 text-gray-950 p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium mb-3">Add New Subject</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
              className="p-2 border rounded w-full"
            />
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter Year (1 or 2)"
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={handleAddSubject}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            Add Subject
          </button>
        </div>

        {/* Add Chapter */}
        <div className="bg-gray-100 text-gray-950 p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium mb-3">Add New Chapter</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={chapterSubject}
              onChange={(e) => setChapterSubject(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              placeholder="Enter Chapter Name"
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={handleAddChapter}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            Add Chapter
          </button>
        </div>

        {/* Add Question */}
        <div className="bg-gray-100 text-gray-950 p-4 rounded-md shadow">
          <h3 className="text-lg font-medium mb-3">Add New Question</h3>
          <form onSubmit={handleSubmit} className="grid gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name} - {sub.year} Year
                  </option>
                ))}
              </select>

              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Select Chapter</option>
                {chapters.map((chap) => (
                  <option key={chap._id} value={chap._id}>
                    {chap.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter Question in English"
              className="p-2 border rounded w-full min-h-[80px]"
              required
            />
            <textarea
              value={questionTextTelugu}
              onChange={(e) => setQuestionTextTelugu(e.target.value)}
              placeholder="ప్రశ్నను తెలుగు లో నమోదు చేయండి"
              className="p-2 border rounded w-full min-h-[80px]"
              required
            />

            {/* Question Type */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="short"
                  checked={questionType === "short"}
                  onChange={() => setQuestionType("short")}
                  className="mr-2"
                />
                Short Answer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="long"
                  checked={questionType === "long"}
                  onChange={() => setQuestionType("long")}
                  className="mr-2"
                />
                Long Answer
              </label>
            </div>

            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded w-full sm:w-auto"
            >
              Add Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionPaperInputForm;
