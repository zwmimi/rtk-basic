import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// createAsyncThunkはReduxでいうRedux-Thunk 非同期を扱える
import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

// 非同期処理はSliceの外に書く
// スライス名/メソッド名が多い
export const fetchAsyncGet = createAsyncThunk("fetch/get", async () => {
  const res = await axios.get(apiUrl);
  return res.data;
});

const fetchSlice = createSlice({
  name: "fetch",
  initialState: { users: [] },
  reducers: {},
  // 非同期処理のreducerはextraReducersとなる。自動でactionを返す。
  // 成功した処理はfulfilled
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        // fetchAsyncGetのreturn内容がpayloadに渡される
        users: action.payload,
      };
    });
  },
});

export const selectUsers = (state) => state.fetch.users;
export default fetchSlice.reducer;
