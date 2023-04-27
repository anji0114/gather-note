import { Note, Page } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  editNote: Note;
  setEditNote: (payload: Note) => void;
  resetEditNote: () => void;

  editPage: Page;
  setEditPage: (payload: Page) => void;
  resetEditPage: () => void;
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

    // page
    editPage: { id: "", title: "", content: "" },
    setEditPage: (payload) => {
      set({
        editPage: {
          id: payload.id,
          title: payload.title,
          content: payload.content,
        },
      });
    },
    resetEditPage: () => {
      set({
        editPage: {
          id: "",
          title: "",
          content: "",
        },
      });
    },
  }))
);
