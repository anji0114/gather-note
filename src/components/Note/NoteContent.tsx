import { useStore } from "@/store";
import TextareaAutosize from "react-textarea-autosize";

export const NoteContent = ({ isAuthor }: { isAuthor: boolean }) => {
  const note = useStore((state) => state.note);
  const setNote = useStore((state) => state.setNote);

  return (
    <div className="max-w-[700px] mx-auto py-16 px-5">
      <h1 className="text-2xl sm:text-4xl">
        {isAuthor ? (
          <TextareaAutosize
            value={note.name}
            minRows={1}
            placeholder="タイトル"
            className="w-full leading-snug font-bold outline-none resize-none"
            onChange={(e) => {
              setNote({ ...note, name: e.target.value });
            }}
          />
        ) : (
          <span className="w-full leading-snug font-bold">{note.name}</span>
        )}
      </h1>
      <p className="mt-10">
        <TextareaAutosize
          value={note.content}
          minRows={6}
          placeholder={`${isAuthor ? "内容を入力してください" : ""}`}
          className="w-full outline-none resize-none px-1 leading-8"
          onChange={(e) => {
            isAuthor ? setNote({ ...note, content: e.target.value }) : null;
          }}
        />
      </p>
    </div>
  );
};
