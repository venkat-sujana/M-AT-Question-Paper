import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CRUDComponent = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const [updatedSubject, setUpdatedSubject] = useState("");

  const [editingChapter, setEditingChapter] = useState(null);
  const [updatedChapter, setUpdatedChapter] = useState("");

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [updatedQuestion, setUpdatedQuestion] = useState({
    questionText: "",
    questionTextTelugu: "",
    type: "short",
  });

  const [filterSubject, setFilterSubject] = useState("");
  const [filterChapter, setFilterChapter] = useState("");
  const [filterQuestion, setFilterQuestion] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await fetchSubjects();
    await fetchChapters();
    await fetchQuestions();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchSubjects = async () => {
    const res = await axios.get("https://tailwind-backend.vercel.app/api/subjects");
    setSubjects(res.data);
  };

  const fetchChapters = async () => {
    const res = await axios.get("https://tailwind-backend.vercel.app/api/chapters");
    setChapters(res.data);
  };

  const fetchQuestions = async () => {
    const res = await axios.get("https://tailwind-backend.vercel.app/api/questions");
    setQuestions(res.data);
  };

  const addSubject = async () => {
    await axios.post("https://tailwind-backend.vercel.app/api/subjects", {
      name: newSubject,
    });
    fetchSubjects();
    setNewSubject("");
  };

  const deleteSubject = async (id) => {
    await axios.delete(`https://tailwind-backend.vercel.app/api/subjects/${id}`);
    fetchSubjects();
  };

  const startEditSubject = (subject) => {
    setEditingSubject(subject._id);
    setUpdatedSubject(subject.name);
  };

  const updateSubject = async () => {
    await axios.put(`https://tailwind-backend.vercel.app/api/subjects/${editingSubject}`, {
      name: updatedSubject,
    });
    fetchSubjects();
    setEditingSubject(null);
    setUpdatedSubject("");
  };

  const deleteChapter = async (id) => {
    await axios.delete(`https://tailwind-backend.vercel.app/api/chapters/${id}`);
    fetchChapters();
  };

  const startEditChapter = (chapter) => {
    setEditingChapter(chapter._id);
    setUpdatedChapter(chapter.name);
  };

  const updateChapter = async () => {
    console.log(
      `Updating chapter with id ${editingChapter} and name ${updatedChapter}`
    );
    await axios.put(`https://tailwind-backend.vercel.app/api/chapters/${editingChapter}`, {
      name: updatedChapter,
    });
    console.log("Updated chapter successfully");
    alert("Chapter updated successfully!");
    fetchChapters();
    setEditingChapter(null);
    setUpdatedChapter("");
  };

  const deleteQuestion = async (id) => {
    console.log(`Deleting question with id ${id}`);
    await axios.delete(`https://tailwind-backend.vercel.app/api/questions/${id}`);
    console.log("Deleted question successfully!");
    alert("Question deleted successfully!");
    fetchQuestions();
  };

  const startEditQuestion = (question) => {
    setEditingQuestion(question._id);
    setUpdatedQuestion({
      questionText: question.questionText,
      questionTextTelugu: question.questionTextTelugu,
      type: question.type,
    });
  };

  const updateQuestion = async () => {
    console.log(
      `Updating question with id ${editingQuestion} and updated question ${JSON.stringify(
        updatedQuestion
      )}`
    );
    await axios.put(`https://tailwind-backend.vercel.app/api/questions/${editingQuestion}`, {
      questionText: updatedQuestion.questionText,
      questionTextTelugu: updatedQuestion.questionTextTelugu,
      type: updatedQuestion.type,
    });
    console.log("Updated question successfully!");
    alert("Question updated successfully!");
    fetchQuestions();
    setEditingQuestion(null);
    setUpdatedQuestion({
      questionText: "",
      questionTextTelugu: "",
      type: "short",
    });
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(filterSubject.toLowerCase())
  );

  const filteredChapters = chapters.filter((chapter) =>
    chapter.name.toLowerCase().includes(filterChapter.toLowerCase())
  );

  const filteredQuestions = questions.filter((question) =>
    question.questionText.toLowerCase().includes(filterQuestion.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cyan-100 p-6">
      <h1 className="text-3xl mt-8 font-bold text-center text-gray-800 mb-8">
        M&AT CRUD OPERATIONS
      </h1>

      {/* Add Subject Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4"> Add Subject</h2>
        <div className="flex">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subject name"
          />
          <button
            onClick={addSubject}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {/* Filter and List Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subjects Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4"> 📚Subjects</h2>
          <input
            type="text"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter subjects"
          />
          {filterSubject && (
            <ul>
              {filteredSubjects.map((subject) => (
                <li
                  key={subject._id}
                  className="p-3 border border-gray-200 rounded-lg mb-2 hover:bg-gray-50 transition duration-200"
                >
                  {editingSubject === subject._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={updatedSubject}
                        onChange={(e) => setUpdatedSubject(e.target.value)}
                        className="flex-1 border border-gray-300 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={updateSubject}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span>{subject.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditSubject(subject)}
                          className="text-yellow-500 hover:text-yellow-600 transition duration-200"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteSubject(subject._id)}
                          className="text-red-500 hover:text-red-600 transition duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chapters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">📖Chapters</h2>
          <input
            type="text"
            value={filterChapter}
            onChange={(e) => setFilterChapter(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter chapters"
          />
          {filterChapter && (
            <ul>
              {filteredChapters.map((chapter) => (
                <li
                  key={chapter._id}
                  className="p-3 border border-gray-200 rounded-lg mb-2 hover:bg-gray-50 transition duration-200"
                >
                  {editingChapter === chapter._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={updatedChapter}
                        onChange={(e) => setUpdatedChapter(e.target.value)}
                        className="flex-1 border border-gray-300 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={updateChapter}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span>{chapter.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditChapter(chapter)}
                          className="text-yellow-500 hover:text-yellow-600 transition duration-200"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteChapter(chapter._id)}
                          className="text-red-500 hover:text-red-600 transition duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Questions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">❓Questions</h2>
          <input
            type="text"
            value={filterQuestion}
            onChange={(e) => setFilterQuestion(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter questions"
          />
          {filterQuestion && (
            <ul>
              {filteredQuestions.map((question) => (
                <li
                  key={question._id}
                  className="p-3 border border-gray-200 rounded-lg mb-2 hover:bg-gray-50 transition duration-200"
                >
                  {editingQuestion === question._id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={updatedQuestion.questionText}
                        onChange={(e) =>
                          setUpdatedQuestion({
                            ...updatedQuestion,
                            questionText: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Question (English)"
                      />
                      <input
                        type="text"
                        value={updatedQuestion.questionTextTelugu}
                        onChange={(e) =>
                          setUpdatedQuestion({
                            ...updatedQuestion,
                            questionTextTelugu: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Question (Telugu)"
                      />
                      <select
                        value={updatedQuestion.type}
                        onChange={(e) =>
                          setUpdatedQuestion({
                            ...updatedQuestion,
                            type: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="short">Short Question</option>
                        <option value="long">Long Question</option>
                      </select>
                      <button
                        onClick={updateQuestion}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">English:</span>
                        <span>{question.questionText}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Telugu:</span>
                        <span>{question.questionTextTelugu}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Type:</span>
                        <span>{question.type}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditQuestion(question)}
                          className="text-yellow-500 hover:text-yellow-600 transition duration-200"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteQuestion(question._id)}
                          className="text-red-500 hover:text-red-600 transition duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default CRUDComponent;
