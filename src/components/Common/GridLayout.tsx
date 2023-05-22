import Link from "next/link";
import { FC, ReactNode } from "react";

type Item = {
  title: string;
  href: string;
  icon: ReactNode;
  isPage?: boolean;
};

type Props = {
  children: ReactNode;
  items: Item[];
};

export const GridLayout: FC<Props> = ({ items, children }) => {
  return (
    <div className="relative md:flex md:justify-between md:items-start">
      <aside className="top-3 left-0 w-full md:w-[170px] md:sticky lg:w-[200px]">
        <nav>
          <ul className="flex flex-wrap justify-between gap-1 md:space-y-[6px] md:gap-0">
            {items.map((item) => (
              <li key={item.title} className="w-[calc(50%_-_2px)] md:w-full">
                <Link
                  href={item.href}
                  className={`py-2.5 px-4 w-full flex gap-2 items-center rounded-md font-medium border ${
                    item.isPage
                      ? "text-white bg-[#9DAEBF] border-[#9DAEBF] pointer-events-none"
                      : "bg-white border-[#d0d7de] hover:bg-[#fafafa]"
                  }`}
                >
                  {item.icon}
                  <span className=" inline-block text-sm pb-[1px]">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="mt-8  md:mt-0 md:w-[calc(100%_-_170px_-_30px)] lg:w-[calc(100%_-_200px_-_48px)] ">
        {children}
      </main>
    </div>
  );
};
