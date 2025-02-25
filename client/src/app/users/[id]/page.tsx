"use client";

import Header from "@/components/Header";
import React from "react";
import { useGetUserQuery } from "@/state/api";

type Props = {
  params: { id: string };
};

const Profile = ({ params }: Props) => {
  const { id } = params;

  const { data } = useGetUserQuery(id);

  const userSettings = {
    firstName: data?.firstName || "Unknown",
    lastName: data?.lastName || "Unknown",
    companyName: data?.company || "Unknown",
    roleName: data?.role || "Unknown",
    cognitoId: data?.cognitoId || "Unknown",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-8">
      <Header name="User Details" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>First Name</label>
          <div className={textStyles}>{userSettings.firstName}</div>
        </div>
        <div>
          <label className={labelStyles}>Last Name</label>
          <div className={textStyles}>{userSettings.lastName}</div>
        </div>
        <div>
          <label className={labelStyles}>Company</label>
          <div className={textStyles}>{userSettings.companyName}</div>
        </div>
        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
        <div>
          <label className={labelStyles}>User ID</label>
          <div className={textStyles}>{userSettings.cognitoId}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
