import { useStore } from "@/store";
import TextareaAutosize from "react-textarea-autosize";

export const NoteContent = ({ isAuthor }: { isAuthor: boolean }) => {
  const note = useStore((state) => state.editNote);
  const setNote = useStore((state) => state.setEditNote);

  return (
    <div className="max-w-[660px] mx-auto mt-16">
      <h1>
        {isAuthor ? (
          <TextareaAutosize
            value={note.name}
            minRows={1}
            placeholder="タイトル"
            className="w-full text-4xl font-bold outline-none resize-none"
            onChange={(e) => {
              setNote({ ...note, name: e.target.value });
            }}
          />
        ) : (
          <span className="w-full text-4xl font-bold">{note.name}</span>
        )}
      </h1>
      <p className="mt-10">
        <TextareaAutosize
          value={note.content}
          minRows={6}
          placeholder="内容を入力してください"
          className="w-full outline-none resize-none px-1 leading-8"
          onChange={(e) => {
            isAuthor ? setNote({ ...note, content: e.target.value }) : null;
          }}
        />
      </p>
    </div>
  );
};
