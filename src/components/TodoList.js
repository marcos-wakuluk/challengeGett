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
    },
    {
      Header: 'Task',
      accessor: (todo) => {
        return (
          <>
            {isEditing && todo === todoToEdit ? (
              <input
                type="text"
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
                className="form-control"
              />
            ) : (
              <Label>{todo.title}</Label>
            )}
          </>
        );
      },
    },
    {
      Header: 'Completed',
      accessor: (todo) => {
        return (
          <div className="d-flex justify-content-center">
            <Input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => dispatch(changeCompleted(todo))}
            />
          </div>
        );
      },
    },
    {
      Header: 'Edit',
      accessor: (todo) => {
        return (
          <div className="d-flex justify-content-center">
            {isEditing && todo === todoToEdit ? (
              <Button
                type="button"
                color="primary"
                className="btn btn-primary"
                onClick={handleSaveEdit}
              >
                Save
              </Button>
            ) : (
              <BsFillPencilFill
                onClick={() => handleEditTodo(todo)}
                className="edit-icon"
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
        );
      },
    },
    {
      Header: 'Delete',
      accessor: (todo) => {
        return (
          <div className="d-flex justify-content-center">
            <BsFillTrash3Fill
              onClick={() => dispatch(deleteTodo(todo.id))}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          </div>
        );
      },
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
    <>
      {loading ? (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <>
          <TodoForm />
          <TodoTable
            columns={columns}
            todoList={todoList}
            isEditing={isEditing}
            editedTodo={editedTodo}
            todoToEdit={todoToEdit}
            dispatch={dispatch}
            setIsEditing={setIsEditing}
            setEditedTodo={setEditedTodo}
            setTodoToEdit={setTodoToEdit}
          />
        </>
      )}
    </>
  );
};

export default TodoList;
