import React, { FC, ReactNode } from "react";

type Props = {
  text: string;
  icon: ReactNode;
  children?: ReactNode;
};

export const DashboardHeading: FC<Props> = ({ text, icon, children }) => {
  return (
    <div className="flex items-center justify-between py-2.5 px-2 min-h-[68px] border-y border-[#d0d7de]  bg-white md:min-h-[72px] md:px-5 md:py-[14px] md:border md:rounded-md">
      <h1 className="flex items-center gap-2.5">
        <span className="w-7 md:w-[30px]">{icon}</span>
        <span className="inline-block whitespace-nowrap font-medium">{text}</span>
      </h1>
      {children && children}
    </div>
  );
};
