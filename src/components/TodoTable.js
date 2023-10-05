import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { Row, Col, Button, Input } from 'reactstrap';

const ELEMENT_TO_SHOW = [5, 10, 15, 20];

const TodoTable = ({
  columns,
  todoList,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

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
    state: { pageSize, pageIndex },
  } = useTable(
    {
      columns,
      data: todoList,
      initialState: { pageIndex: currentPage, pageSize: 5 },
    },
    usePagination
  );

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    setCurrentPage(page);
    gotoPage(page);
  };

  useEffect(() => {
    setCurrentPage(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    if (page.length === 0 && currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      gotoPage(newPage);
    }
  }, [page, currentPage, gotoPage]);

  return (
    <>
      <div style={{ maxHeight: '287px', minHeight: '287px', overflowY: 'auto', whiteSpace: 'nowrap', backgroundColor: 'white' }}>
        <table {...getTableProps()} className='table table-bordered table-striped m-0'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className='text-center ps-0 pe-0'
                    style={{
                      width: column.width,
                      position: 'sticky',
                      top: -1,
                      background: 'white',
                      zIndex: 1,
                    }}
                  >
                    {column.render('Header')}
                  </th>
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
                    <td
                      {...cell.getCellProps()}
                      className='align-middle text-center ps-0 pe-0'
                      style={{ width: cell.column.width }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Row className='mt-2' style={{ margin: '0 auto', textAlign: 'center' }}>
        <Col md={3}>
          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className='me-2'
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
            value={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {ELEMENT_TO_SHOW.map((pageSize) => (
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
            className='me-2'
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
