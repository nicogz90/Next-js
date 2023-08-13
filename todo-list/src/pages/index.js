import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import { getTasks } from "@/pages/api/tasks";
import { dbConnect } from "@/utils/db";

export async function getServerSideProps(ctx) {
  dbConnect();
  const res = await getTasks();
  const tasks = JSON.parse(JSON.stringify(res));
  return { props: { tasks } };
}

export default function Home({ tasks }) {
  const router = useRouter();

  if (!tasks)
    return (
      <Grid verticalAlign="middle" style={{ height: "80vh" }}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h2>No tasks yet</h2>
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1689891710~exp=1689892310~hmac=4ba207f85e5e35ebb824070877dbaf3f644914a384858c77c9fc405c78473bda"
              alt="No tasks"
              width={350}
            />
            <div>
              <Button color="light">Create a Task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Container>
      <Card.Group stackable itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => router.push(`/tasks/${task._id}`)}>
                View
              </Button>
              <Button
                primary
                onClick={() => router.push(`/tasks/${task._id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
