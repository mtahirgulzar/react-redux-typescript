import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { addNewTask } from "../features/user/allTasksSlice";
import { addCurrentUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { allTasks } = useAppSelector((state: RootState) => state.allTasks);
  const [taskPopup, setTaskPopup] = useState(false);
  const [activeTask, setActiveTask] = useState("");
  
  useEffect(() => {
    if (currentUser?.userName) {
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, currentUser]);

  const deleteTask = (id: string) => {
    let dup = [...allTasks];
    dup = dup.filter((task) => task.id !== id);
    dispatch(addNewTask(dup));
  };

  const editTask = (task: any) => {
    setActiveTask(task);
    setTaskPopup(true);
  };

  return (
    <>
      <>
        <header className="flex items-center justify-between p-6">
          {currentUser?.userType !== "user" && <Link to="/users">Users</Link>}
          <button
            className="focus:ring-2 ml-auto focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-8"
            onClick={() => {
              dispatch(addCurrentUser({}));
              navigate("/login");
            }}
          >
            Logout
          </button>
        </header>
        <div className="container mx-auto">
          <div className="lg:ml-6 flex items-center justify-end">
            <button
              onClick={() => {
                setActiveTask("");
                setTaskPopup(true);
              }}
              className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm"
            >
              Create Task
            </button>
          </div>
          <h1 className="text-xl mb-8 mt-12 font-semibold">Create task</h1>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="pl-6 text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    ID
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Task name
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Task date
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Task
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTasks.map((task, idx) => (
                  <tr className="h-24 border-gray-300 border-b" key={idx}>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {task.id}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {task.task_name}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {task.task_date}
                    </td>
                    <td className="pr-8 relative ">{task.action}</td>
                    <td className="pr-8  w-32">
                      <div className="flex items-center relative">
                        <p
                          className="cursor-pointer"
                          onClick={() => editTask(task)}
                        >
                          Edit
                        </p>
                        <p
                          className="cursor-pointer ml-4"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
      {taskPopup && (
        <TaskPopup
          allTasks={allTasks}
          setTaskPopup={setTaskPopup}
          activeTask={activeTask}
        />
      )}
    </>
  );
};
export default Tasks;

const TaskPopup = ({
  allTasks,
  setTaskPopup,
  activeTask,
}: {
  allTasks: any;
  setTaskPopup: any;
  activeTask: any;
}) => {
  const [formData, setFormData] = useState({
    task_name: "",
    id: "",
    task_date: "",
    action: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTask) {
      setFormData(activeTask);
    }
  }, [activeTask]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTask) {
      let dup = [...allTasks];
      dup = dup.filter((task) => task.id !== activeTask.id);
      dup.push(formData);
      dup.reverse();
      dispatch(addNewTask(dup));
      setTaskPopup(false);
    } else {
      let dup = [...allTasks];
      dup.push(formData);
      dup.reverse();
      dispatch(addNewTask(dup));
      setTaskPopup(false);
    }
  };
  const actions = [
    "Going to the park",
    "Finish Homework",
    "Call My Father",
    "Bring gift to my sister birthday",
  ];
  return (
    <div className="max-w-md m-auto my-16 absolute w-full shadow-lg rounded-md inset-0 z-20 bg-white p-6">
      <h2 className="text-lg">Create task</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="my-4">
          <label>
            ID
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Name
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.task_name}
              onChange={(e) =>
                setFormData({ ...formData, task_name: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Date
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.task_date}
              onChange={(e) =>
                setFormData({ ...formData, task_date: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          Action
          <select
            defaultValue={formData?.action}
            required
            className="border border-gray-300 p-2 rounded ml-4"
            onChange={(e) =>
              setFormData({ ...formData, action: e.target.value })
            }
          >
            {actions.map((action: string) => {
              return (
                <option className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  {action}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className=" absolute bottom-6 right-6 ml-auto mr-6 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
