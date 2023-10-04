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
    },
    editTodo: (state, action) => {
      const { id, completed } = action.payload;
      const title = 'fue modificado';
      const todoIndex = state.value.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.value[todoIndex].title = title;
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter(todo => todo.id !== id);
    },
  }
})

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;