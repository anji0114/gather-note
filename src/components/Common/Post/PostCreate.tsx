import { FC, ReactNode, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { EditMarkdownMemo as EditMarkdown } from "@/components/Common/EditMarkdown";

type Props = {
  prevLink: string;
  title: string;
  icon: ReactNode;
  buttonText?: string;
  handleCreate: (name: string, description: string) => void;
};

export const PostCreate: FC<Props> = ({ prevLink, title, icon, buttonText, handleCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Layout>
      <LayoutContainer classes="py-14">
        <Link href={prevLink} className="flex items-center gap-1 hover:opacity-75">
          <ChevronLeftIcon className="w-5" />
          <span className="text-sm font-medium pb-[1px]">前に戻る</span>
        </Link>
        <div className="max-w-[900px] mt-10 mx-auto">
          <h2 className="flex items-center gap-2 text-lg font-bold border-b border-[#d0d7de] pb-5">
            <span className="w-8">{icon}</span>
            <span className="pb-[1px]">{title}</span>
          </h2>

          <div className="mt-10">
            <label htmlFor="" className="font-medium">
              タイトル
            </label>
            <input
              type="text"
              placeholder="タイトル"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="p-2 mt-2 w-full border border-[#d0d7de] bg-[#f6f8fa] rounded outline-none"
            />
          </div>

          <div className="mt-10">
            <label className="font-medium">説明</label>
            <div className="mt-5 border border-[#d0d7de] p-4 rounded">
              <EditMarkdown description={description} setDescription={setDescription} />
            </div>
          </div>
          <div className="text-right mt-3">
            <button
              className={`text-sm text-white py-2.5 px-5 rounded ${
                name && description
                  ? "bg-[#4e6bb4] hover:opacity-75"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!name || !description}
              onClick={() => handleCreate(name, description)}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </LayoutContainer>
    </Layout>
  );
};
