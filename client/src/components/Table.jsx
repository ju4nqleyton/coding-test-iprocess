/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser, deleteUser } from "../services/users";

const columnHelper = createColumnHelper();

const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Full Name",
    cell: TableCell,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: TableCell,
  }),
];

export default function Table({ users }) {
  const [data, setData] = useState(() => [...users]);

  const updateValueUser = async (user) => {
    const data = await updateUser(user.id, user);
    if (data) {
      setToast("User updated");
    }
  };

  const deleteValue = async (id) => {
    const response = await deleteUser(id);
    if (response) {
      setToast("User deleted successfully");
    } else {
      toast.error("Error while deleting");
    }
  };

  const setToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        const originalValue = data[rowIndex][columnId];
        const validation = validateField(value, columnId);
        if (!validation) {
          toast.error("Invalid value for this field");
          setData((oldData) =>
            oldData.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...row,
                  [columnId]: originalValue,
                };
              }
              return { ...row };
            }),
          );
          return;
        } else {
          if (data[rowIndex][columnId] !== value) {
            const newValue = { ...data[rowIndex], [columnId]: value };
            updateValueUser(newValue);
          }
          setData((old) =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex],
                  [columnId]: value,
                };
              }
              return row;
            }),
          );
        }
      },
    },
  });

  const validateField = (value, fieldName) => {
    const stringRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fieldName === "name") {
      return stringRegex.test(value);
    } else if (fieldName === "email") {
      return emailRegex.test(value);
    } else {
      console.error("Invalid field name");
      return false;
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto mt-8 max-w-3xl">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#F75432] text-white">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
                <th className="px-4 py-2">Action</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => {
                      deleteValue(row.original.id);
                      setData((old) =>
                        old.filter((user) => user.id !== row.original.id),
                      );
                    }}
                    className="focus:shadow-outline rounded bg-red-700 px-4 py-2 text-xs text-white hover:bg-red-800 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
