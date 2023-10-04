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
    addNewTodo: (state, action) => {
      const todo = action.payload;
      if (!Array.isArray(state.value)) {
        state.value = [];
      }
      state.value.push(todo);
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const todoIndex = state.value.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.value[todoIndex].title = title;
      }
    },
    changeCompleted: (state, action) => {
      const { id } = action.payload;
      const todoIndex = state.value.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.value[todoIndex].completed = !state.value[todoIndex].completed;
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter(todo => todo.id !== id);
    },
  }
})

export const { addTodo, editTodo, deleteTodo, changeCompleted, addNewTodo } = todoSlice.actions;

export default todoSlice.reducer;