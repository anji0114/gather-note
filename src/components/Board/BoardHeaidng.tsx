import  useSWR from "swr";

export const BoardHeading = () => {

  const {data, error} = useSWR("")

  return (
    <div className="pt-12 pb-5 bg-[#FCFCFC] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 sm:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex justify-between">
            <h1 className="text-lg sm:text-xl font-bold leading-tight w-[calc(100%_-_150px)]">
              <span className="text-[#4E6BB4] hover:underline">東京大学法学部</span>
              <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>Mind
              Prompt DB設計書
            </h1>
          </div>
          <p
            className="mt-7 text-[15px] leading-7
          "
          >
            ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。
          </p>
        </div>
      </div>
    </div>
  );
};
