import Error from "next/error";
import { Grid } from "semantic-ui-react";

export default function TaskDetail({ task, error }) {
  if (error)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return { props: { task } };
  }
  return {
    props: { error: { statusCode: res.status, statusText: "Invalid id" } },
  };
}
