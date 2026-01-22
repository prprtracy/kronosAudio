// src/app/page.tsx
// import { DistributorsMap } from "@/components/DistributorsMap";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* TODO: Hero, 产品、介绍等区块 */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Kronos High-End Turntables
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Where mechanical precision meets musical emotion.
        </p>
      </section>

      {/* <DistributorsMap /> */}
    </main>
  );
}
