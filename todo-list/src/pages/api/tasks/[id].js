import { dbConnect } from "@/utils/db";
import Task from "@/models/Task";

dbConnect();

export async function getTask(id) {
  const task = await Task.findById(id);
  return task;
}

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await getTask(id);
        if (!task) return res.status(404).json({ msg: "Task not found" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "PUT":
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updatedTask)
          return res.status(404).json({ msg: "Task not found" });
        return res.status(200).json(updatedTask);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask)
          return res.status(404).json({ msg: "Task not found" });
        return res.status(200).json(deletedTask);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
