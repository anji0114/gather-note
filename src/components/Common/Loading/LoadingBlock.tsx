import { LoadingCircle } from "@/components/Common/Loading/LoadingCircle";
import { FC } from "react";

export const LoadingBlock: FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <LoadingCircle />
    </div>
  );
};
