import { Form, Grid, Button } from "semantic-ui-react";

export default function TaskForm() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting");
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
          <Form onSubmit={handleSubmit}>
            <Form.Input label="Title" placeholder="Title" />
            <Form.TextArea label="Description" placeholder="Description" />
            <Button primary>Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
