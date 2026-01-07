const DEFAULT_ENV_NAME = 'ENVARUNO';

function normalizeName(input) {
  if (Array.isArray(input)) {
    return input[0]?.trim() ?? '';
  }
  if (typeof input === 'string') {
    return input.trim();
  }
  return '';
}

function addVariant(variants, value) {
  if (typeof value !== 'string') {
    return;
  }
  const trimmed = value.trim();
  if (trimmed.length > 0) {
    variants.add(trimmed);
  }
}

function buildVariants(rawName) {
  const variants = new Set();
  const base = rawName.trim();
  const unquoted = base.replace(/^['"]+|['"]+$/g, '');
  const underscored = unquoted.replace(/[\s.-]+/g, '_');

  addVariant(variants, base);
  addVariant(variants, base.toUpperCase());
  addVariant(variants, base.toLowerCase());

  addVariant(variants, unquoted);
  addVariant(variants, unquoted.toUpperCase());
  addVariant(variants, unquoted.toLowerCase());

  addVariant(variants, underscored);
  addVariant(variants, underscored.toUpperCase());
  addVariant(variants, underscored.toLowerCase());

  const prefix = 'NEXT_PUBLIC_';
  const addPrefixed = (value) => {
    if (value.startsWith(prefix)) {
      const withoutPrefix = value.slice(prefix.length);
      addVariant(variants, withoutPrefix);
      addVariant(variants, withoutPrefix.toUpperCase());
      addVariant(variants, withoutPrefix.toLowerCase());
    } else {
      addVariant(variants, `${prefix}${value}`);
    }
  };

  [base, unquoted, underscored].forEach((value) => {
    if (value.length > 0) {
      addPrefixed(value);
      addPrefixed(value.toUpperCase());
      addPrefixed(value.toLowerCase());
    }
  });

  return Array.from(variants);
}

function buildResults(variants) {
  return variants.map((key) => {
    const hasKey = Object.prototype.hasOwnProperty.call(process.env, key);
    const value = hasKey ? process.env[key] ?? '' : null;
    return { key, hasKey, value };
  });
}

export default function handler(req, res) {
  const inputName = normalizeName(req.query.name);
  const name = inputName || DEFAULT_ENV_NAME;
  const variants = buildVariants(name);
  const results = buildResults(variants);
  const match =
    results.find((item) => item.hasKey && item.value !== '') ??
    results.find((item) => item.hasKey) ??
    null;

  res.status(200).json({
    name,
    matchKey: match?.key ?? '',
    results,
  });
}
