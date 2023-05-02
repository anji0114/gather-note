export type Folder = {
  id: string;
  name: string;
  description: string;
  created_at?: string;
};

export type Note = {
  id: string;
  name: string;
  content: string;
  created_at?: string;
};

export type Board = {
  id: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  created_at?: string;
};

export type Profile = {
  id?: string,
  name: string;
  avatar_url: string;
  updated_at?: string;
};
