import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  classes?: string;
};

export const LayoutContainer: FC<Props> = ({ children, classes }) => {
  return <div className={`max-w-[1140px] w-full mx-auto px-5 md:px-7 ${classes}`}>{children}</div>;
};
