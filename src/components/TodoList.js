import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { Row, Col, Button, Input } from 'reactstrap'
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { deleteTodo, editTodo } from '../redux/todoSlice';

const TodoList = () => {
  const todoList = useSelector((state) => state.todoList.value)
  const dispatch = useDispatch(); // Obtiene la función dispatch de Redux

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Completed',
      accessor: () => {
        return (
          <div className='input-group-text'>
            <Input className='form-check-input' type='checkbox' id='inlineCheckbox2' value='option2' />
          </div>)
      }
    },
    {
      Header: 'Editar',
      accessor: (todo) => {
        return (
          <div>
            <BsFillPencilFill onClick={() => dispatch(editTodo(todo))} />

          </div>
        )
      }
    },
    {
      Header: 'Eliminar',
      accessor: (todo) => {
        return (
          <div>
            <BsFillTrash3Fill onClick={() => dispatch(deleteTodo(todo.id))} />
          </div>
        )
      }
    },
  ], [])

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
  }

  return (
    <>
      <table {...getTableProps()} className="table table-bordered table-striped">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className="align-middle">{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table >
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
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 15, 20].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        <Col md={3}>
          <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
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
}

export default TodoList;
