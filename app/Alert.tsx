import { event } from "nextjs-google-analytics";
import { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

export const Alert = ({
  message = "An error occurred. Please try again later.",
}: {
  message?: string;
}) => {
  useEffect(() => {
    event("show-alert");
  }, []);

  return (
    <div
      className="flex items-center p-4 mb-10 text-sm text-red-800 bg-red-200 rounded-full gap-x-3"
      role="alert"
    >
      <IoCloseCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};
