import { TaskProvider } from "@/context/TasksContext";
import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <TaskProvider>
      <Navbar />
      <main style={{ padding: "25px" }}>{children}</main>
    </TaskProvider>
  );
}
