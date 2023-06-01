import React, { Dispatch, FC, SetStateAction, useState } from "react";
import useSWR from "swr";
import { DiscussionCommentItem } from "@/components/Discussion/DiscussionCommentItem";
import { Comment } from "@/types";
import { useRouter } from "next/router";
import { DiscussionGenerateReport } from "./DiscussionGrnerateReport";
import { DiscussionReportItem } from "./DiscussionReportItem";
import { Loading } from "../Common/Loading";

type Props = {
  isAdmin: boolean;
};

export const DIscussionComment: FC<Props> = ({ isAdmin }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: CommentsData, isLoading } = useSWR(id ? `/api/discussions/${id}/comments` : null);
  const [isCheckOpen, setIsCheckOpen] = useState(false);
  const [promptComments, setPromptComments] = useState<string[]>([]);

  const handleChangeCheck = () => {
    setIsCheckOpen((prevState) => !prevState);
    setPromptComments([]);
  };

  return (
    <>
      <h2 className="font-bold text-lg">コメント一覧</h2>
      <div className="relative min-h-[100px] mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ul className="space-y-3">
              {CommentsData?.map((comment: Comment & { report?: string }) =>
                comment.user_id ? (
                  <DiscussionCommentItem
                    key={comment.id}
                    id={comment.id}
                    user_id={comment.user_id}
                    comment={comment.comment}
                    user_name={comment.user_name}
                    avatar_url={comment.avatar_url}
                    created_at={comment.created_at}
                    isCheckOpen={isCheckOpen}
                    promptComments={promptComments}
                    setPromptComments={setPromptComments}
                  />
                ) : (
                  <DiscussionReportItem
                    key={comment.id}
                    id={comment.id}
                    report={comment.report!}
                    isAdmin={isAdmin}
                    created_at={comment.created_at}
                  />
                )
              )}
            </ul>
            {isAdmin && (
              <DiscussionGenerateReport
                promptComments={promptComments}
                handleChangeCheck={handleChangeCheck}
                isCheckOpen={isCheckOpen}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};
