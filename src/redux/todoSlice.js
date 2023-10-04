import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
}

export const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = action.payload;
      state.value = todo
    }
  }
})

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;