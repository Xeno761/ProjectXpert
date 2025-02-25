import { User } from "@/state/api";
import { User as UserImage } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <Link href={`/users/${user.userId}`}>
      <div className="flex items-center gap-3 rounded border p-4 shadow">
        {user.profilePictureUrl ? (
          <Image
            src={`https://pm-s3-images-aws.s3.us-east-1.amazonaws.com/${user.profilePictureUrl}`}
            alt="profile picture"
            width={32}
            height={32}
            className="h-[32px] w-[32px] rounded-full object-cover"
          />
        ) : (
          <UserImage className="h-[32px] w-[32px] cursor-pointer self-center rounded-full dark:text-white" />
        )}
        <div>
          <p className="dark:text-white">
            {user.firstName} {user.lastName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
