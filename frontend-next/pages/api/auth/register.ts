export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  // Mock: return created user
  return res.status(201).json({ user: { id: 'u' + Date.now(), full_name, email } });
}
