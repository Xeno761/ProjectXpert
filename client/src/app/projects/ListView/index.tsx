import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  filter: string;
};

const ListView = ({ id, setIsModalNewTaskOpen, filter }: Props) => {
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
  if (error) return <div>An error occurred while fetching tasks</div>;
  if (filteredTasks?.length === 0) {
    return (
      <div className="px-4 py-4 xl:px-6">
        There are no tasks
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {filteredTasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ListView;
