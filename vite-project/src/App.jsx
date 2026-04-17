import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from "./components/Header";

function App() {
  const [tasks, setTasks] = useState({ todo: [], done: [] });
  const [inputValue, setInputValue] = useState("");

  // Add Task
  const addTask = () => {
    if (inputValue.trim() === "") return; // empty tasks
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, { id: Date.now(), text: inputValue }],
    }));
    setInputValue(""); // clear input after adding
  };

  // Delete Task
  const deleteTask = (id, column) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== id),
    }));
  };
  // Move Task 
  const moveTask = (id, from, to) => {
    const task = tasks[from].find((t) => t.id === id);
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== id),
      [to]: [...prev[to], task],
    }));
  };
  return (
    <div className=" flex-col bg-[linear-gradient(135deg,#4a3b7c,#7b4f9e,#c17ab0)] min-h-screen">
        <Header/>
        <div className="flex justify-between gap-3 p-3 font-semibold text-gray-300">
          {/* To Do Column */}
          <div className="flex-1 flex-col align-middle gap-3 rounded-2xl px-3 py-2 bg-black">
            <div className="px-3 py-2">
              <p>To Do</p>
            </div>
            {/* Render To Do Cards */}
            {tasks.todo.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-600/50 mb-2">
                <div className="px-2">
                  <p>{task.text}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => moveTask(task.id, "todo", "done")}
                    className="hover:bg-gray-600/50 hover:rounded-lg p-2 transition-all duration-300">
                    <p>Move to Done</p>
                  </button>
                  <button
                    onClick={() => deleteTask(task.id, "todo")}
                    className="hover:bg-gray-600/50 hover:rounded-full p-2 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Input */}
            <input
              className="px-3 py-2 text-gray-300 font-normal w-full h-12 rounded-lg bg-gray-800 mt-2"
              type="text"
              placeholder="Enter a title or paste a link"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()} // add on Enter key too
            />
            <button
              onClick={addTask}
              className="flex hover:bg-gray-600/50 hover:rounded-lg px-2 py-2 transition-all duration-300 gap-2 w-full mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p>Add Task</p>
            </button>
          </div>

          <div className="flex-1 rounded-2xl px-6 py-4 bg-black">
            <div className="px-3 py-2">
              <p>In Progress</p>
            </div>
          </div>
          {/* Done Column */}
          <div className="flex-1 rounded-2xl px-6 py-4 bg-black">
            <div className="px-3 py-2">
              <p>Done</p>
            </div>
            {/* Render Done Cards */}
            {tasks.done.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-600/50 mb-2">
                <div className="px-2">
                  <p>{task.text}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => moveTask(task.id, "done", "todo")}
                    className="hover:bg-gray-600/50 hover:rounded-lg p-2 transition-all duration-300">
                    <p>Move to To Do</p>
                  </button>
                  <button
                    onClick={() => deleteTask(task.id, "done")}
                    className="hover:bg-gray-600/50 hover:rounded-full p-2 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default App