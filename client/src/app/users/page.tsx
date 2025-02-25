"use client";
import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Link from "next/link";
import { User } from "lucide-react";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "First Name",
    width: 140,
    renderCell: (params) => (
      <Link href={`/users/${params.row.userId}`}>{params.row.firstName}</Link>
    ),
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 140,
    renderCell: (params) => (
      <Link href={`/users/${params.row.userId}`}>{params.row.lastName}</Link>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    width: 140,
    renderCell: (params) => (
      <Link href={`/users/${params.row.userId}`}>{params.row.role}</Link>
    ),
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 120,
    filterable: false,
    sortable: false,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          {params.value ? (
            <Link href={`/users/${params.row.userId}`}>
              <Image
                src={`https://pm-s3-images-aws.s3.us-east-1.amazonaws.com/${params.value}`}
                alt={`${params.row.firstName} ${params.row.lastName}`}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link href={`/users/${params.row.userId}`}>
              <User className="h-9 w-9 cursor-pointer self-center rounded-full dark:text-white" />
            </Link>
          )}
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;
