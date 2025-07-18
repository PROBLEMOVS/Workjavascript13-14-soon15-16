import { useEffect, useState } from "react";
import "./content.css";

function Content({ data }) {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("task")) || [];
    setTasks(saved);
  }, []);


  useEffect(() => {
    if (data) {
      setTasks((prevTasks) => {
        const newTask = { info: data, done: false };
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem("task", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  }, [data]);


  const toggleDone = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
    localStorage.setItem("task", JSON.stringify(updated));
  };


  const deleteTask = (index) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
    localStorage.setItem("task", JSON.stringify(filtered));
  };

  return (
    <ul className="content">
      {tasks.map((task, index) => (
        <li key={index} className={task.done ? "done" : ""}>
          <span
            onClick={() => toggleDone(index)}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="Toggle done"
          >
            ✅
          </span>
          <span style={{ margin: "0 10px" }}>{task.info}</span>
          <span
            onClick={() => deleteTask(index)}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="Delete task"
          >
            ❌
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Content;