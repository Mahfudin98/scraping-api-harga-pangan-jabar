import { fetch } from "bun";

export async function scrapApiPangan(
  page: number,
  limit: number,
  order: "asc" | "desc",
  order_by: string | "name",
  search?: string | ""
) {
  const res = await fetch(
    `https://data.jabarprov.go.id/api-dashboard-jabar/public/pangan/list-komoditas?search=${search}&page=${page}&limit=${limit}&order=${order}&order_by=${order_by}`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        baggage:
          "sentry-environment=production,sentry-public_key=25ea618a69b06f87afadabb9bbd14e39,sentry-trace_id=a31250f63daf43119fed44208cf81bcf,sentry-sampled=true,sentry-sample_rand=0.16120616388180686,sentry-sample_rate=1",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sentry-trace": "a31250f63daf43119fed44208cf81bcf-888d77ddbf7389cc-1",
        Referer: "https://dashboard.jabarprov.go.id/",
      },
      body: null,
      method: "GET",
    }
  );

  if (!res.ok) throw new Error("Gagal Fetch Halaman");

  const json = await res.json();

  return json;
}
