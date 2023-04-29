import React from "react";
import { LoadingCircle } from "@/components/Common/Loading/LoadingCircle";

export const LoadingBlock = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <LoadingCircle />
    </div>
  );
};
