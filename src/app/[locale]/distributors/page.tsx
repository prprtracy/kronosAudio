import { DistributorMap } from "@/components/distributors/DistributorMap";
import { featuredPartners, partners, REGIONS } from "@/data/partners";

export const revalidate = 3600;

export default async function DistributorsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="mb-10">
        <p className="text-sm tracking-widest opacity-70">GLOBAL PARTNERS</p>
        <h1 className="mt-3 text-4xl font-semibold">Listening Rooms Worldwide</h1>
        <p className="mt-4 max-w-2xl text-base opacity-80">
          A curated network of partners selected for standards in setup, service, and musical integrity.
        </p>
      </section>

      {/* Map (Featured) */}
      <section className="mb-12">
        <DistributorMap partners={partners} regions={REGIONS} />
      </section>

      {/* Selected Partners (像 endorsement) */}
      <section className="mb-14">
        <h2 className="text-xl font-medium">Selected Partners</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredPartners.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/10 p-6">
              <div className="text-xs tracking-widest opacity-70">
                {p.city}, {p.country}
              </div>
              <div className="mt-2 text-lg font-medium">{p.name}</div>
              {p.url ? (
                <a className="mt-3 inline-flex text-sm opacity-80 hover:opacity-100" href={p.url} target="_blank" rel="noreferrer">
                  View partner →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Full list (SEO & 可用性) */}
      <section>
        <h2 className="text-xl font-medium">Directory</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {partners.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/10 p-6">
              <div className="text-xs tracking-widest opacity-70">
                {p.city}, {p.country}
              </div>
              <div className="mt-2 text-lg font-medium">{p.name}</div>
              {p.url ? (
                <a className="mt-3 inline-flex text-sm opacity-80 hover:opacity-100" href={p.url} target="_blank" rel="noreferrer">
                  View partner →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
