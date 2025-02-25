"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Timeline from "../TimelineView";
import Table from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";
import { useGetProjectQuery } from "@/state/api";
import { ToastContainer } from "react-toastify";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const { data } = useGetProjectQuery(id);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setFilter={setFilter}
        name={data?.name ? data?.name : ""}
      />
      {activeTab === "Board" && (
        <Board
          id={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          filter={filter}
        />
      )}
      {activeTab === "List" && (
        <List
          id={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          filter={filter}
        />
      )}
      {activeTab === "Timeline" && (
        <Timeline
          id={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          filter={filter}
        />
      )}
      {activeTab === "Table" && (
        <Table
          id={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          filter={filter}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Project;
