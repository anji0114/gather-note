export type Note = {
  id: string;
  title: string;
  description: string;
  created_at?: string;
};

export type Page = {
  id: string;
  title: string;
  content: string;
  created_at?: string;
};
