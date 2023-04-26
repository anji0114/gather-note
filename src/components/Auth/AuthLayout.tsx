import { FC, ReactNode } from "react";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";

type Props = {
  children: ReactNode;
  title: "ログイン" | "ユーザー登録";
};

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <LayoutHeader />
      <div className="max-w-[1140px] w-full mx-auto px-7">
        <div className="flex items-center justify-center py-20 min-h-[calc(100vh_-_140px)]">
          <div className="max-w-[350px] w-full">
            <h2 className="text-center text-xl font-bold">{title}</h2>
            {children}
          </div>
        </div>
      </div>
      <LayoutFooter />
    </>
  );
};
