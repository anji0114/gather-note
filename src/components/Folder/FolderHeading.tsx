import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostHeading } from "@/components/Common/Post/PostHeading";

export const FolderHeading: FC = () => {
  const folder = useStore((state) => state.folder);
  const setFolder = useStore((state) => state.setFolder);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (folder.id) {
      setName(folder.name);
      setDescription(folder.description);
    }
  }, [folder]);

  const handleFolderDelete = async () => {
    const { data: foldersData, error: foldersError } = await supabase
      .from("folders")
      .update({
        deleted_flag: true,
      })
      .eq("id", folder.id)
      .select("id")
      .single();

    if (foldersError) {
      alert(foldersError.message);
      return;
    }

    const { error: folderNotesError } = await supabase
      .from("notes")
      .update({
        deleted_flag: true,
      })
      .eq("folder_id", foldersData.id);

    if (folderNotesError) {
      alert(folderNotesError.message);
      return;
    }

    router.push("/dashboard");
  };

  const handleFolderUpdate = async () => {
    const { error } = await supabase
      .from("folders")
      .update({
        name: name,
        description: description,
      })
      .eq("id", folder.id);

    if (error) {
      alert(error.message);
      return;
    }
    setFolder({ ...folder, name: name, description: description });
  };

  return (
    <PostHeading
      post={folder}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      handleDelete={handleFolderDelete}
      handleUpdate={handleFolderUpdate}
    />
  );
};
