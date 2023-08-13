import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Container, Button } from "semantic-ui-react";
import { useTasks } from "@/context/TasksContext";

export const Navbar = () => {
  const router = useRouter();
  const { taskCount } = useTasks();

  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Link href={"/"}>
            <h1>Task List</h1> <span>{taskCount} tasks</span>
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button color="green" onClick={() => router.push("/tasks/new")}>
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
