import { Folder, Group, Note, Profile } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  folder: Folder;
  setFolder: (payload: Folder) => void;
  resetFolder: () => void;

  editNote: Note;
  setEditNote: (payload: Note) => void;
  resetEditNote: () => void;

  group: Group;
  setGroup: (payload: Group) => void;
  resetGroup: () => void;

  editProfile: Profile;
  setEditProfile: (payload: Profile) => void;
  resetEditProfile: () => void;
};

export const useStore = create<State>()(
  devtools((set) => ({
    folder: { id: "", name: "", description: "" },
    setFolder: (payload) => {
      set({
        folder: {
          id: payload.id,
          name: payload.name,
          description: payload.description,
        },
      });
    },
    resetFolder: () => {
      set({
        folder: {
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
    group: { id: "", name: "", description: "", owner_id: "", thumbnail_url: "", created_at: "" },
    setGroup: (payload) => {
      set({
        group: {
          id: payload.id,
          name: payload.name,
          description: payload.description,
          owner_id: payload.owner_id,
          thumbnail_url: payload.thumbnail_url,
          created_at: payload.created_at,
        },
      });
    },
    resetGroup: () => {
      set({
        group: {
          id: "",
          name: "",
          description: "",
          owner_id: "",
          thumbnail_url: "",
          created_at: "",
        },
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
