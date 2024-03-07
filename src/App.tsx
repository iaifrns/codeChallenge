import { useEffect, useState } from "react";
import { task, user } from "./types";
import { TaskUrl, UserUrl } from "./constance";

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(UserUrl);
      const users = (await response.json()) as user[];
      setUsers(users);
    } catch (e: any) {
      alert("an error occured in the code");
    } finally {
      setLoading(false);
    }
  };

  const fetchTask = async () => {
    setLoading(true);
    try {
      const response = await fetch(TaskUrl);
      const tasks = (await response.json()) as task[];
      setTasks(tasks);
    } catch (e: any) {
      alert("an error occured in the code");
    } finally {
      setLoading(false);
    }
  };

  const DisplayTasks = ({ state }: { state: string }) => {
    return (
      <>
        {tasks
          .filter((item) => item.state == state)
          .map((task) => (
            <div
              key={task.id}
              style={{
                padding: 4,
                border: "1px solid lightgray",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <div>{task.title}</div>
              <div
                style={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <img
                  src={
                    users.filter((user) => user.id == task.affected_user_id)[0]
                      .avatar
                  }
                  width={"50px"}
                  height={"50px"}
                />
                <span>
                  {
                    users.filter((user) => user.id == task.affected_user_id)[0]
                      .username
                  }
                </span>
              </div>
            </div>
          ))}
      </>
    );
  };

  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, []);

  if (loading) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <h3>TODO</h3>
          <DisplayTasks state="todo" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>DOING</h3>

          <DisplayTasks state="doing" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>DONE</h3>

          <DisplayTasks state="done" />
        </div>
      </div>
    </>
  );
}

export default App;
