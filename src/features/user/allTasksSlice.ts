import { createSlice } from "@reduxjs/toolkit";

export interface allTasksState {
  allTasks: Task[];
}
type Task = {
  id: string;
  task_name: string;
  task_date: string;
  action: string;
};
const initialState: allTasksState = {
  allTasks: [
    {
      id: "1",
      task_name: "Task 1",
      task_date: "Mon 08/08/2022",
      action: "Call My Father",
    },
    {
      id: "2",
      task_name: "Task 1",
      task_date: "Mon 08/08/2022",
      action: "Going to the park",
    },
  ],
};

export const allTasksSlice = createSlice({
  name: "allTasks",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      state.allTasks = action.payload;
    },
  },
});

export const { addNewTask } = allTasksSlice.actions;
export default allTasksSlice.reducer;
