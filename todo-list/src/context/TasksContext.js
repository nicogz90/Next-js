import { createContext, useContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const useTasks = () => {
  const values = useContext(TaskContext);
  if (!values) throw new Error("useTasks must be used within a Provider");
  return values;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tasks]);

  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
};
