import { FC, ReactNode } from "react";
import { LayoutHeader } from "@/components/Layout/Header";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <LayoutHeader />
      <div className="py-24 min-h-[calc(100vh_-_150px)]">
        <div className="max-w-[1140px] w-full mx-auto px-7">{children}</div>
      </div>
      <LayoutFooter />
    </>
  );
};
