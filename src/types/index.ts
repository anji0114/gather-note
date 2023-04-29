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

export type Group = {
  id: string;
  name: string;
  description: string;
  created_at?: string;
};
