// src/app/products/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

type Money = { display: string };
type Download = { label: string; url: string };
type Spec = { key: string; value: string };
type Review = {
  authorName?: string | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
  quote?: string | null;
  imageUrl?: string | null;
};

type Product = {
  name: string;
  tagline?: string | null;
  msrp?: Money | null;
  upgradeKit?: Money | null;
  description: string[];
  gallery: string[];
  downloads: Download[];
  specs: Spec[];
  reviews: Review[];
};

type GqlResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

function getBaseUrl() {
  // ✅ 兼容本地 & 线上
  // - 本地：NEXT_PUBLIC_SITE_URL 可不配，fallback 到 localhost
  // - 线上：建议配 NEXT_PUBLIC_SITE_URL=https://xxx.com
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

async function gql<TData>(
  query: string,
  variables?: Record<string, unknown>
): Promise<TData> {
  const res = await fetch(`${getBaseUrl()}/api/graphql`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    // 产品页内容后面可以改成 revalidate（ISR），现在先 no-store 最稳
    cache: "no-store",
  });

  const json = (await res.json()) as GqlResponse<TData>;

  if (json.errors?.length) {
    // 帮你把 GraphQL 错误抛出来，方便定位
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  if (!json.data) {
    throw new Error("GraphQL returned no data");
  }

  return json.data;
}

export default async function ProductPage({
  params,
}: {
  // ✅ 同时兼容 params 是对象或 Promise（防止你项目里 async routing 导致 params 变 Promise）
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  // slug 为空就直接 404
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const data = await gql<{ productBySlug: Product | null }>(
    `
      query ProductBySlug($slug: String!) {
        productBySlug(slug: $slug) {
          name
          tagline
          msrp { display }
          upgradeKit { display }
          description
          gallery
          downloads { label url }
          specs { key value }
          reviews {
            authorName
            sourceName
            sourceUrl
            quote
            imageUrl
          }
        }
      }
    `,
    { slug }
  );

  const p = data.productBySlug;
  if (!p) notFound();

  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Tagline + H1 */}
        {p.tagline ? (
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
            {p.tagline}
          </p>
        ) : null}

        <h1 className="text-4xl sm:text-5xl font-semibold mb-6">{p.name}</h1>

        {/* Gallery */}
        {p.gallery?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {p.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950"
              >
                <Image src={src} alt="" fill className="object-cover" priority />
              </div>
            ))}
          </div>
        ) : null}

        {/* MSRP + Upgrade Kit */}
        {p.msrp?.display ? (
          <p className="text-lg font-semibold mb-2">MSRP: {p.msrp.display}</p>
        ) : null}
        {p.upgradeKit?.display ? (
          <p className="text-sm text-neutral-200 mb-6">
            UPGRADE KIT: {p.upgradeKit.display}
          </p>
        ) : (
          <div className="mb-6" />
        )}

        {/* Description */}
        {p.description?.length ? (
          <div className="space-y-4 text-neutral-200 leading-relaxed mb-6">
            {p.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : null}

        {/* Downloads */}
        {p.downloads?.length ? (
          <div className="mb-10 space-y-2">
            {p.downloads.map((d) => (
              <div key={d.url}>
                <a
                  href={d.url}
                  className="inline-flex items-center text-amber-300 hover:text-amber-200 transition-colors"
                >
                  {d.label} →
                </a>
              </div>
            ))}
          </div>
        ) : null}

        {/* Specifications */}
        <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
        {p.specs?.length ? (
          <div className="space-y-2 text-sm text-neutral-200 mb-10">
            {p.specs.map((s) => (
              <div
                key={s.key}
                className="flex gap-3 border-b border-neutral-900 py-2"
              >
                <div className="w-56 text-neutral-400">{s.key}:</div>
                <div className="flex-1">{s.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-400 mb-10">Coming soon.</p>
        )}

        {/* Reviews */}
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {p.reviews?.length ? (
          <div className="space-y-6 pb-16">
            {p.reviews.map((r, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-800 bg-white/5 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-semibold">
                    {r.authorName ?? "Review"}{" "}
                    {r.sourceName ? (
                      <span className="text-neutral-400">— {r.sourceName}</span>
                    ) : null}
                  </div>

                  {r.sourceUrl ? (
                    <a
                      className="text-xs text-amber-300 hover:text-amber-200 transition-colors"
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source →
                    </a>
                  ) : null}
                </div>

                {r.quote ? (
                  <blockquote className="mt-3 text-neutral-200 italic">
                    “{r.quote}”
                  </blockquote>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-400 pb-16">No reviews yet.</p>
        )}
      </div>
    </main>
  );
}
