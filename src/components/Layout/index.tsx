import { FC, ReactNode } from "react";
import { LayoutHeader } from "@/components/Layout/Header";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";

type Props = {
  children: ReactNode;
  classes?: string;
};

export const Layout: FC<Props> = ({ children, classes }) => {
  return (
    <>
      <LayoutHeader />
      <div className={`min-h-[calc(100vh_-_150px)] ${classes ? classes : ""}`}>{children}</div>
      <LayoutFooter />
    </>
  );
};
