import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useAsyncDebounce,
} from "react-table";

import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import useRows from "./hooks/useRows";
import useColumns from "./hooks/useColumns";

function Tabla() {
  const [data, setData] = useState([]);
  const baseUrlFull = "https://digimon-api.vercel.app/api/digimon/";

  useEffect(() => {
    const fetchData = async () => {
      await fetch(baseUrlFull)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          /* console.log(data); */
        });
    };
    fetchData();
  }, []);

  const columns = useColumns();
  useRows(data);
  const table = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = table;

  return (
    <div>
      <table {...getTableProps()} className="w-full">
        <thead>
          <tr>
            <th colSpan={4}>
              <DigimonFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps()}
                      className="text-lg pb-2 pr-10 text-left"
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()} className="pb-2">
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className="flex items-center pt-2 flex-col">
        <span className="text-lg">
          Página&nbsp;
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <div className="px-3">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <BiFirstPage className="text-2xl" />
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <MdKeyboardArrowLeft className="text-2xl" />
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <MdKeyboardArrowRight className="text-2xl" />
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiLastPage className="text-2xl" />
          </button>{" "}
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="text-lg"
        >
          {[5, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize !== 10 ? `Mostrar ${pageSize}` : `Mostrar 10`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Tabla;

function DigimonFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const totalDigimonsDisponibles = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onFilterChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex justify-between">
      <h2
        className="text-xl tracking-widest 
      text-transparent bg-clip-text
      bg-gradient-to-r from-[#2e86c1] to-[#48c9b0]"
      >
        Buscar:
      </h2>
      <input
        size={25}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={`${totalDigimonsDisponibles} Digimons disponibles...`}
        className="text-right pl-2 font-normal ml-1 border rounded-lg"
      />
    </div>
  );
}
