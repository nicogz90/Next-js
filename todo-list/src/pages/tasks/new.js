import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Grid, Button } from "semantic-ui-react";

export default function TaskForm() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });
  const { query, push } = useRouter();

  const getTask = async () => {
    const res = await fetch(
      `${process.env.PAGE_URL}/api/tasks/${query.id}` ||
        `http://localhost:3000/api/tasks/${query.id}`
    );
    const { title, description } = await res.json();
    setNewTask({ title, description });
  };

  useEffect(() => {
    if (query.id) {
      getTask();
    }
  }, []);

  const validate = () => {
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";
    return errors;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    if (!query.id) {
      await createTask();
    } else {
      await updateTask();
    }
    push("/");
  }

  const createTask = async () => {
    try {
      await fetch(
        `${process.env.PAGE_URL}/api/tasks` ||
          "http://localhost:3000/api/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(
        `${process.env.PAGE_URL}/api/tasks/${query.id}` ||
          `http://localhost:3000/api/tasks/${query.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{query.id ? "Edit Task" : "Create Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              autoFocus
              error={
                errors.title
                  ? { content: "Please enter title", pointing: "below" }
                  : null
              }
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              error={
                errors.description
                  ? { content: "Please enter description", pointing: "below" }
                  : null
              }
            />
            <Button primary>{query.id ? "Update" : "Create"}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
