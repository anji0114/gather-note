import { Dispatch, FC, SetStateAction, useState } from "react";
import { EditMarkdown } from "@/components/Common/EditMarkdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import { DeleteDialog } from "../DeleteDialog";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type Post = {
  name: string;
  description: string;
};

type Props = {
  post: Post;
  parentName?: string;
  parentHref?: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  handleDelete: () => void;
  handleUpdate: () => void;
  deleteDialogTitle?: string;
  deleteDialogDescription?: string;
  isAdmin: boolean;
};

export const PostHeading: FC<Props> = ({
  post,
  parentName,
  parentHref,
  name,
  setName,
  description,
  setDescription,
  handleDelete,
  handleUpdate,
  deleteDialogTitle,
  deleteDialogDescription,
  isAdmin,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="pt-12 pb-10 bg-[#fcfcfc] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative">
            <div className="sm:w-[calc(100%_-_120px)]">
              {isEdit && isAdmin ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="タイトル"
                  className="p-2 w-full border border-[#d0d7de] bg-white rounded outline-none"
                />
              ) : (
                <h1 className="text-lg md:text-xl font-bold leading-tight">
                  {parentName && parentHref && (
                    <>
                      <Link
                        href={parentHref}
                        className="text-[#4E6BB4] underline-offset-2 underline hover:opacity-80"
                      >
                        {parentName}
                      </Link>
                      <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
                    </>
                  )}
                  {post.name}
                </h1>
              )}
            </div>
            {isAdmin && (
              <button
                className={`mt-2 py-1 px-3 text-sm rounded border ${
                  isEdit ? "border-[#222] bg-gray-50" : "border-[#D0D7DE] bg-white"
                } sm:absolute sm:right-0 sm:top-0 sm:mt-0`}
                onClick={() => {
                  setIsEdit((prevState) => !prevState);
                }}
              >
                {isEdit ? "キャンセル" : "編集する"}
              </button>
            )}

            <div className="mt-10 bg-white border border-[#f0f0f0] p-5 rounded-sm">
              {isEdit && isAdmin ? (
                <>
                  <EditMarkdown description={description} setDescription={setDescription} />
                  <div className="flex justify-between mt-2">
                    <button
                      className="text-sm py-2 px-5 text-[#DE6868] bg-white border border-[#DE6868] rounded hover:bg-red-50"
                      onClick={() => setShowDialog(true)}
                    >
                      削除する
                    </button>
                    <button
                      className={`text-sm text-white py-2 px-5 rounded ${
                        name && description
                          ? "bg-[#4e6bb4] hover:opacity-75"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        handleUpdate();
                        setIsEdit(false);
                      }}
                      disabled={!name || !description}
                    >
                      保存する
                    </button>
                  </div>
                </>
              ) : (
                <ReactMarkdown
                  className="markdownContent text-sm"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                >
                  {post.description}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteDialog
        title={deleteDialogTitle ? deleteDialogTitle : `「${post.name}」を削除する`}
        description={deleteDialogDescription}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};
