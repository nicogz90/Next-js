import { useRouter } from "next/router";
import { useState } from "react";
import { Form, Grid, Button } from "semantic-ui-react";

export default function TaskForm() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });
  const router = useRouter();

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

    await createTask();
    router.push("/");
  }

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
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
          <h1>Create Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
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
              onChange={handleChange}
              error={
                errors.description
                  ? { content: "Please enter description", pointing: "below" }
                  : null
              }
            />
            <Button primary>Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
