import { FC, ReactNode } from "react";
import { Layout } from "../Layout";
import { LayoutContainer } from "../Layout/LayoutContainer";

type Props = {
  children: ReactNode;
  title: "ログイン" | "ユーザー登録";
};

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <Layout classes="py-20">
      <LayoutContainer>
        <div className="flex  justify-center">
          <div className="max-w-[350px] w-full">
            <h2 className="text-center text-xl font-bold">{title}</h2>
            {children}
          </div>
        </div>
      </LayoutContainer>
    </Layout>
  );
};
