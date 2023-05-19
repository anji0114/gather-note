import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import ogImage from "@/og.png";

type Props = {
  pageTitle?: string;
  pageDescription?: string;
  pageImg?: string;
  pageImgWidth?: string;
  pageImgHeight?: string;
  noindex?: boolean;
};

export const Meta: FC<Props> = ({
  pageTitle,
  pageDescription,
  pageImg,
  pageImgWidth,
  pageImgHeight,
  noindex = false,
}) => {
  const defaultTitle = "Gather Note";
  const defaultDescription = "1ページずつ、ノートを一緒に集める - GatherNote";

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = pageDescription ? pageDescription : defaultDescription;
  const imgUrl = pageImg ? pageImg : ogImage.src;
  const imgWidth = pageImgWidth ? pageImgWidth : ogImage.width;
  const imgHeight = pageImgHeight ? pageImgHeight : ogImage.height;

  const router = useRouter();
  const url = `https://gathernote.vercel.app${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />

      <meta name="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />

      {noindex ? <meta name="robots" content="noindex" /> : false}

      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple0icon.png" />
      <link rel="canonical" href={url} />
    </Head>
  );
};
