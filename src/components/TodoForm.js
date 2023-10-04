import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo } from '../redux/todoSlice';

const TodoForm = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList.value);

  const handleAddTodo = () => {
    if (newTodoTitle.trim() !== '') {
      const newTodo = {
        id: todoList.length + 1,
        userId: 1,
        title: newTodoTitle,
        completed: false,
      };

      dispatch(addNewTodo(newTodo));

      setNewTodoTitle('');
    }
  };

  return (
    <div className='d-flex mb-2'>
      <Input
        className='me-2'
        type='text'
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value)}
      />
      <Button
        type='button'
        color="primary"
        className='flex-lg-shrink-0'
        onClick={() => handleAddTodo()}
      >
        Add task
      </Button>
    </div>
  );
};

export default TodoForm;
