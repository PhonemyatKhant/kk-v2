import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";
import React from "react";

const AlertDialog = ({
  message,
  type,
}: {
  message: string | undefined;
  type: "success" | "destructive" | undefined;
}) => {
  return (
    <div
      className={cn(" w-full p-8", {
        "bg-destructive/15 p-3  rounded-md flex items-center gap-x-2 text-sm text-destructive":
          type === "destructive",
        "bg-emerald-500/15 p-3  rounded-md flex items-center gap-x-2 text-sm text-emrald-500 ":
          type === "success",
      })}
    >
      <TriangleAlertIcon className=" h-4 w-4" />
      <p>{message} </p>
    </div>
  );
};

export default AlertDialog;
