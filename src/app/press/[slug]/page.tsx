import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const summaryParagraphs = article.summaryParagraphs ?? [article.summary];
  const sourceDomain =
    article.sourceDomain ?? article.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
  const productLabel = article.productName.startsWith("Kronos")
    ? article.productName
    : `Kronos ${article.productName}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32 sm:pt-40">
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

          <section className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Article Summary
            </h2>
            <div className="mt-7 space-y-6 text-base leading-8 text-neutral-300 sm:text-lg sm:leading-9">
              {summaryParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {article.takeaways?.length ? (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Key Takeaways
              </h2>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {article.takeaways.map((takeaway) => (
                  <article
                    key={takeaway.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-amber-300/30 hover:bg-white/[0.06]"
                  >
                    <h3 className="text-lg font-semibold text-amber-100">
                      {takeaway.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-neutral-300">
                      {takeaway.text}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-200">
              Source Information
            </h2>
            <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-neutral-500">Publication</dt>
                <dd className="mt-1 font-medium text-neutral-100">
                  {article.source}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Article Type</dt>
                <dd className="mt-1 font-medium text-neutral-100">
                  {article.category}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Product</dt>
                <dd className="mt-1 font-medium text-neutral-100">
                  {productLabel}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Original Source</dt>
                <dd className="mt-1 font-medium text-neutral-100">
                  {sourceDomain}
                </dd>
              </div>
            </dl>
          </section>

          {article.pdfUrl ? (
            <section className="mt-16">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-200/75">
                    Saved Article
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Full PDF
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-neutral-400">
                  This embedded copy is provided for convenient on-site reading. The
                  original publication remains linked below.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
                <iframe
                  src={`${article.pdfUrl}#toolbar=1&navpanes=0`}
                  title={`${article.title} saved PDF`}
                  className="h-[78vh] min-h-[640px] w-full bg-white"
                />
              </div>
            </section>
          ) : null}

          <section className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-amber-300/60 px-6 py-3 text-xs uppercase tracking-[0.22em] text-amber-200 transition-colors hover:bg-amber-300 hover:text-black"
            >
              Visit Original Article -&gt;
            </a>

            {article.pdfUrl ? (
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-amber-300/35 bg-amber-300/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-amber-100 transition-colors hover:border-amber-300/60 hover:bg-amber-300/15"
              >
                View Saved PDF -&gt;
              </a>
            ) : null}

            {article.pdfUrl ? (
              <a
                href={article.pdfUrl}
                download
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-neutral-300 transition-colors hover:border-amber-300/35 hover:text-amber-100"
              >
                Download PDF
              </a>
            ) : null}

            <Link
              href={`/products/${article.productSlug}`}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
            >
              Explore {article.productName} -&gt;
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
