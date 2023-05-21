import React, { FC, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  description: string;
  setDescription: any;
};

export const PostEditMarkdown: FC<Props> = ({ description, setDescription }) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <>
      <div className="mt-2 flex text-sm border justify-start w-fit rounded overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPreview(false);
          }}
          className={`py-2 px-3 ${isPreview ? "bg-white" : "bg-[#f6f8fa] pointer-events-none"}`}
        >
          書く
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPreview(true);
          }}
          className={`py-2 px-3 ${isPreview ? "bg-[#f6f8fa] pointer-events-none" : "bg-white"}`}
        >
          プレビュー
        </button>
      </div>
      <div className="mt-2 min-h-[186px]">
        {isPreview ? (
          <ReactMarkdown className="markDownContent text-sm px-2 py-5 w-full border-y border-[#d0d7de] bg-[#fff] min-h-[186px]">
            {description}
          </ReactMarkdown>
        ) : (
          <TextareaAutosize
            required
            minRows={6}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="text-sm p-2 w-full border border-[#d0d7de] bg-[#f6f8fa] rounded resize-none outline-none leading-7"
          />
        )}
      </div>
    </>
  );
};
