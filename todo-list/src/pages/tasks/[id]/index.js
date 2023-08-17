import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, Button, Confirm, Loader, Divider } from "semantic-ui-react";
import { getTask } from "@/pages/api/tasks/[id]";
import { dbConnect } from "@/utils/db";
import { useTasks } from "@/context/TasksContext";

export async function getServerSideProps({ query: { id } }) {
  dbConnect();

  try {
    const res = await getTask(id);
    const task = JSON.parse(JSON.stringify(res));
    return { props: { task } };
  } catch (error) {
    return {
      props: { error: { statusCode: res.status, statusText: "Invalid id" } },
    };
  }
}

export default function TaskDetail({ task, error }) {
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { query, push } = useRouter();
  const { setTaskCount } = useTasks();

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
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    close();
    setTaskCount((prev) => prev - 1);
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
          <h3 style={{ margin: "3rem 0" }}>{task.description}</h3>
          <p>Last modified: {new Date(task.updatedAt).toLocaleDateString()}</p>
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
