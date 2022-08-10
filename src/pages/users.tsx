import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { addCurrentUser } from "../features/user/userSlice";

const Users = () => {
  //   const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { allUsers } = useAppSelector((state: RootState) => state.allUsers);
  //   dispatch(addCurrentUser({}));
  console.log("===>>> user info is here", currentUser);
  console.log("===>>> allUsers are here", allUsers);
  useEffect(() => {
    if (currentUser?.userName) {
      if (currentUser?.userType === "user") {
        navigate("/tasks", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, currentUser]);
  const dispatch = useAppDispatch();
  return (
    <>
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center">
          {<Link to="/tasks">Tasks</Link>}
        </div>
        <button
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-8"
          onClick={() => {
            dispatch(addCurrentUser({}));
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>
      <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8">
              {/* <th className="pl-6 text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    ID
                  </th> */}
              <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Username
              </th>
              <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                User Type
              </th>
              <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Active Status
              </th>
              <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Create Date
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr className="h-24 border-gray-300 border-b">
                {/* <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {user.id}
                    </td> */}
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                  {user.userName}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                  {user.userType}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                  {user.active}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                  {user.createDate}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                  {user.createDate}
                </td>
                {/* <td className="pr-8 relative ">{task.action}</td> */}
                {/* <td className="pr-8  w-32">
                  <div className="flex items-center relative">
                    <p
                      className="cursor-pointer"
                    >
                      Edit
                    </p>
                    <p
                      className="cursor-pointer ml-4"
                    >
                      Delete
                    </p>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Users;
