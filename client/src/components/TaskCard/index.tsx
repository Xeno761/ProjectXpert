"use client";

import { Task } from "@/state/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const pathname = usePathname();

  return pathname === `/projects/${task.projectId}` ? (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`https://pm-s3-images-aws.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? task.startDate.substring(0, 10) : "Not set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? task.dueDate.substring(0, 10) : "Not set"}
      </p>
      <p>
        <strong>Author:</strong>{" "}
        {task.author
          ? `${task.author.firstName} ${task.author.lastName}`
          : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee
          ? `${task.assignee.firstName} ${task.assignee.lastName}`
          : "Unassigned"}
      </p>
    </div>
  ) : (
    <Link href={`/projects/${task.projectId}`}>
      <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
        {task.attachments && task.attachments.length > 0 && (
          <div>
            <strong>Attachments:</strong>
            <div className="flex flex-wrap">
              {task.attachments && task.attachments.length > 0 && (
                <Image
                  src={`https://pm-s3-images-aws.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
                  alt={task.attachments[0].fileName}
                  width={400}
                  height={200}
                  className="rounded-md"
                />
              )}
            </div>
          </div>
        )}
        <p>
          <strong>ID:</strong> {task.id}
        </p>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {task.description || "No description provided"}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Tags:</strong> {task.tags || "No tags"}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {task.startDate ? task.startDate.substring(0, 10) : "Not set"}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {task.dueDate ? task.dueDate.substring(0, 10) : "Not set"}
        </p>
        <p>
          <strong>Author:</strong>{" "}
          {task.author
            ? `${task.author.firstName} ${task.author.lastName}`
            : "Unknown"}
        </p>
        <p>
          <strong>Assignee:</strong>{" "}
          {task.assignee
            ? `${task.assignee.firstName} ${task.assignee.lastName}`
            : "Unassigned"}
        </p>
      </div>
    </Link>
  );
};

export default TaskCard;
