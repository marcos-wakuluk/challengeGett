import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Spinner } from 'reactstrap';
import { addTodo, changeCompleted, editTodo, deleteTodo } from '../redux/todoSlice';
import TodoTable from './TodoTable';
import TodoForm from './TodoForm';
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const TodoList = () => {
  const [loading, setLoading] = useState(true);
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
      accessor: 'id'
    },
    {
      Header: 'Task',
      accessor: 'title',
    },
    {
      Header: 'Completed',
      accessor: (todo) => {
        return (
          <div className='d-flex justify-content-center'>
            <Input type='checkbox' id='completed' checked={todo.completed} onChange={() => dispatch(changeCompleted(todo))} />
          </div>)
      }
    },
    {
      Header: 'Edit',
      accessor: (todo) => {
        return (
          <div className='d-flex justify-content-center'>
            <BsFillPencilFill
              onClick={() => dispatch(editTodo(todo))}
              style={{ color: 'blue', cursor: 'pointer' }}
            />
          </div>
        )
      }
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
        )
      }
    },
  ]

  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <>
          <TodoForm />
          <TodoTable columns={columns} data={todoList} />
        </>
      )}
    </>
  );
};

export default TodoList;

