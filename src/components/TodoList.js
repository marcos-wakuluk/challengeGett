import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Label, Spinner, Button } from 'reactstrap';
import { addTodo, changeCompleted, editTodo, deleteTodo } from '../redux/todoSlice';
import TodoTable from './TodoTable';
import TodoForm from './TodoForm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';

const TodoList = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState('');
  const [todoToEdit, setTodoToEdit] = useState(null);
  const todoList = useSelector((state) => state.todoList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        dispatch(addTodo(data));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      Header: '#',
      accessor: 'id',
      headerClassName: 'text-center',
      width: 40,
    },
    {
      Header: 'Task',
      accessor: (todo) => {
        return (
          <>
            {isEditing && todo === todoToEdit ? (
              <input
                type='text'
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
                className='form-control'
              />
            ) : (
              <Label className={todo.completed ? 'text-decoration-line-through' : ''} >{todo.title}</Label>
            )}
          </>
        );
      },
      width: 1000,
    },
    {
      Header: 'Completed',
      accessor: (todo) => {
        return (
          <div className='d-flex justify-content-center text-center'>
            <Input
              type='checkbox'
              id='completed'
              checked={todo.completed}
              onChange={() => dispatch(changeCompleted(todo))}
              className='text-center'
            />
          </div>
        );
      },
      width: 100,
    },
    {
      Header: 'Edit',
      accessor: (todo) => {
        return (
          <div className='d-flex justify-content-center'>
            {isEditing && todo === todoToEdit ? (
              <Button
                type='button'
                color='primary'
                className='btn btn-primary'
                onClick={handleSaveEdit}
              >
                Save
              </Button>
            ) : (
              <BsFillPencilFill
                onClick={() => handleEditTodo(todo)}
                className='edit-icon'
                style={{ color: 'blue', cursor: 'pointer' }}
              />
            )}
          </div>
        );
      },
      width: 60,
    },
    {
      Header: 'Delete',
      accessor: (todo) => {
        return (
          <div className='d-flex justify-content-center'>
            <BsFillTrash3Fill
              onClick={() => dispatch(deleteTodo(todo.id))}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          </div>
        );
      },
      width: 60,
    },
  ];

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setEditedTodo(todo.title);
    setTodoToEdit(todo);
  };

  const handleSaveEdit = () => {
    const updatedTodo = { ...todoToEdit, title: editedTodo };
    dispatch(editTodo(updatedTodo));

    setIsEditing(false);
    setEditedTodo('');
    setTodoToEdit(null);
  };

  return (
    <div style={{ width: '100vh' }}>
      <h1 className='text-center mb-5 fw-bold'>Todo App</h1>
      {loading ? (
        <div className='text-center' style={{ height: '400px' }}>
          <Spinner color='primary' />
        </div>
      ) : (
        <>
          <TodoForm />
          <TodoTable
            columns={columns}
            todoList={todoList}
          />
        </>
      )}
    </div>
  );
};

export default TodoList;
