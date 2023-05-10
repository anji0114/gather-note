import { format } from "date-fns";
import { FC } from "react";

export const DateFns: FC<{ time: string | undefined }> = ({ time }) => {
  return <>{time ? format(new Date(time), "yyy/MM/dd") : "///"}</>;
};
