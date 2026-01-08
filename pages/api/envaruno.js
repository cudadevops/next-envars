function normalizeShowFlag(input) {
  if (Array.isArray(input)) {
    return input[0] ?? '';
  }
  if (typeof input === 'string') {
    return input;
  }
  return '';
}

export default function handler(req, res) {
  const hasKey = Object.prototype.hasOwnProperty.call(process.env, 'ENVARUNO');
  const value = hasKey ? process.env.ENVARUNO ?? '' : '';
  const showFlag = normalizeShowFlag(req.query.show);
  const showValue = showFlag === '1' || showFlag.toLowerCase() === 'true';

  res.setHeader('cache-control', 'no-store');

  const payload = {
    configured: hasKey,
    length: hasKey ? value.length : 0,
  };

  if (showValue) {
    payload.value = value;
  }

  res.status(200).json(payload);
}
