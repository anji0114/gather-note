import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const DiscussionIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState("");
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (id) {
      const getDiscussion = async () => {
        const { data, error } = await supabase
          .from("discussions")
          .select("content")
          .eq("id", id)
          .single();

        if (error) {
          alert(error.message);
        }

        setContent(data?.content);
      };

      getDiscussion();
    }
  }, [id]);

  return (
    <Layout>
      <LayoutContainer>
        <TextareaAutosize className="w-full leading-8 outline-none resize-none" value={content} />
      </LayoutContainer>
    </Layout>
  );
};

export default DiscussionIdPage;
