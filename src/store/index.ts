import { Board, Discussion, Folder, Group, Note, Profile } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  folder: Folder;
  setFolder: (payload: Folder) => void;
  resetFolder: () => void;

  note: Note;
  setNote: (payload: Note) => void;
  resetNote: () => void;

  group: Group;
  setGroup: (payload: Group) => void;
  resetGroup: () => void;

  editProfile: Profile;
  setEditProfile: (payload: Profile) => void;
  resetEditProfile: () => void;

  board: Board;
  setBoard: (payload: Board) => void;

  discussion: Discussion;
  setDiscussion: (payload: Discussion) => void;
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
    note: { id: "", name: "", content: "" },
    setNote: (payload) => {
      set({
        note: {
          id: payload.id,
          name: payload.name,
          content: payload.content,
        },
      });
    },
    resetNote: () => {
      set({
        note: {
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

    // board
    board: { id: "", name: "", description: "", group_id: "", created_at: "" },
    setBoard: (payload) => {
      set({
        board: {
          id: payload.id,
          name: payload.name,
          description: payload.description,
          group_id: payload.group_id,
          created_at: payload.created_at,
        },
      });
    },

    // discussion
    discussion: { id: "", group_id: "", name: "", description: "", created_at: "" },
    setDiscussion: (payload) => {
      set({
        discussion: {
          id: payload.id,
          group_id: payload.group_id,
          name: payload.name,
          description: payload.description,
          created_at: payload.created_at,
        },
      });
    },
  }))
);
