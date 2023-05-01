import { Folder, Group, Note, Profile } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  editFolder: Folder;
  setEditFolder: (payload: Folder) => void;
  resetEditFolder: () => void;

  editNote: Note;
  setEditNote: (payload: Note) => void;
  resetEditNote: () => void;

  editGroup: Group;
  setEditGroup: (payload: Group) => void;
  resetEditGroup: () => void;

  editProfile: Profile;
  setEditProfile: (payload: Profile) => void;
  resetEditProfile: () => void;
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

    // group
    editGroup: { id: "", name: "", description: "" },
    setEditGroup: (payload) => {
      set({
        editGroup: {
          id: payload.id,

          name: payload.name,
          description: payload.description,
        },
      });
    },
    resetEditGroup: () => {
      set({
        editGroup: { id: "", name: "", description: "" },
      });
    },

    // profile
    editProfile: { name: "", avatar_url: "" },
    setEditProfile: (payload) => {
      set({
        editProfile: {
          name: payload.name,
          avatar_url: payload.avatar_url,
        },
      });
    },
    resetEditProfile: () => {
      set({
        editProfile: {
          name: "",
          avatar_url: "",
        },
      });
    },
  }))
);
