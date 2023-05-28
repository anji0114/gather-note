import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Common/Meta";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";

type Item = {
  img: string;
  alt: string;
  title: string;
  list: string[];
};

const FUNCTION_LIST: Item[] = [
  {
    img: "/img_function01.jpg",
    alt: "ノート機能",
    title: "シンプルなノート機能",
    list: [
      "複数のノートを作成し、それらをフォルダごとに整理することができます。",
      "Markdown記法を使用してノートを作成することができます。見出し、箇条書き、Codeなどさまざまな要素を簡単に追加することができます。",
      "作成したノートを編集したり削除したりすることができます。",
    ],
  },
  {
    img: "/img_function02.jpg",
    alt: "ボード機能",
    title: "ノートが共有できるボード機能",
    list: [
      "グループ内でノートを共有し合うことができます。",
      "自分が追加したノート以外は誰が追加したか、わからないようになっています。",
      "ボードの作成・編集・削除をすることができるのは、ググループの管理者権限を持った人のみです。",
    ],
  },
  {
    img: "/img_function03.jpg",
    alt: "ディスカッション",
    title: "意見を出し合えるディスカッション機能",
    list: [
      "グループ内でお題をたて、ディスカッションすることができます。",
      "ディスカッションに追加するコメントは、ノート同様、Markdown記法を使用できます。",
      "ディスカッションの作成・編集・削除をすることができるのは、ググループの管理者権限を持った人のみです。",
    ],
  },
  {
    img: "/img_function04.jpg",
    alt: "chat gpt",
    title: "gpt-3.5を使用したディスカッションまとめ機能",
    list: [
      "gpt-3.5を使用し、ディスカッションにあるコメントをまとめることだできます。※プロンプトなど改善途中になります。",
      "gpt-3.5の機能を使用することができるのは、グループの管理者権限を持った人のみです。",
    ],
  },
];

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Meta />
      <Layout>
        <div className="py-24 bg-[#F4F6F8]">
          <LayoutContainer>
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="Prompt Note"
                width={300}
                height={70}
                className="inline-block"
              />
            </div>
            <p className="mt-6 text-center font-medium text-lg leading-6 ">
              1ページずつ、ノートを一緒に集める
            </p>
            <div className="flex mt-12 justify-center gap-5">
              {user ? (
                <Link
                  className="w-40 inline-block text-center p-3 text-sm bg-[#222] text-white rounded hover:bg-[#555]"
                  href="/dashboard"
                >
                  ダッシュボード
                </Link>
              ) : (
                <Link
                  className="w-40 inline-block text-center p-3 text-sm bg-[#222] text-white rounded hover:bg-[#555]"
                  href="/auth/signup"
                >
                  ユーザー登録
                </Link>
              )}
              <Link
                className="w-40 inline-block text-center p-3 text-sm rounded border border-[#222] bg-white hover:bg-[#eee]"
                href="https://github.com/anji0114/gather-note"
                target="_blank"
              >
                GitHub
              </Link>
            </div>
          </LayoutContainer>
        </div>

        <LayoutContainer classes="py-24">
          <h2 className="text-center">
            <span className="inline-block text-2xl font-bold pb-3 border-b-[3px] border-[#222]">
              機能・特徴の紹介
            </span>
          </h2>
          <ul className="space-y-10 mt-16">
            {FUNCTION_LIST.map((item: Item, index) => (
              <li
                key={item.title}
                className={`p-5 bg-white shadow rounded border md:px-8 md:py-10 md:flex md:items-start md:gap-10 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="overflow-hidden rounded border border-[#efefef] md:w-1/2 shadow-sm">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    width={1200}
                    height={590}
                    className="inline-block"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:w-1/2">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <ol className="mt-4 space-y-1 md:space-y-3 md:mt-6">
                    {item.list.map((listItem: string) => (
                      <li
                        key={listItem}
                        className=" leading-7 list-inside list-decimal text-sm md:text-base"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ol>
                </div>
              </li>
            ))}
          </ul>
        </LayoutContainer>
      </Layout>
    </>
  );
};

export default Home;
