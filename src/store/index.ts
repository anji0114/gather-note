import { Note } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  editNote: Note;
  setEditNote: (payload: Note) => void;
  resetEditNote: () => void;
};

export const useStore = create<State>()(
  devtools((set) => ({
    editNote: { id: "", title: "", description: "" },
    setEditNote: (payload) => {
      set({
        editNote: {
          id: payload.id,
          title: payload.title,
          description: payload.description,
        },
      });
    },
    resetEditNote: () => {
      set({
        editNote: {
          id: "",
          title: "",
          description: "",
        },
      });
    },
  }))
);
