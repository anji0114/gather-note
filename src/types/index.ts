type CommonProps = {
  id: string;
  name: string;
  description: string;
  created_at?: string;
};

export type Folder = CommonProps & {
  user_id?: string;
  updated_at?: string;
  deleted_flag?: boolean;
};

export type Board = CommonProps & {
  group_id: string;
};

export type Group = CommonProps & {
  owner_id?: string;
  thumbnail_url?: string;
};

export type Note = {
  id: string;
  name: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  deleted_flag?: boolean;
};

export type Profile = {
  id?: string;
  name: string;
  avatar_url: string;
};

export type Discussion = CommonProps & {
  group_id: string;
};

export type Comment = {
  id: string;
  group_id?: string;
  user_id: string;
  comment: string;
  user_name: string;
  avatar_url: string;
  created_at: string;
};
