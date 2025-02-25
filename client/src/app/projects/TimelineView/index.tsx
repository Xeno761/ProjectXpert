import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  filter: string;
};

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = ({ id, setIsModalNewTaskOpen, filter }: Props) => {
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

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const addTimeZoneOffset = (dateString: string): Date => {
    // Create a date object (in UTC)
    const date = new Date(dateString as string); // ISO format (UTC)

    // Get the user's local timezone offset in minutes (positive if behind UTC, negative if ahead)
    const timezoneOffset = date.getTimezoneOffset();

    // Convert the timezone offset to milliseconds
    const offsetInMilliseconds = timezoneOffset * 60 * 1000;

    // Get the UTC time in milliseconds
    const utcTimeInMilliseconds = date.getTime();

    // Add the timezone offset (in milliseconds) to the UTC time to get the local time
    return new Date(utcTimeInMilliseconds + offsetInMilliseconds);
  };

  const ganttTasks = useMemo(() => {
    return (
      filteredTasks?.map((task) => {
        const startDate = addTimeZoneOffset(task?.startDate as string);
        const endDate = addTimeZoneOffset(task?.dueDate as string);

        return {
          start: startDate,
          end: endDate,
          name: task.title,
          id: `Task-${task.id}`,
          type: "task" as TaskTypeItems,
          progress: task.points ? (task.points / 10) * 100 : 0,
          isDisabled: false,
        };
      }) || []
    );
  }, [filteredTasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div className="px-4 py-4 xl:px-6">Loading...</div>;
  if (error || !tasks) {
    return (
      <div className="px-4 py-4 xl:px-6">
        An error occurred while fetching tasks
      </div>
    );
  }
  if (filteredTasks?.length === 0) {
    return (
      <div className="px-4 py-4 xl:px-6">
        There are no tasks
      </div>
    );
  }

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="175px"
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
