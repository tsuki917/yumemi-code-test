export async function fetcher(path: string, option?: RequestInit) {
  const apiServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
  const href = new URL(path, apiServerUrl);
  const response = await fetch(href, option);
  const json = await response.json();
  return json;
}
