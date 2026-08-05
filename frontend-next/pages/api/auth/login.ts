export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
  return res.status(200).json({
    access_token: 'mock-token-123',
    user: { id: 'u1', full_name: 'Demo User', email }
  });
}
