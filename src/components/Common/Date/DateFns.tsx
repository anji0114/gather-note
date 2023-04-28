import { format } from "date-fns";
import { FC } from "react";

export const DateFns: FC<{ time: string }> = ({ time }) => {
  return <>{format(new Date(time), "yyy/MM/dd")}</>;
};
