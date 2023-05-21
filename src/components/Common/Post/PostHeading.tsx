import { FC, ReactNode } from "react";


type Props = {
  children: ReactNode;
};

export const PostHeading: FC<Props> = ({ children }) => {
  return (
    <div className="pt-12 pb-10 bg-[#fcfcfc] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
};
