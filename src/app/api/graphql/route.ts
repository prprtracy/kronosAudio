// src/app/api/graphql/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(
    JSON.stringify({ ok: false, message: "GraphQL endpoint not enabled yet." }),
    { status: 501, headers: { "content-type": "application/json" } }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ ok: false, message: "GraphQL endpoint not enabled yet." }),
    { status: 501, headers: { "content-type": "application/json" } }
  );
}
