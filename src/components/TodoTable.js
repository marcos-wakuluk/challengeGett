import React from 'react';
import { useTable, usePagination } from 'react-table';
import { Row, Col, Button, Input } from 'reactstrap'
import { editTodo } from '../redux/todoSlice';

const TodoTable = ({
  columns,
  todoList,
  isEditing,
  editedTodo,
  todoToEdit,
  dispatch,
  setIsEditing,
  setEditedTodo,
  setTodoToEdit,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data: todoList,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    usePagination
  );

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  };

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
      <table {...getTableProps()} className="table table-bordered table-striped">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="align-middle">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Col md={3}>
          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            color='primary'
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input
            type='number'
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        <Col md={3}>
          <Button
            color='primary'
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {'>'}
          </Button>
          <Button
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TodoTable;
