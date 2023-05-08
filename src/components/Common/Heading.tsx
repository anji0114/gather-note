import React, { FC, ReactNode } from "react";

type Props = {
  text: string;
  icon: ReactNode;
  children?: ReactNode;
};

export const DashboardHeading: FC<Props> = ({ text, icon, children }) => {
  return (
    <div className="flex items-center justify-between py-[14px] px-5 border border-[#d0d7de] rounded-md bg-white min-h-[72px]">
      <h1 className="flex items-center gap-2.5">
        <span className="w-[30px]">{icon}</span>
        <span className="inline-block whitespace-nowrap font-medium">{text}</span>
      </h1>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
};
