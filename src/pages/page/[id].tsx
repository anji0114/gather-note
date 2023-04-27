import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "@/store";
import TextareaAutosize from "react-textarea-autosize";
import { Loading } from "@/components/Common/Loading";
import { PageHeader } from "@/components/Page/PageHeader";

const PageId = () => {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const { data, isLoading } = useSWR(router.query.id ? `/api/pages/${router.query.id}` : null);
  const page = useStore((state) => state.editPage);
  const setPage = useStore((state) => state.setEditPage);

  const handlePageUpdate = async () => {
    const { data, error } = await supabase
      .from("pages")
      .update({
        title: page.title,
        content: page.content,
      })
      .eq("id", page.id)
      .select()
      .single();

    if (error) {
      alert(error);
    }

    router.push(`/note/${data?.note_id}`);
  };

  useEffect(() => {
    setPage({
      id: data?.id,
      title: data?.title,
      content: data?.content,
    });
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <>
      <PageHeader handleUpdate={handlePageUpdate} />
      <div>
        <div className="max-w-[660px] mx-auto mt-16">
          <h1>
            <TextareaAutosize
              value={page.title}
              minRows={1}
              placeholder="タイトル"
              className="w-full text-4xl font-bold outline-none resize-none"
              onChange={(e) => {
                setPage({ ...page, title: e.target.value });
              }}
            />
          </h1>
          <p className="mt-10">
            <TextareaAutosize
              value={page.content}
              minRows={6}
              placeholder="内容を入力してください"
              className="w-full outline-none resize-none px-1 leading-8"
              onChange={(e) => {
                setPage({ ...page, content: e.target.value });
              }}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default PageId;
