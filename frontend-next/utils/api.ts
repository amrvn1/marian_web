export async function fetcher(path: string, opts: any = {}){
  const base = process.env.NEXT_PUBLIC_API_URL || '';
  const res = await fetch(base + path, opts);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
