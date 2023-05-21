export type Folder = {
  id: string;
  user_id?: string;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  deleted_flag?: boolean;
};

export type Note = {
  id: string;
  name: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  deleted_flag?: boolean;
};

export type Board = {
  id: string;
  name: string;
  description: string;
  group_id: string;
  created_at?: string;
};

export type Group = {
  id: string;
  name: string;
  owner_id?: string;
  thumbnail_url?: string;
  description: string;
  created_at?: string;
};

export type Profile = {
  id?: string;
  name: string;
  avatar_url: string;
};

export type Discussion = {
  id: string;
  board_id: string;
  name: string;
  description: string;
  created_at?: string;
};
