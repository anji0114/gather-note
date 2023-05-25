import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { Meta } from "@/components/Common/Meta";
import { DashboardGroupItem } from "@/components/Dashboard/DashboardGroupItem";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { Group } from "@/types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React, { useState } from "react";

const GroupSearch = () => {
  const supabase = useSupabaseClient();
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchGroup = async () => {
    setIsLoading(true);
    const { data: groups, error } = await supabase
      .from("groups")
      .select("id, name, thumbnail_url")
      .textSearch("name", groupName)
      .returns<Group[]>();

    if (error) {
      return;
    }

    setGroups(groups);
    setIsLoading(false);
  };

  return (
    <>
      <Meta pageTitle="グループ検索" />
      <Layout classes="py-20">
        <LayoutContainer>
          <Link href="/dashboard/group" className="flex items-center gap-1 hover:opacity-75">
            <ChevronLeftIcon className="w-5" />
            <span className="text-sm font-medium pb-[1px]">前に戻る</span>
          </Link>
          <div className="max-w-[900px] mt-10 mx-auto">
            <div className="flex gap-2 mt-5">
              <input
                type="text"
                placeholder="グループ名を記入"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="border border-[#d0d7de] w-[calc(100%_-_120px)] rounded bg-gray-100 outline-none px-3 py-1.5"
              />
              <button
                className="bg-[#222] text-white px-4 py-1.5 rounded"
                onClick={handleSearchGroup}
              >
                検索する
              </button>
            </div>
            <div className="min-h-[100px] relative mt-10">
              {isLoading ? (
                <LoadingBlock />
              ) : (
                <ul className="space-y-2">
                  {groups?.map((group: Group) => (
                    <DashboardGroupItem
                      key={group.id}
                      id={group.id}
                      name={group.name}
                      description={group.description}
                      thumbnail_url={group.thumbnail_url}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </LayoutContainer>
      </Layout>
    </>
  );
};

export default GroupSearch;
