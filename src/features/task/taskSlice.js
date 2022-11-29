import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idCount: 3,
  tasks: [
    { id: 3, title: "TASK C", completed: false },
    { id: 2, title: "TASK B", completed: true },
    { id: 1, title: "TASK A", completed: false },
  ],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    newTask: (state, action) => {
      state.idCount++;
      // オブジェクトの生成
      const newItem = {
        id: state.idCount,
        // inputで入ってきた文字がpayloadで渡される予定
        title: action.payload,
        completed: false,
      };
      state.tasks = [newItem, ...state.tasks];
    },
    completeTask: (state, action) => {
      // 完了押されたタスクがactionのpayloadで渡される予定
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      // 該当の削除するオブジェクトがactionのpayloadで渡される予定
      // 削除するタスク以外のものをfilterで撮ってstateのtasksを上書きする
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

// dispatchして呼び出すためにexport
export const { newTask, completeTask, deleteTask } = taskSlice.actions;

// 現在のstateの中のcounterのvalueを取り出せるようにする。
export const selectTasks = (state) => state.task.tasks;

// counterSliceのreducerの情報をexport
// app/store.jsでimportできるように
export default taskSlice.reducer;
