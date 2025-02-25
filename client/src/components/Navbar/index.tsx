import { useEffect } from "react";
import { Menu, Moon, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed, setCurrentUser } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: currentUser, isSuccess } = useGetAuthUserQuery({});

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUser(currentUser));
    }
  }, [isSuccess]);

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(setCurrentUser(null));
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 dark:hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
        <div className="hidden items-center justify-between md:flex">
          <Link href="/profile" className="flex items-center">
            <div className="align-center flex h-9 w-9 justify-center">
              {!!currentUserDetails?.profilePictureUrl ? (
                <Image
                  src={`https://pm-s3-images-aws.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                  alt={
                    `${currentUserDetails?.firstName} ${currentUserDetails?.lastName}` ||
                    "User Profile Picture"
                  }
                  width={100}
                  height={50}
                  className="h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
              )}
            </div>
            <span className="ml-0 mr-7 text-gray-800 dark:text-white">
              {currentUser?.userDetails?.firstName}{" "}
              {currentUser?.userDetails?.lastName}
            </span>
          </Link>
          <button
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
