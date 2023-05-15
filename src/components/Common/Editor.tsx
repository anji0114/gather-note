import { Discussion, Note } from "@/types";
import { FC } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  isEditor: boolean;
  post: Note | Discussion;
  setPost: (payload: Note | Discussion) => void;
};

export const Editor: FC<Props> = ({ isEditor, post, setPost }) => {
  return (
    <div className="max-w-[700px] mx-auto pt-16 pb-48 px-5">
      <h1 className="text-2xl sm:text-4xl">
        {isEditor ? (
          <TextareaAutosize
            value={post.name}
            minRows={1}
            placeholder="タイトル"
            className="w-full leading-snug font-bold outline-none resize-none"
            onChange={(e) => {
              setPost({ ...post, name: e.target.value });
            }}
          />
        ) : (
          <span className="w-full leading-snug font-bold">{post.name}</span>
        )}
      </h1>
      <p className="mt-10">
        <TextareaAutosize
          value={post.content}
          minRows={6}
          placeholder={`${isEditor ? "内容を入力してください" : ""}`}
          className="w-full outline-none resize-none px-1 leading-8"
          onChange={(e) => {
            isEditor ? setPost({ ...post, content: e.target.value }) : null;
          }}
        />
      </p>
    </div>
  );
};
