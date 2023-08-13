import { createContext, useContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a Provider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [taskCount, setTaskCount] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/tasks`);
      const data = await res.json();
      setTaskCount(data.length);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TaskContext.Provider value={{ taskCount, setTaskCount }}>
      {children}
    </TaskContext.Provider>
  );
};
