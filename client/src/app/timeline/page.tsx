"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetProjectsQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const getCompletionPercentage = (
    startDate: string,
    endDate: string,
  ): number => {
    // Convert the start and end dates to JavaScript Date objects
    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);

    // Get the current date
    const currentDate: Date = new Date();

    // Calculate the total duration (in milliseconds)
    const totalDuration: number = end.getTime() - start.getTime();

    // Calculate the duration between the start date and the current date
    const currentDuration: number = currentDate.getTime() - start.getTime();

    // Calculate the percentage completion
    let percentage: number = (currentDuration / totalDuration) * 100;

    // Ensure the percentage is within the range 0 to 100
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    // Round down to the nearest 10th percent
    percentage = Math.floor(percentage / 10) * 10;

    return percentage; // return the rounded percentage
  };

  const ganttTasks = useMemo(() => {
    const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
    return (
      projects?.map((project) => {
        return {
          start: new Date(
            Date.parse(project.startDate as string) + userTimezoneOffset,
          ),
          end: new Date(
            Date.parse(project.endDate as string) + userTimezoneOffset,
          ),
          name: project.name,
          id: `Project-${project.id}`,
          type: "project" as TaskTypeItems,
          progress:
            project?.endDate && project?.startDate
              ? getCompletionPercentage(project?.startDate, project?.endDate)
              : 0,
          isDisabled: false,
        };
      }) || []
    );
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
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
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="185px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
