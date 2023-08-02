import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, Button, Confirm, Loader } from "semantic-ui-react";

export default function TaskDetail({ task, error }) {
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { query, push } = useRouter();

  const open = () => {
    setConfirm(true);
  };

  const close = () => {
    setConfirm(false);
  };

  if (error)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  const handleDelete = async () => {
    setIsLoading(true);
    const { id } = query;
    try {
      const url = process.env.PAGE_URL || "http://localhost:3000";
      await fetch(`${url}/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    close();
    push("/");
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <Button color="red" onClick={open} loading={isLoading}>
            Delete
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please confirm"
        content="Are you sure you want to delete this task?"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const url = process.env.PAGE_URL || "http://localhost:3000";
  const res = await fetch(`${url}/api/tasks/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return { props: { task } };
  }
  return {
    props: { error: { statusCode: res.status, statusText: "Invalid id" } },
  };
}
