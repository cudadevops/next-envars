export default function handler(req, res) {
  const value = process.env.ENVARUNO ?? '';
  res.status(200).json({ ENVARUNO: value });
}
