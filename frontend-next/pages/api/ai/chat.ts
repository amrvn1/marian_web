export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Missing message' });
  const replies = [
    `Nice question — try breaking it into smaller parts: 1) ... 2) ...`,
    `Study tip: Use Pomodoro for 25 min sessions, then a 5 min break.`,
    `Motivation: “Even the strongest opponents fall to consistent effort.” — LvlUp Coach`
  ];
  return res.status(200).json({ reply: replies[Math.floor(Math.random()*replies.length)] });
}
