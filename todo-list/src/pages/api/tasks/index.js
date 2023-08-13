import { dbConnect } from "@/utils/db";
import Task from "@/models/Task";

dbConnect();

export async function getTasks() {
  const tasks = await Task.find();
  return tasks;
}

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const tasks = await getTasks();
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const newTask = await Task.create(body);
        return res.status(201).json(newTask);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
