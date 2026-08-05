export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const { amount } = req.body || {};
  const current = parseInt(req.cookies['mock-xp'] || '1000');
  const next = current + (amount || 0);
  res.setHeader('Set-Cookie', `mock-xp=${next}; Path=/; HttpOnly`);
  return res.status(200).json({ xp: next });
}
