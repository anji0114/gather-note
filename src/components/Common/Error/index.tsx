import { FC, ReactNode } from "react";

export const Error: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#fdfeff]">
      <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </div>
  );
};
