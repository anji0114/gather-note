import { Folder, Note } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  editFolder: Folder;
  setEditFolder: (payload: Folder) => void;
  resetEditFolder: () => void;

  editNote: Note;
  setEditNote: (payload: Note) => void;
  resetEditNote: () => void;
};

export const useStore = create<State>()(
  devtools((set) => ({
    editFolder: { id: "", name: "", description: "" },
    setEditFolder: (payload) => {
      set({
        editFolder: {
          id: payload.id,
          name: payload.name,
          description: payload.description,
        },
      });
    },
    resetEditFolder: () => {
      set({
        editFolder: {
          id: "",
          name: "",
          description: "",
        },
      });
    },

    // Note
    editNote: { id: "", name: "", content: "" },
    setEditNote: (payload) => {
      set({
        editNote: {
          id: payload.id,
          name: payload.name,
          content: payload.content,
        },
      });
    },
    resetEditNote: () => {
      set({
        editNote: {
          id: "",
          name: "",
          content: "",
        },
      });
    },
  }))
);
