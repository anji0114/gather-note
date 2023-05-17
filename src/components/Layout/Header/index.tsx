import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { LayoutHeaderAuth } from "@/components/Layout/Header/LayoutHeaderAuth";
import { LayoutHeaderMenu } from "@/components/Layout/Header/LayoutHeaderMenu";

export const LayoutHeader: FC = () => {
  const user = useUser();

  return (
    <header className="border-b border-[#d0d7de]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="flex items-center justify-between h-20">
          <Link
            href={!user ? "/" : "/dashboard"}
            className="inline-block pt-3 w-[140px] md:w-[180px]"
          >
            <Image src="/logo.svg" alt="Prompt Note" width={187} height={36} />
          </Link>
          <div className="flex items-center">
            {!user ? <LayoutHeaderAuth /> : <LayoutHeaderMenu />}
          </div>
        </div>
      </div>
    </header>
  );
};
