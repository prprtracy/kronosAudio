import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PdfPageStack } from "@/components/press/PdfPageStack";
import { getPressArticleBySlug, pressData } from "@/data/press";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pressData.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPressArticleBySlug(slug);

  if (!article) {
    return {
      title: "Press | Kronos Audio",
    };
  }

  return {
    title: `${article.title} | Kronos Audio Press`,
    description: article.summary,
  };
}

export default async function PressDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getPressArticleBySlug(slug);

  if (!article) notFound();

  const productHref = `/products/${article.productSlug}`;
  const productButtonLabel =
    article.productSlug === "phono" ? "PHONO" : article.productName.toUpperCase();
  const sourceUrls = article.urls?.length ? article.urls : [article.url];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-32 sm:pt-40">
        <Link
          href={`/products/${article.productSlug}#reviews`}
          className="inline-flex text-xs uppercase tracking-[0.24em] text-neutral-400 transition-colors hover:text-amber-200"
        >
          &lt;- Back to {article.productName}
        </Link>

        <div className="mt-12 animate-[pressFadeIn_600ms_ease-out_both]">
          <header className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300/85">
              {article.source} <span className="text-neutral-600">/</span>{" "}
              {article.category}
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              {article.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl sm:leading-9">
              {article.summary}
            </p>
          </header>

          <section className="mt-14 rounded-2xl border border-amber-300/25 bg-amber-300/[0.06] px-6 py-7 sm:px-8 sm:py-9">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-200/75">
              Featured Quote
            </p>
            <blockquote className="mt-5 text-2xl font-medium italic leading-10 text-neutral-50 sm:text-3xl sm:leading-[1.35]">
              &quot;{article.quote}&quot;
            </blockquote>
          </section>
        </div>
      </section>

      {article.pdfUrl ? (
        <section className="mx-auto max-w-5xl px-6 pb-10">
          <PdfPageStack url={article.pdfUrl} title={article.title} />
        </section>
      ) : null}

      <section className="mx-auto max-w-5xl px-6 pb-14 text-center text-xs leading-6 text-neutral-500">
        <p>
          <span className="text-neutral-600">Source:</span>{" "}
          <span className="text-neutral-400">{article.source}</span>
        </p>
        <p className="mt-3 text-neutral-600">Published on:</p>
        <div className="mt-1 space-y-1">
          {sourceUrls.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto block max-w-3xl break-words text-neutral-500 hover:text-amber-200"
            >
              {url}
            </a>
          ))}
        </div>
        <Link
          href={productHref}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-amber-300/35 bg-black px-5 py-2 text-xs font-light uppercase tracking-[0.25em] text-neutral-300 transition duration-300 hover:border-amber-200/70 hover:bg-white/[0.04] hover:text-amber-100"
        >
          &larr; Return to {productButtonLabel}
        </Link>
      </section>
    </main>
  );
}
