import { format } from "date-fns";
import { FC } from "react";

export const DateFns: FC<{ time: string }> = ({ time }) => {
  if (!time) {
    return <>///</>;
  }

  return <>{format(new Date(time), "yyy/MM/dd")}</>;
};
