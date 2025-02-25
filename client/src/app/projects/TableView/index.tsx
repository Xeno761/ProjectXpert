import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  filter: string;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
    renderCell: (params) => params?.row?.startDate.substring(0, 10),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
    renderCell: (params) => params?.row?.dueDate.substring(0, 10),
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) =>
      params?.row?.author?.firstName && params?.row?.author?.lastName
        ? `${params?.row?.author?.firstName} ${params?.row?.author?.lastName}`
        : "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) =>
      params?.row?.assignee?.firstName && params?.row?.assignee?.lastName
        ? `${params?.row?.assignee?.firstName} ${params?.row?.assignee?.lastName}`
        : "Unknown",
  },
];

const TableView = ({ id, setIsModalNewTaskOpen, filter }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  const filteredTasks = tasks?.filter(
    (task) =>
      filter === "" ||
      task?.title?.toLowerCase().includes(filter.toLowerCase()) ||
      task?.description?.toLowerCase().includes(filter.toLowerCase()) ||
      task?.status?.toLowerCase().includes(filter.toLowerCase()) ||
      task?.priority?.toLowerCase().includes(filter.toLowerCase()) ||
      task?.tags?.toLowerCase().includes(filter.toLowerCase()),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;
  if (filteredTasks?.length === 0) {
    return (
      <div className="px-4 py-4 xl:px-6">
        There are no tasks
      </div>
    );
  }

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={filteredTasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default TableView;
