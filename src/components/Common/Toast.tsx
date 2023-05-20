import { Dispatch, FC, SetStateAction, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import * as Toast from "@radix-ui/react-toast";

type Props = {
  text: string;
  color: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ToastComponent: FC<Props> = ({ text, color, open, setOpen }) => {
  return (
    <Toast.Provider swipeDirection="left" duration={3000}>
      <Toast.Root
        className="border border-[#fafafa] shadow rounded bg-white py-4 pl-4 pr-6 flex gap-4 ToastRoot"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className={`text-sm flex items-center gap-1 ${color}`}>
          <CheckCircleIcon className="w-5" />
          <span>{text}</span>
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className={`fixed transition z-50 bottom-2 right-0 p-5`} />
    </Toast.Provider>
  );
};
