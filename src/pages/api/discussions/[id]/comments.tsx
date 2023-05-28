import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const DiscussionsIdComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const discussionId = req.query.id;

    const { data: commentsData, error: commentsError } = await supabase
      .from("discussion_comments")
      .select("*")
      .eq("discussion_id", discussionId)
      .order("created_at", { ascending: true });

    if (commentsError) {
      return res.status(401).json({ message: commentsError });
    }

    const { data: reportsData, error: reportsError } = await supabase
      .from("discussion_reports")
      .select("*")
      .eq("discussion_id", discussionId)
      .order("created_at", { ascending: true });

    if (reportsError) {
      return res.status(401).json({ message: reportsError });
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, name, avatar_url")
      .in(
        "id",
        commentsData.map((comment) => comment.user_id)
      );

    if (profileError) {
      return res.status(401).json({ message: profileError });
    }

    const Comments = commentsData.map((comment) => {
      const matchingProfile = profileData.find((profile) => profile.id === comment.user_id);

      if (matchingProfile) {
        return {
          ...comment,
          user_name: matchingProfile.name,
          avatar_url: matchingProfile.avatar_url,
        };
      }

      return comment;
    });

    const mergedArray = Comments.concat(reportsData).sort(
      (a, b) => parseInt(a.created_at) - parseInt(b.created_at)
    );

    return res.status(200).json(mergedArray);
  }
};

export default DiscussionsIdComments;
