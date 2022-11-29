import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import taskReducer from "../features/task/taskSlice";
import fetchReducer from "../features/fetch/fetchSlice";

export const store = configureStore({
  reducer: {
    // 先頭のものがsliceを識別するための名前
    // 複数のreducerをまとめて1つのstoreにする
    counter: counterReducer,
    task: taskReducer,
    fetch: fetchReducer,
  },
});
