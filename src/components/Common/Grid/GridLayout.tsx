import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();

  return (
    <div className="sm:flex sm:justify-between items-start relative gap-12">
      <aside className="sticky top-3 left-0 w-[200px] hidden sm:block">
        <nav>
          <ul className="space-y-[6px]">
            {items.map((item) => (
              <li key={item.title}>
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
      <main className="w-full">{children}</main>
    </div>
  );
};
